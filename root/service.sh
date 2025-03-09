#=================================================================================================================
# Copyright (c) 2023-present Anne Sakitin (Tianwan Ayana) & YumeYuka.                                            =
#                                                                                                                =
# Part of the SUU project.                                                                                       =
# Part of the NGA project.                                                                                       =
# Licensed under the F2DLPR License.                                                                             =
#                                                                                                                =
# YOU MAY NOT USE THIS FILE EXCEPT IN COMPLIANCE WITH THE LICENSE.                                               =
# Provided "AS IS", WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,                                                =
# unless required by applicable law or agreed to in writing.                                                     =
#                                                                                                                =
# For details about the SUU project, visit: https://www.mod.latestfile.zip.                                      =
# For details about the NGA project, visit: http://app.niggergo.work.                                            =
# For details about the F2DLPR License terms and conditions, visit: http://license.fileto.download.              =
#=================================================================================================================

baseDir="$(dirname "$(readlink -f "$0")")"
[ -f "$baseDir/skt-utils.sh" ] && . "$baseDir/skt-utils.sh" || exit

until_unlock 30

nohup_bin "$baseDir/Suu-Nyanya" "nyanya"
