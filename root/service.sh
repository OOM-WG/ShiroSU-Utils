baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

until_unlock 30

nohup_bin "$baseDir/Suu-Nyanya" "nyanya"
