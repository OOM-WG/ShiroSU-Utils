baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

goto_url 'https://intelligent.nightrainmilkyway.cn'