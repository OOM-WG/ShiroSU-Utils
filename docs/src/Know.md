---
layout: doc
---

::: tip

 > 苏柚是一款闭源软件，其分发遵循 [F2DLPRL](https://gitcode.com/OutOfMemories-WorkGroup/F2DLPRL)，使用者需遵守相关规定。  
 > 苏柚旨在通过普通/adb/root权限全面覆盖各类 Android 设备，提升用户体验。  
 > 其两个第一方开源依赖 [FVV](https://gitcode.com/OutOfMemories-WorkGroup/FVV) 和 [NGA SDK](https://gitcode.com/OutOfMemories-WorkGroup/NGA-SDK) 可供感兴趣的用户查看。

如果你想要解锁苏柚的高阶玩法，请务必了解FVV文本格式哦！

:::

## 支持范围

### Android

- 系统为`Android 7.0+`
- 架构为`arm64-v8a`、`x86_64`、`armeabi-v7a`之一

#### root实现

> **如果你是`user`/`adb(shell)`用户，请忽略该内容**

常规的root实现方式基本上都是支持的：

- `Magisk`及其修改版本
- `KernelSU`及其修改版本
- `APatch`及其修改版本

> 其他root实现的支持持保留态度（例如`Mumu模拟器`的自带Root是不支持的！）

但是以下root实现不建议使用：

- `Kitsune Magisk` (原`Magisk Delta`)，原因：不再更新，不支持新特性
- `SukiSU Ultra`，原因：**实现有问题，影响正常使用**，且开发者抵触此root实现

::: warning
**强烈建议使用不建议的root实现的用户尽快切换到其他root实现！否则可能无法正常使用苏柚哦！**
:::

### Windows

- 系统为`Windows 10+`
- 架构为`x86_64`

#### 硬件需求

使用苏柚需要满足以下硬件需求：

- 支持传输数据的`USB-A`或`USB-C`的接口（用于与Android设备交互）

::: warning
苏柚目前还在进行**预览版**更新，功能可能出现**不稳定**、**不完整**等情况，请见谅！
:::
