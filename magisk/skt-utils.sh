# useful code by Sakitin(GitHub@GunRain 酷安@芙洛洛 bilibili@安音咲汀)

# GitHub link: https://github.com/GunRain/Magisk-Module-EG/blob/aaa/mod-root/skt-utils.sh

alias del=rm # for rm check

check_files() {
  targetDir="$1"
  hashListFile="$targetDir/hashList.dat"
  test ! -f "$hashListFile" && { abort '! File "hashList.dat" does not exist!' 2>/dev/null || { echo '! File "hashList.dat" does not exist!'; exit 1; }; }
  hashList="$(cat "$hashListFile" | zcat)"
  for file in $(find "$targetDir/" -type f -not -path '*META-INF*' -not -name hashList.dat); do
    [ "$(echo -n "$hashList" | grep -E " ${file#$targetDir/}$" | awk '{print $1}')" = "$(sha1sum "$file" | awk '{print $1}')" ] || { abort "! Failed to verify file \"${file#$targetDir/}\"!" 2>/dev/null || { echo "! Failed to verify file \"${file#$targetDir/}\"!"; exit 1; }; }
  done
}

get_target_bin() {
  targetDir="$1"
  fileName="$2"
  targetArch="$3"
  mv -f "$targetDir/$fileName.$targetArch" "$targetDir/$fileName" || { abort "! Arch \"$targetArch\" is not supported!" 2>/dev/null || { echo "! Arch \"$targetArch\" is not supported!"; exit 1; }; }
  del -f $targetDir/$fileName.*
  chmod a+x "$targetDir/$fileName"
}

until_key() {
  while :; do
    eventInfo="$(getevent -qlc 1)"
    eventType="$(echo -n "$eventInfo" | awk '{print $2}')"
    [ "$eventType" = EV_KEY ] || continue
    eventValue="$(echo -n "$eventInfo" | awk '{print $4}')"
    [ "$eventValue" = DOWN ] || continue
    eventCode="$(echo -n "$eventInfo" | awk '{print $3}')"
    case "$eventCode" in
      KEY_VOLUMEUP) echo -n up; return;;
      KEY_VOLUMEDOWN) echo -n down; return;;
      KEY_POWER) echo -n power; return;;
    esac
  done
}

until_key_up() {
  until [ `until_key` = up ]; do
    sleep 0.1
  done
}

until_key_down() {
  until [ `until_key` = down ]; do
    sleep 0.1
  done
}

until_key_power() {
  until [ `until_key` = power ]; do
    sleep 0.1
  done
}

get_work_dir() {
  echo -n "$(dirname "$(readlink -f "$1")")"
}

until_boot() {
  resetprop -w sys.boot_completed 0 >/dev/null 2>&1
  [ "$1" = '' ] || sleep "$1"
}

until_unlock() {
  until_boot
  until [ -d /sdcard/Android ]; do sleep 1; done
  [ "$1" = '' ] || sleep "$1"
}

run_bin() {
  file="$1"
  [ -f "$file" ] || return
  chmod a+x "$file" 2>/dev/null
  shift
  eval "\"$file\" $@"
}

nohup_bin() {
  file="$1"
  [ -f "$file" ] || return
  chmod a+x "$file" 2>/dev/null
  shift
  eval "nohup \"$file\" $@ >/dev/null 2>&1 &" &
}

run_boot_completed_if_magisk() {
  [ "$KSU$APATCH" != true ] && [ -f "$1/boot-completed.sh" ] && { . "$1/boot-completed.sh"; exit; }
}

set_system_file() {
  chcon -R u:object_r:system_file:s0 ${@}
}

set_dir_perm() {
  for dir in `find ${@} -type d`; do
    chmod 0755 "$dir"
  done
}

skt_mod_install() {
  [ "$MODPATH" = '' ] && { abort '! Value "MODPATH" does not exist!' 2>/dev/null || { echo '! Value "MODPATH" does not exist!'; exit 1; }; }
  check_files "$MODPATH"
  del -f "$hashListFile"
  [ "$1" = official ] && ui_print '- Official website: https://www.mod.latestfile.zip'
}

skt_mod_install_finish() {
  [ "$MODPATH" = '' ] && { abort '! Value "MODPATH" does not exist!' 2>/dev/null || { echo '! Value "MODPATH" does not exist!'; exit 1; }; }
  [ -d "$MODPATH/system" ] && {
    set_system_file "$MODPATH/system"
    set_dir_perm "$MODPATH/system"
  }
}