---
title: 自定义配置
icon: file
index: false
category:
  - 自定义配置
---


阅读此模块可以了解如何配置`Intelligen`模块自定义配置文件。

###### 注意

Intelligen使用开源的[FVV文本格式](https://github.com/GunRain/FVV)，您应该先了解该文本格式后再配置配置文件。

## Name

* 类型: `string`
* 示例值: `Intelligent Config`
`name`是一个字符串，用于定义配置文件的名称。

## Author

* 类型: `string`
* 示例值: `张三`
`author`是一个字符串，用于定义配置文件的作者。

## Version

* 类型: `string`
* 示例值: `1.0.0`
`version`是一个字符串，用于定义配置文件的版本。

## Classify

* 类型: `String`
* 示例值: `/sdcard/Classify`
`Classify`是一个字符串，用于定义分类文件夹的路径。

## ThirdParty

* 类型: `String[]`
* 示例值:
``` fvv
ThirdParty = {
  默认下载路径 = ["/sdcard/Download"];
  <其他路径...>
};
```
`ThirdParty`是一个字符串数组，用于定义第三方文件夹的名称。
可以添加多个第三方文件夹，例如`Download`、`Tencent`、`WeChat`等。
::: important
`ThirdPart`中的文件夹将会一直被监听，`请勿写入嵌套路径等可能导致运行出错的配置！！！` (eg. 已经有了`/sdcard/Download`还写入`/sdcard/Download/XXX`或者再写入`/storage/emulated/0/Download`)
:::

## DefaultFolder

* 类型: `String[]`
* 示例值:
``` fvv
DefaultFolder = {
  FVV文本文件 = ["fvv", "fw", "rpp", "rxx", "r++"];
  RKSTDC压缩文件 = ["rkc"];
  <其他后缀...>
};
```
`DefaultFolder`是一个字符串数组，用于定义分类文件夹的名称。
可以添加多个分类文件夹，例如`Apk`、`Document`、`Music`等。
其对应值为分类文件的类型。

## EmptyFolder

* 类型: `string[]`
* 示例值:
``` fvv
EmptyFolder = [
  "/sdcard",
  <其他路径...>
];
```
`EmptyFolder`是一个字符串数组，用于定义清理空文件夹的路径。
改规则遵循白名单机制，不在白名单中的文件夹将被删除。

## IgnoreFolder

* 类型: `string[]`
* 示例值:
``` fvv
IgnoreFolder = [
  "/sdcard/Android",
  <其他路径...>
];
```
`IgnoreFolder`是一个字符串数组，用于定义忽略清理空文件夹的路径。
::: important
`Classify`的路径会被自动添加进`IgnoreFolder`，无需手动配置
:::

## ForceDelete

* 类型: `string[]`
* 示例值:
``` fvv
ForceDelete = [
  "/sdcard/.xlDownload",
  <其他路径...>
];
```
`ForceDelete`是一个字符串数组，用于定义强制删除文件夹的路径,用于删除厂商留在设备上的无用文件。
