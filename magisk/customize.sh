[ -f "$MODPATH/skt-utils.sh" ] && . "$MODPATH/skt-utils.sh" || abort '! File "skt-utils.sh" does not exist!'

skt_mod_install # Don't write code before this line!

Config="$MODPATH/config.json"
Config_DIR="/storage/emulated/0/Android/Intelligent/"

ui_print "- Magisk Version: $MAGISK_VER"
ui_print "- Magisk Version Code: $MAGISK_VER_CODE"
ui_print "- Device Architecture: $ARCH"
ui_print "- Is 64-bit: $IS64BIT"
ui_print "- API Level: $API"

ui_print "- 智能分类文件夹，以及干掉一些垃圾的文件夹"
ui_print "- 完全支持定义配置文件"
ui_print "- 支持第三方文件重定向"
ui_print "- 删除某些空文件夹以及文件(支持白名单...)"

ui_print ""
ui_print ""

cover_config() {
  ui_print "- 是否覆盖配置文件..."
  ui_print "- 按下音量下键覆盖"
  sleep 0.5
  key=$(until_key)
  
  if [ "$key" = "down" ]; then
    cp -f "$Config" "$Config_DIR"  
    ui_print "- 配置文件已覆盖"
  else
    ui_print "- 配置文件未覆盖"
  fi
}


if [ -d "$Config_DIR" ]; then
    cover_config
else
    mkdir -p "$Config_DIR"
    cp -f "$Config" "$Config_DIR"
    rm -rf "$Config"
fi

sleep 0.5
ui_print "配置路径在/storage/emulated/0/Android/Intelligent/config.json"
ui_print "Github: https://github.com/YumeYuka/intelligent"
ui_print "如果可以的话，请给我一个Star"

skt_mod_install_finish # Don't write code after this line!
