#!/system/bin/sh
MODDIR=${0%/*}

ui_print "Magisk Version: $MAGISK_VER"
ui_print "Magisk Version Code: $MAGISK_VER_CODE"

ui_print "Device Architecture: $ARCH"
ui_print "Is 64-bit: $IS64BIT"
ui_print "API Level: $API"

ui_print "智能分类文件夹，以及干掉一些垃圾的文件夹"
ui_print "完全支持定义配置文"
ui_print "支持第三方文件重定向(刨坑中，后面回咕咕)"
ui_print "删除某些空文件夹以及文件(支持白名单...)"

//判断是否存在文件夹
if [ ! -d "/storage/emulated/0/Android/Intelligent" ]; then
  mkdir -p /storage/emulated/0/Android/Intelligent

fi

cp -r $MODPATH/config.json /storage/emulated/0/Android/Intelligent
rm -rf $MODPATH/config.json

ui_print ""
ui_print ""
ui_print "Github: https://github.com/NightRainMilkyWay/intelligent"
