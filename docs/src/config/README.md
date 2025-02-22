---
title: 自定义配置
icon: file
index: false
category:
  - 自定义配置
---


阅读此模块可以了解如何配置`苏柚Nyanya`模块自定义配置文件。

###### 注意

苏柚Nyanya使用开源的[FVV文本格式](https://github.com/GunRain/FVV)，您应该先了解该文本格式后再配置配置文件。

## Name

* 类型: `string`
* 示例值: `苏柚Nyanya配置文件`
`Name`是一个字符串，用于定义配置文件的名称。

## Author

* 类型: `string`
* 示例值: `张三`
`Author`是一个字符串，用于定义配置文件的作者。

## Version

* 类型: `string`
* 示例值: `1.0.0`
`Version`是一个字符串，用于定义配置文件的版本。

## Classify

* 类型: `string`
* 示例值: `/sdcard/Classify`
`Classify`是一个字符串，用于定义分类文件夹的路径。

## Delay

* 类型: `int`
* 示例值: `60`
`Delay`是一个整数，用于定义分类文件前的延时时间，单位为`喵(秒)`。

## MultiUser

* 类型: `bool`
* 示例值: `false`
`MultiUser`是一个布尔值，用于定义是否启用多用户功能，如果您的设备上没有启用多用户，开启与关闭没有区别，请按需选择。

## SubApp

* 类型: `bool`
* 示例值: `true`
`SubApp`是一个布尔值，用于定义是否启用分监听路径分类功能，开启后会以监听路径组名称为分类文件的分类路径，关闭则是所有分类文件放到同一分类路径。

## SubTime

* 类型: `bool`
* 示例值: `true`
`SubTime`是一个布尔值，用于定义是否启用分时间分类功能，开启后会以当前日期为分类文件的分类路径，关闭则是所有分类文件放到同一分类路径。

## DefaultType

* 类型: `string`
* 示例值: `其他`
`DefaultType`是一个字符串，用于定义分类文件的默认类型。

## IgnoreNoSuffix

* 类型: `bool`
* 示例值: `true`
`IgnoreNoSuffix`是一个布尔值，用于定义是否启用忽略无后缀文件功能。

## ListenList

* 类型: `string[]`
* 示例值:
``` fvv
ListenList = {
  默认下载路径 = ["/sdcard/Download"];
  <其他路径...>
};
```
`ListenList`是一个字符串组组，用于定义监听路径的名称以及路径。
可以添加多个监听路径，例如`Download`、`Tencent`、`WeChat`等。
::: caution
`ListenList`中的路径将会一直被监听，**请勿写入嵌套路径等可能导致运行出错的配置！！！** (eg. 已经有了`/sdcard/Download`还写入`/sdcard/Download/XXX`或者再写入`/storage/emulated/0/Download`)
:::

## SuffixList

* 类型: `string[]`
* 示例值:
``` fvv
SuffixList = {
  FVV文本文件 = ["fvv", "fw", "rpp", "rxx", "r++"];
  RKSTDC压缩文件 = ["rkc"];
  <其他后缀...>
};
```
`SuffixList`是一个字符串组组，用于定义分类后缀的文件夹名称以及后缀。
可以添加多个分类文件夹，例如`Apk`、`Document`、`Music`等。
其对应值为分类文件的类型。

## IgnoreList

* 类型: `string[]`
* 示例值:
``` fvv
IgnoreList = [
  "bak",
  <其他后缀...>
];
```
`IgnoreList`是一个字符串组，用于定义要忽略的文件后缀。

## NameList

* 类型: `string[]`
* 示例值:
``` fvv
NameList = {
  喵喵喵 = ["喵", "meow"];
  生活 = ["114514", "一一四五一四"];
  <其他名称...>
};
```
`NameList`是一个字符串组组，用于定义分类名称的文件夹名称以及名称。

## IgnoreNameList

* 类型: `string[]`
* 示例值:
``` fvv
IgnoreNameList = [
  "tmp",
  <其他名称...>
];
```
`IgnoreNameList`是一个字符串组，用于定义要忽略的文件名称。