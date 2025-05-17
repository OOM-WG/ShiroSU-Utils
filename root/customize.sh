#====================================================================================================
# Copyright (C) 2016-present Anne Sakitin (Tianwan Ayana) & YumeYuka.                               =
#                                                                                                   =
# Part of the SUU project.                                                                          =
# Part of the NGA project.                                                                          =
# Licensed under the F2DLPR License.                                                                =
#                                                                                                   =
# YOU MAY NOT USE THIS FILE EXCEPT IN COMPLIANCE WITH THE LICENSE.                                  =
# Provided "AS IS", WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,                                   =
# unless required by applicable law or agreed to in writing.                                        =
#                                                                                                   =
# For details about the SUU project, visit: http://suu.yumeyuka.plus.                     =
# For details about the NGA project, visit: http://app.niggergo.work.                               =
# For details about the F2DLPR License terms and conditions, visit: http://license.fileto.download. =
#====================================================================================================

[ -f "$MODPATH/nga-utils.sh" ] && . "$MODPATH/nga-utils.sh" || abort '! File "nga-utils.sh" does not exist!'
nga_install_init "config.fvv" # Don't write code before this line!

Config="$MODPATH/config.fvv"
Config_DIR="/sdcard/Android/Suu-Nyanya/"

not_magisk && {
  is_ksu && {
    nga_print "Root Type: KernelSU"
    nga_print "KernelSU Version: $KSU_VER"
    nga_print "KernelSU Version Code: $KSU_VER_CODE"
    nga_print "KernelSU Kernel Version Code: $KSU_KERNEL_VER_CODE"
  }
  is_ap && {
    nga_print "Root Type: APatch"
    nga_print "APatch Version: $APATCH_VER"
    nga_print "APatch Version Code: $APATCH_VER_CODE"
  }
} || {
  nga_print "Root Type: Magisk"
  nga_print "Magisk Version: $MAGISK_VER"
  nga_print "Magisk Version Code: $MAGISK_VER_CODE"
}
nga_print "Device Architecture: $ARCH"
nga_print "Is 64-bit: $IS64BIT"
nga_print "API Level: $API"
newline
nga_print "让杂乱无章的文件世界变得如同精美画卷般整洁可爱喵~✨"
newline
nga_print "刷入后自行评估文件位置移动带来的后果"
newline

[ -d "$Config_DIR" ] && {
  nga_print "是否覆盖配置文件..."
  nga_print "按下音量下键覆盖(其他任意键取消)"
  newline
  [ $(until_key) = down ] && {
    nga_print "配置文件已覆盖"
    cp -f "$Config" "$Config_DIR"
    true
  } || nga_print "配置文件未覆盖"
  true
} || {
  mkdir -p "$Config_DIR"
  cp -f "$Config" "$Config_DIR"
}
get_target_bin Suu-Nyanya
newline
nga_print "配置路径在 /sdcard/Android/Suu-Nyanya/config.fvv"
nga_print "Github: https://github.com/YumeYuka/Suu-Nyanya"
nga_print "如果可以的话,请给我一个Star"
newline
nga_print "按下音量下键跳转浏览器进入Github地址(其他任意键取消)"
newline

[ $(until_key) = down ] && {
  nga_print "已跳转"
  goto_url 'https://github.com/YumeYuka/Suu-Nyanya'
  true
} || nga_print "已取消跳转"

nga_install_done # Don't write code after this line!