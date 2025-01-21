# code by @YumeYuka

<<<<<<< HEAD
baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

# code before boot completed

until_boot 90
nohup_bin "$baseDir/Intelligent" 

# code after boot completed and before unlocked

# run boot-completed.sh if it exists and root is not supported by KernelSU or APatch, then other code in this script will not run
run_boot_completed_if_magisk "$baseDir"

until_unlock

# code after unlocked


=======
sleep 120
chmod 777 ./Intelligent
nohup ./Intelligent > /dev/null 2>&1 &
>>>>>>> 86e93bc7eca70b099cee85b567ede057345933e9
