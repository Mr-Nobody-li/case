/**
 * TODO:
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */



var express = require('express')
var student_db = require('./students')

// 1. 创建一个路由容器
var router_container = express.Router()
var fs = require('fs')
var url = require('url')


// 2. 把路由都挂载到 router 路由容器中

//2.1  渲染首页（用到students.js中的 find 方法）
router_container.get('/', function(req, res) {
    //利用回调函数，从students.js 加载学生列表
    student_db.find(function(err, data) { //这里的function是个实参
        if (err) {
            console.log(err);
            return
        } else {
            res.render('index.html', {
                students: data
            })
        }
    })

})

//2.2 添加学生页 new.html
router_container.get('/students/new', function(req, res) {
    res.render('new.html')
})

//2.3 添加新的学生之后，保存到db.json中，重定向首页index.html （用到students.js中的 sava 方法）
router_container.post('/students/new', function(req, res) {

    student_db.save(req.body, function(err) { //这里的req.body , function是个实参
        if (err) {
            console.log(err);
            return
        } else {
            res.redirect('/')
        }
    })
})


//2.4 渲染编辑学生页面 edit.html
router_container.get('/students/edit', function(req, res) {

    student_db.FindStudentById(req.query.id, function(err, CurrentIdStudent) { //这里的function是个实参
        if (err) {
            console.log(err);
            return
        } else {
            res.render('edit.html', {
                student: CurrentIdStudent
            })
        }
    })
})


//2.5 编辑学生信息之后 重新保存到db.json 并重定向首页 index.html
router_container.post('/students/edit', function(req, res) {

    student_db.UpdataStudentById(req.body, function(err) { //这里的req.body , function是个实参

        if (err) {
            console.log(err);
            return
        } else {
            res.redirect('/')
        }
    })
})


//2.6 删除学生
router_container.get('/students/delete', function(req, res) {
    student_db.DeletStudentById(req.query.id, function(err) {
        if (err) {
            console.log(err);
            return
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router_container