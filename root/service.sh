# code by @YumeYuka

baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

# code before boot completed

until_boot 90
nohup_bin "$baseDir/Intelligent" 

# code after boot completed and before unlocked

# run boot-completed.sh if it exists and root is not supported by KernelSU or APatch, then other code in this script will not run
# run_boot_completed_if_magisk "$baseDir"

until_unlock

# code after unlocked


