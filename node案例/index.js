/**
 * TODO:
 * app.js 入门模块
 * 职责：
 *   创建服务             var app = express()
 *   做一些服务相关配置    app.engine()
 *   模板引擎             art-template
 *   body-parser         解析表单 post 请求体
 *   提供静态资源服务      app.use()
 *   挂载路由             app.use()
 *   监听端口启动服务      app.listen()
 */



var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')

//express-art-template 配置
app.engine('html', require('express-art-template'))

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

// 配置模板引擎和 【body-parser】 一定要在 app.use(router) 挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(3000, function() {
    console.log('http://127.0.0.1:3000');

})