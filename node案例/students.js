/**
 * TODO:
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 * 之后会学到 promise 等API ，就不用写这么多底层代码
 * NOTICE:
 */



var path = './db.json'
var fs = require('fs')

// 1. find()  获取学生列表
exports.find = function(callback) {
    fs.readFile(path, 'utf8', function(err, data) { // path 指的是 db.json数据文件
        if (err) {
            return callback(err)
        } else {
            var db = JSON.parse(data).students //db ： students数组

            callback(null, db)
                //  console.log(JSON.parse(data).students);
        }
    })
}

/* 2. save() 添加新的学生，并保存到db.json */
exports.save = function(new_student, callback) { //这里的 new_student 和 callback 都是形参

    new_student = JSON.stringify(new_student) //去掉 [Object: null prototype]，可以封装函数
    new_student = JSON.parse(new_student)

    fs.readFile(path, 'utf8', function(err, data) { // path 指的是 db.json数据文件
        if (err) {
            return callback(err)
        } else {
            var db = JSON.parse(data).students // 添加 id ，唯一不重复
            new_student.id = db[db.length - 1].id + 1

            db.push(new_student)
            db = JSON.stringify({ // 把对象数据转换为字符串才能写入db.json中
                students: db
            })

            fs.writeFile(path, db, function(err) {
                if (err) {
                    // 错误就是把错误对象传递给它
                    return callback(err)
                }
                callback(null)
            })
        }
    })
}




/* 3.  通过id 获取一个学生数据 */
exports.FindStudentById = function(id, callback) {
    fs.readFile(path, 'utf8', function(err, data) { // path 指的是 db.json数据文件
        if (err) {
            return callback(err)
        }
        var db = JSON.parse(data).students //db ： students数组 ，可以使用es6的 find()遍历查询
        var CurrentIdStudent = db.find(function(element) {
            return element.id === parseInt(id) // 传进来的id类型是 string 需要转换成 number
        })
        callback(null, CurrentIdStudent)

    })
}

/* 4.  通过id 获取一个学生数据，编辑之后更新学生库 db.json */
exports.UpdataStudentById = function(edited_student, callback) {
    edited_student = JSON.stringify(edited_student) //去掉 [Object: null prototype]，可以封装函数
    edited_student = JSON.parse(edited_student)
    console.log(edited_student);

    fs.readFile(path, 'utf8', function(err, data) { // path 指的是 db.json数据文件
        if (err) {
            return callback(err)
        } else {
            var db_array = JSON.parse(data).students

            edited_student.id = parseInt(edited_student.id)

            var need_updata_student = db_array.find(function(element) {
                    return element.id === edited_student.id
                }) //need_updata_student ： { id: 1, name: '张三三', gender: '0', age: '22', hobbies: '吃饭、睡觉、打豆豆' }

            //遍历对象，将更新过后的学生信息（edited_student）赋值给（need_updata_student）
            for (var key in edited_student) {
                need_updata_student[key] = edited_student[key]
            }

            db_array = JSON.stringify({
                students: db_array
            })

            fs.writeFile(path, db_array, function(err) {
                if (err) {
                    // 错误就是把错误对象传递给它
                    return callback(err)
                }
            })
            callback(null)
        }
    })
}

/* 5.  通过ID删除学生 */
exports.DeletStudentById = function(id, callback) {
    fs.readFile(path, 'utf8', function(err, data) { // path 指的是 db.json数据文件
        if (err) {
            return callback(err)
        }
        var db = JSON.parse(data).students //db ： students数组 ，可以使用es6的 findIndex遍历查询在数组中的下标
        var CurrentIdIndex = db.findIndex(function(element) {
            return element.id === parseInt(id) // 传进来的id类型是 string 需要转换成 number
        })
        console.log(CurrentIdIndex);
        db.splice(CurrentIdIndex, 1) //删除这个下标的数组项

        db = JSON.stringify({ // 把对象数据转换为字符串才能写入db.json中
            students: db
        })
        fs.writeFile(path, db, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            callback(null)
        })
    })
}