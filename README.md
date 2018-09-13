# wepack4 项目初始框架

#### 项目介绍
个人项目webpack初始框架，具备以下功能

1. 多页面应用，自动配置多入口多出口
2. 将less编译压缩成css，以外部样式表引入html
3. html压缩，支持#include('xx.html')引入子页面
4. js混淆压缩，公共代码提取(common.js)
5. 静态资源处理，图片低于5kb转化为base64格式，不另外使用实体图片存储
6. 开发实时监控，自动刷新浏览器

#### 软件架构
本初始框架使用webpack4前端静态打包器，[webpack中文官网](https://www.webpackjs.com/)，意在方便前端开发

#### 项目骨架
┌—-dist(编译后自动生成)<br>
├--node_modules(依赖模块，install后生成)<br>
|<br>
┊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌--common(公共资源)<br>
├--src┼--components(组件)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├--img(图片静态资源)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├--js(js文件)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├--less(less样式文件)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┊<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html文件<br>

> 一个html文件需对应在js文件夹里有一相同名字的js文件，不然自动配置的多入口无法生效

#### 安装及使用教程

1. 安装依赖  `cnpm install`
2. 使用命令：`npm run build-prd` 打包生产文件
3. 使用命令：`npm run dev` 实时开发


#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### Update Log

    V1.0.0
        初始化导入，修复部分问题，提交README.md
    V1.0.1
        添加自动添加Entry入口及自动配置HtmlWebpackPlugin功能，无须每次添加页面均要修改webpack配置文件