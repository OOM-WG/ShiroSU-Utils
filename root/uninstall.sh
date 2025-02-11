baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

{
  until_unlock 5
  del -rf /sdcard/Android/Suu-Nyanya
} &
