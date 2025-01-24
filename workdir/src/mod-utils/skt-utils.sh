# useful code by Sakitin(GitHub@GunRain 酷安@芙洛洛 bilibili@安音咲汀)

# GitHub link: https://github.com/GunRain/Magisk-Module-EG/blob/aaa/mod-root/skt-utils.sh

alias del=rm # for rm check

until_key() {
  while :; do
    local eventCode=`getevent -qlc 1 | awk '{if ($2=="EV_KEY" && $4=="DOWN") {print $3; exit}}'`
    case $eventCode in
      KEY_VOLUMEUP) printf up; return;;
      KEY_VOLUMEDOWN) printf down; return;;
      KEY_POWER) printf power; return;;
      KEY_F[1-9]|KEY_F1[0-9]|KEY_F2[0-4]) printf ${eventCode/KEY_F/f}; return;;
    esac
  done
}

until_key_up_down() {
  while :; do
    local key=`until_key`
    case $key in
      up|down) printf $key; return;;
    esac
  done
}

until_key_up_down_power() {
  while :; do
    local key=`until_key`
    case $key in
      up|down|power) printf $key; return;;
    esac
  done
}

until_key_up() {
  while :; do
    [ `until_key` = up ] && return
  done
}

until_key_down() {
  while :; do
    [ `until_key` = down ] && return
  done
}

until_key_power() {
  while :; do
    [ `until_key` = power ] && return
  done
}

goto_url() {
  [ ! -z "$1" ] || return
  am start -a android.intent.action.VIEW -d "$1" >/dev/null 2>&1
}

goto_app() {
  [ ! -z "$1" ] || return
  am start "$1" >/dev/null 2>&1
}

skt_abort() {
  type abort >/dev/null 2>&1 && abort "! $@" || { echo -e "! $@"; exit 1; }
}

skt_print() {
  type ui_print >/dev/null 2>&1 && ui_print "- $@" || echo -e "- $@"
}

newline() {
  local method=`type ui_print >/dev/null 2>&1 && printf 'ui_print ""' || printf 'echo ""'`
  [ -z "$1" ] && { eval "$method"; return; }
  for _ in $(seq 1 "$1"); do eval "$method"; done
}

get_work_dir() {
  dirname "`readlink -f "$1"`"
}

get_target_bin() {
  local targetDir="$1"
  local fileName="$2"
  local targetArch="$3"
  mv -f "$targetDir/$fileName.$targetArch" "$targetDir/$fileName" || skt_abort "Arch \"$targetArch\" is not supported!"
  find "$targetDir" -name "$fileName.*" -delete
  chmod a+x "$targetDir/$fileName"
}

run_bin() {
  local file="$1"
  [ -f "$file" ] || return
  chmod a+x "$file" 2>/dev/null
  shift
  eval "\"$file\" $@"
}

nohup_bin() {
  local file="$1"
  [ -f "$file" ] || return
  chmod a+x "$file" 2>/dev/null
  shift
  eval "nohup \"$file\" $@ >/dev/null 2>&1 &" &
}

until_boot() {
  resetprop -w sys.boot_completed 0 >/dev/null 2>&1
  [ -z "$1" ] || sleep "$1"
}

until_unlock() {
  until_boot
  until [ -d /sdcard/Android ]; do sleep 1; done
  [ -z "$1" ] || sleep "$1"
}

is_ksu() {
  [ "$KSU" = true ]
}

is_ap() {
  [ "$APATCH" = true ]
}

not_magisk() {
  is_ksu || is_ap
}

magisk_run_completed() {
  not_magisk || { [ -f "$1/boot-completed.sh" ] && exec "$1/boot-completed.sh"; }
}

set_dir_perm() {
  for dir in `find ${@} -type d`; do
    chmod 0755 "$dir"
  done
}

set_system_file() {
  chcon -R u:object_r:system_file:s0 ${@}
}

skt_install_init() {
  [ -z "$MODPATH" ] && skt_abort 'Value "MODPATH" does not exist!'

  # Check files
  local hashListFile="$MODPATH/hashList.dat"
  [ -f "$hashListFile" ] || skt_abort 'File "hashList.dat" does not exist!'
  local hashList="`cat "$hashListFile" | zcat | base64 -d`"
  for file in $(find "$MODPATH/" -type f -not -path '*META-INF*' -not -name hashList.dat); do
    [ "$(echo -n "$hashList" | grep -E " ${file#$MODPATH/}$" | awk '{print $1}')" = "$(sha1sum "$file" | awk '{print $1}')" ] || skt_abort "Failed to verify file \"${file#$MODPATH/}\"!"
  done
  del -f "$hashListFile"

  # For Sakitin
  [ "$1" = official ] && ui_print '- Official website: https://www.mod.latestfile.zip'
}

skt_install_done() {
  [ -z "$MODPATH" ] && skt_abort 'Value "MODPATH" does not exist!'
  [ -z "$ARCH" ] && skt_abort 'Value "ARCH" does not exist!'

  # For overlyfs
  [ -d "$MODPATH/system" ] && {
    set_dir_perm "$MODPATH/system"
    set_system_file "$MODPATH/system"
  }

  # Clean zygisk libs
  [ -d "$MODPATH/zygisk" ] && {
    case "$ARCH" in
      arm64) find "$MODPATH/zygisk" -name "riscv*.so" -o -name "x*.so" -delete;;
      arm) find "$MODPATH/zygisk" -name "riscv*.so" -o -name "x*.so" -o -name "*64*.so" -delete;;
      x64) find "$MODPATH/zygisk" -name "riscv*.so" -delete;;
      x86) find "$MODPATH/zygisk" -name "riscv*.so" -o -name "*64*.so" -delete;;
      riscv64) find "$MODPATH/zygisk" -name "arm*.so" -o -name "x*.so" -delete;;
    esac
  }

  # Clean useless files (just simply)
  for file in README LICENSE SECURITY; do
    for suffix in '' '.txt' '.md' '.mkd'; do 
      [ -f "$MODPATH/$file$suffix" ] && del -rf "$MODPATH/$file$suffix"
    done
  done
}