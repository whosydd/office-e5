# office e5

## 参考：

- [Microsoft Graph REST API 1.0 版参考](https://docs.microsoft.com/zh-cn/graph/api/overview?view=graph-rest-1.0)
- [mailFolder 资源类型](https://docs.microsoft.com/zh-cn/graph/api/resources/mailfolder?view=graph-rest-1.0)

## 前提：

加入Microsoft 365 开发人员计划：[戳这里](https://developer.microsoft.com/zh-cn/microsoft-365/dev-program)

## 使用：

### Microsoft Azure相关配置

#### 登录：[戳这里](https://portal.azure.com/#home)

![Screenshot of 主页 - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142011873.jpg)



#### 应用注册

![Screenshot of whosydd - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142016721.jpg)

#### ![Screenshot of 注册应用程序 - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142019665.jpg)

![Screenshot of test - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142022199.jpg)

![Screenshot of 添加客户端密码 - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142025591.jpg)

![Screenshot of test - Microsoft Azure (1)](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142026040.jpg)

![Screenshot of 请求获取 API 权限 - Microsoft Azure](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142030005.jpg)

![Screenshot of 请求获取 API 权限 - Microsoft Azure (1)](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142031852.jpg)

![Screenshot of 请求获取 API 权限 - Microsoft Azure (2)](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142032221.jpg)

![Screenshot of test - Microsoft Azure (2)](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142034488.jpg)

> 如果使用子账号注册应用，添加权限后，需要切换到**管理员**才能点击`代表xxx授予管理员同意`

![Screenshot of whosydd - Microsoft Azure (1)](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142040384.jpg)

## 环境变量：

### 必须：建议将其添加到 github repo 的`secret`中

![Screenshot of Actions secrets](https://raw.githubusercontent.com/whosydd/images-in-one/main/images/202202142049045.jpg)

- `USER_ID`：用户ID（概述里查看）
- `TENANT`：目录(租户) ID
- `CLIENT_ID`：应用程序(客户端) ID
- `CLIENT_SECRET`：客户端密码

### 邮件：可以直接在 github actions 的`env`中配置

- `DRAFT_MAIL_TITLE`：草稿：标题
- `DRAFT_MAIL_ADDRESS`：草稿：收件人邮箱
- `SEND_MAIL_TITLE`：发送：标题
- `SEND_MAIL_ADDRESS`发送：收件人邮箱(为了防止我的邮箱邮件过多，请在`secret`中配置你自己的邮箱)

## REST测试：

项目根目录提供`test.http`用于进行本地测试，该文件提供mail相关的部分api

如果需要测试接口，请在项目根目录创建`.env`文件，并配置环境变量

## 运行：

### 脚本1：

```sh
npm run start
```

#### 调用接口：

- 读取`草稿箱`中的邮件
- 当草稿数量小于`5`，会自动创建草稿
- 读取`已删除邮件`中的邮件
- 当草稿数量大于等于`5`，会将所有草稿移动到`已删除邮件`中
- 当`已删除邮件`中邮件数量大于等于`10`，会将该文件夹中所有邮件删除

### 脚本2：

```sh
npm run send
```

#### 调用接口：

- 发送邮件

> 可在控制台查看相关log

### 配置邮件内容：

邮件内容可以在`src/config`中修改`draft.html`和`send.html`

> 邮件的标题和收件人信息需要在`环境变量`中配置

## PS:

[戳这里查看官方SDK](https://docs.microsoft.com/zh-cn/graph/sdks/sdk-installation?view=graph-rest-1.0)

- 由于对`Microsoft Graph JavaScript SDK`还不熟悉，所以此项目目前还只是简单的使用`axios`发送请求，目前正在学习`golang`，之后可能会使用GO语言重构代码，先立个flag吧~

- 由于本项目比较折腾，所以主要目的还是为了学习~
- 我写的代码比较屎，欢迎pr~
