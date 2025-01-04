---
title: 自定义配置
index: false
icon: file
date: 2024-12-24
category:
  - 自定义配置
---


阅读此模块可以了解如何配置`Intelligen`模块自定义配置文件。

<!-- more -->

## name

* 类型: `string`
* 默认值: `intelligen`
`name`是一个字符串，用于定义配置文件的名称。

## author

* 类型: `string`
* 默认值: `intelligen`
* 作者: `intelligen`
`author`是一个字符串，用于定义配置文件的作者。

## version

* 类型: `string`
* 默认值: `1.0`
`version`是一个字符串，用于定义配置文件的版本。

## Classify

* 类型: `String`
* 默认值: `/storage/emulated/0/Classify`
`Classify`是一个字符串，用于定义分类文件夹的路径。

## ThirdParty

* 类型: `String[]`
* 默认值: `Download`
`ThirdParty`是一个字符串数组，用于定义第三方文件夹的名称。
可以添加多个第三方文件夹，例如`Download`、`Tencent`、`WeChat`等。

``` json
"ThirdParty": {
    "Download": "/storage/emulated/0/Download"
      ...
  },
```
## DefaultFolder

* 类型: `String[]`
* 默认值: `Apk ...`
`DefaultFolder`是一个字符串数组，用于定义分类文件夹的名称.
可以添加多个分类文件夹，例如`Apk`、`Document`、`Music`等.
其对应值为分类文件的类型.

``` json
"DefaultFolder": {
    "Compressed": ["zip","rar","7z","tar","gz","bz2","xz","z","iso"],
    "Programs": ["exe", "msi", "bat", "sh"],
    "Video": ["mp4", "mkv", "avi", "mov", "wmv"],
    "Document": ["doc", "docx", "pdf", "txt", "xls", "xlsx", "ppt", "pptx"],
    "Apk": ["apk","apks"],
    "Music": ["mp3", "wav", "flac", "aac"],
    "Picture": ["jpg", "jpeg", "png", "gif", "bmp"],
    "Other": ["null"],
    "test": ["null"]
      ...
  },

```

## EmptyFolder

* 类型: `string`
* 默认值: `/storage/emulated/0`
`EmptyFolder`是一个字符串，用于定义清理空文件夹的路径
改规则遵循白名单机制，不在白名单中的文件夹将被删除

## IgnorFoldeer

* 类型: `string`
* 默认值: `/storage/emulated/0/Android/data`
`IgnorFoldeer`是一个字符串数组，用于定义忽略清理空文件夹的路径

``` json
"IgnorFoldeer": {
    "default1": "/storage/emulated/0/Android",
    "default2": "/storage/emulated/0/Classify"
     ...
  }
```
## ForceDelete

* 类型: `string`
* 默认值: `/storage/emulated/0/*`
`ForceDelete`是一个字符串数组，用于定义强制删除文件夹的路径,用于删除厂商留在设备上的无用文件

``` json
"ForceDelete": {
    "default1": "/storage/emulated/0/MIUI",
    "default2": "/storage/emulated/0/.xlDownload",
    "default3": "/storage/emulated/0/Tencent"
     ...
  }
```
