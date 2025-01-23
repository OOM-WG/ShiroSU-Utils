[ -f "$MODPATH/skt-utils.sh" ] && . "$MODPATH/skt-utils.sh" || abort '! File "skt-utils.sh" does not exist!'
skt_install_init # Don't write code before this line!

Config="$MODPATH/config.json"
Config_DIR="/sdcard/Android/Intelligent/"

not_magisk && {
  is_ksu && {
    skt_print "Root Type: KernelSU"
    skt_print "KernelSU Version: $KSU_VER"
    skt_print "KernelSU Version Code: $KSU_VER_CODE"
    skt_print "KernelSU Kernel Version Code: $KSU_KERNEL_VER_CODE"
  }
  is_ap && {
    skt_print "Root Type: APatch"
    skt_print "APatch Version: $APATCH_VER"
    skt_print "APatch Version Code: $APATCH_VER_CODE"
  }
} || {
  skt_print "Root Type: Magisk"
  skt_print "Magisk Version: $MAGISK_VER"
  skt_print "Magisk Version Code: $MAGISK_VER_CODE"
}
skt_print "Device Architecture: $ARCH"
skt_print "Is 64-bit: $IS64BIT"
skt_print "API Level: $API"
newline
skt_print "智能分类文件夹，以及干掉一些垃圾的文件夹"
skt_print "完全支持定义配置文件"
skt_print "支持第三方文件重定向"
skt_print "删除某些空文件夹以及文件(支持白名单...)"
newline 2

[ -d "$Config_DIR" ] && {
  skt_print "是否覆盖配置文件..."
  skt_print "按下音量下键覆盖(其他任意键取消)"
  newline
  [ `until_key` = down ] && { 
    skt_print "配置文件已覆盖"
    cp -f "$Config" "$Config_DIR"
    true
  } || skt_print "配置文件未覆盖"
  true
} || {
  mkdir -p "$Config_DIR"
  cp -f "$Config" "$Config_DIR"
}

newline 2
skt_print "配置路径在 /sdcard/Android/Intelligent/config.json"
skt_print "Github: https://github.com/YumeYuka/intelligent"
skt_print "如果可以的话，请给我一个Star"
newline
skt_print "按下音量下键跳转浏览器进入Github地址(其他任意键取消)"
newline

[ `until_key` = down ] && { 
  skt_print "已跳转"
  goto_url 'https://github.com/YumeYuka/intelligent'
  true
} || skt_print "已取消跳转"

skt_install_done # Don't write code after this line!