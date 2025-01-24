workDir="$(dirname "$(readlink -f "$0")")"

run_ndk_build() {
  command -v ndk-build.cmd >/dev/null 2>&1 && {
    eval "cmd.exe /c ndk-build.cmd $@"
    return $?
  } || ndk-build $@
}

run_go() {
  command -v go.exe >/dev/null 2>&1 && {
    go.exe $@
    return $?
  } || go $@
}

run_go_build() {
  command -v garble.exe >/dev/null 2>&1 && {
    eval "garble.exe $@"
    return $?
  } || {
    command -v garble >/dev/null 2>&1 && {
      eval "garble $@"
      return $?
    } || {
      shift
      command -v go.exe >/dev/null 2>&1 && {
        eval "go.exe $@"
        return $?
      } || eval "go $@"
    }
  }
}

cpp_arch2arch() {
  case "$1" in
    arm64-v8a) printf arm64;;
    armeabi-v7a) printf arm;;
    x86_64) printf x64;;
    *) printf "$1";;
  esac
}

go_arch2arch() {
  case "$1" in
    amd64) printf x64;;
    386) printf x86;;
    *) printf "$1";;
  esac
}

make_zip() {
  command -v 7za.exe >/dev/null 2>&1 && {
    7za.exe a -tzip instpkg.zip -mmt24 -mx9 -r *
    return $?
  } || {
    command -v 7za >/dev/null 2>&1 && {
      7za a -tzip instpkg.zip -mmt24 -mx9 -r *
      return $?
    } || zip -r -9 instpkg.zip *
  }
}

rm -rf "$workDir/output/tmp"
for mod in "$workDir/list"/*/; do
  [ -d "$mod" ] || continue
  [ -d "$mod/root" ] || continue
  [ -f "$mod/root/module.prop" ] || continue
  [ -z "$@" ] || {
    isTarget=false
    for target in $@; do
      [ $target = `basename "$mod"` ] && isTarget=true
    done
    $isTarget || continue
  }
  cp -rf "$mod/root" "$workDir/output/tmp" || continue
  cp -rf "$workDir/src/META-INF" "$workDir/output/tmp/META-INF" || continue
  cp -f "$workDir/src/mod-utils/skt-utils.sh" "$workDir/output/tmp/skt-utils.sh" || continue
  [ -d "$mod/c++_native" ] && {
    for native in "$mod/c++_native"/*/; do
      [ -d "$native" ] || continue
      [ -f "$native/jni/Android.mk" ] || continue
      [ -f "$native/jni/Application.mk" ] || continue
      type=`grep -q '^include $(BUILD_EXECUTABLE)$' "$native/jni/Android.mk" && printf exe || { grep -q '^include $(BUILD_SHARED_LIBRARY)$' "$native/jni/Android.mk" && printf lib; }`
      [ -z "$type" ] && continue
      cd "$native/jni"
      run_ndk_build -j`nproc`
      run_ndk_build -j`nproc` || continue
      binName=`basename "$native"`
      [ $type = lib ] && {
        binName="lib$binName.so"
        mkdir -p "$workDir/output/tmp/zygisk"
        for arch in "$native/libs"/*/; do
          mv -f "$arch/$binName" "$workDir/output/tmp/zygisk/`basename "$arch"`.so"
        done
        true
      } || {
        mkdir -p "$workDir/output/tmp/bin/$binName"
        for arch in "$native/libs"/*/; do
          mv -f "$arch/$binName" "$workDir/output/tmp/bin/$binName/$(cpp_arch2arch "`basename "$arch"`").bin"
        done
      }
    done
  }
  [ -d "$mod/go_native" ] && {
    run_go env -w GOOS=linux CGO_ENABLED=0
    for native in "$mod/go_native"/*/; do
      [ -d "$native" ] || continue
      [ -f "$native/go.mod" ] || continue
      [ -f "$native/arch.txt" ] || continue
      cd "$native"
      binName=`basename "$native"`
      mkdir -p "$workDir/output/tmp/bin/$binName"
      for arch in `cat "$native/arch.txt"`; do
        run_go env -w GOARCH=$arch
        run_go_build "-literals -seed=random -tiny" build -ldflags=\"-w -s\" || continue
        mv -f "$native/$binName" "$workDir/output/tmp/bin/$binName/`go_arch2arch $arch`.bin"
      done
    done
  }
  for file in $(find "$workDir/output/tmp" -type f -not -path "*META-INF*"); do
    echo "$(sha1sum "${file}" | awk '{print $1}') ${file#$workDir/output/tmp/}" >> "$workDir/output/tmp/hashList.txt"
  done
  truncate -s $(($(stat -c %s "$workDir/output/tmp/hashList.txt") - 1)) "$workDir/output/tmp/hashList.txt"
  cat "$workDir/output/tmp/hashList.txt" | base64 -w 0 | gzip -c9 > "$workDir/output/tmp/hashList.dat"
  rm -f "$workDir/output/tmp/hashList.txt"
  for file in $(find "$workDir/output/tmp"); do
    touch -c -t 000001010000 "$file"
  done
  cd "$workDir/output/tmp"
  make_zip || continue
  mkdir -p "$workDir/output/`basename "$mod"`"
  mv -f "$workDir/output/tmp/instpkg.zip" "$workDir/output/`basename "$mod"`/instpkg.zip"
  rm -rf "$workDir/output/tmp"
done