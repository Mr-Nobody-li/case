window.addEventListener('load', function() {
    /* 【一、当按下s的时候 搜索框获得焦点】 */
    var input = document.querySelector('input')
    document.addEventListener('keyup', function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 83) {
            input.focus()
        }
    })

    /* 【二、原生JavaScript侧边导航栏 Slider-bar】 */
    /*     var main = document.querySelector('.main')
        var sliderbar = document.querySelector('.slider-bar')
        var gotop = document.querySelector('.go-top')
        var maintop = main.offsetTop
        var sliderbartop = sliderbar.offsetTop
        var top = sliderbar.offsetTop - main.offsetTop
        document.addEventListener('scroll', function() {
            if (window.pageYOffset >= maintop) {
                sliderbar.style.position = 'fixed'
                sliderbar.style.top = top + 'px'
                gotop.style.display = 'block'

            } else {
                sliderbar.style.position = 'absolute'
                sliderbar.style.top = 300 + 'px'
                gotop.style.display = 'none'
            }
        })
        gotop.addEventListener('click', function() {
            //window.scroll(0, 100)  页面滚动
            ReturnTopAnimate(window, 0) //返回顶部动画函数
        }) */

    /* 【二、jQuery侧边电梯导航 Slider-bar】 */
    $(function() {
        var flag = true

        //显示隐藏电梯导航,可以封装函数
        $(window).scroll(function() {
            if ($(document).scrollTop() >= $('.focus').offset().top) {
                $('.slider-bar').fadeIn()
            } else {
                $('.slider-bar').fadeOut()
            }

            //当页面滑动到某一楼层时，该楼层对应电梯导航处添加current类
            if (flag) {
                $('.flour .w').each(function(i, ele) {
                    if ($(document).scrollTop() > $(ele).offset().top - 20) {
                        $('.top1,.top2').eq(i).addClass('current').siblings().removeClass('current')
                    }
                })
            }
        })

        //点击电梯导航跳到对应楼层，并且点击的地方背景颜色及文字颜色改变（current类）
        $('.top1,.top2').click(function() {
            flag = false
            var current = $('.flour .w').eq($(this).index() - 1).offset().top
            $(this).addClass('current').siblings().removeClass('current')
            $('html,body').stop().animate({ scrollTop: current }, function() {
                flag = true;

            })

        })
    })


    /* 【三、轮播图】 */
    //1.显示隐藏next和prev两个箭头
    var next = document.querySelector('.next')
    var prev = document.querySelector('.prev')
    var focus = document.querySelector('.focus')
    var focuswidth = focus.offsetWidth
    focus.addEventListener('mouseover', function() {
        next.style.display = 'block'
        prev.style.display = 'block'
        clearInterval(timer) //停止自动轮播
        timer = null //清除timer变量
    })
    focus.addEventListener('mouseleave', function() {
        next.style.display = 'none'
        prev.style.display = 'none'
        timer = setInterval(function() { //开始自动轮播
                next.click() //手动调用点击事件
            },
            3000)
    })

    //2.小圆点数量随着图片的个数动态变化
    var ul = focus.querySelector('ul')
    var ol = focus.querySelector('ol')
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li')
        li.setAttribute('index', i) //给每个ol里面的li设置索引号，4.图片滑动里面计算移动距离要用到
        ol.appendChild(li)
        ol.children[0].className = 'current' //这句话不能写成 li[0].className = ''，会报错

        //3.点击哪个小圆点，哪个变红色，排他思想(创建li的同时添加点击事件)
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'

            //4.点击小圆点，让图片滑动,记得给移动对象添加定位，动画函数里面的移动是定位做的
            var index = this.getAttribute('index') // this.getAttribute('index') 不能直接写成this.index
            num = circle = index //（全局联动）将三个索引联系在一起
            animate(ul, -index * focuswidth) //移动的距离 = index属性值 × focus的宽度
        })
    }

    //5.克隆第一张轮播图到最后面
    var ulFirstChild = ul.children[0].cloneNode(true)
    ul.appendChild(ulFirstChild)

    //6.右箭头
    var num = 0 //右箭头 索引
    var circle = 0 //右箭头和小圆点 索引
    var flag = true //优化：节流阀
    next.addEventListener('click', function() {
        if (flag) {
            flag = false //优化：关闭节流阀
            if (num === ul.children.length - 1) { //无缝循环播放
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focuswidth, function() { //优化：打开节流阀
                flag = true
            })

            //7.点击右箭头，小圆点跟随轮播图一起变化
            circle++
            if (circle === ol.children.length) {
                circle = 0
            }
            CircleClassNameChange()
        }
    })

    //8.左箭头
    prev.addEventListener('click', function() {
        if (flag) {
            flag = false //优化：关闭节流阀
            if (num === 0) { //无缝循环播放
                num = ul.children.length - 1
                ul.style.left = -num * focuswidth + 'px'
            }
            num--
            animate(ul, -num * focuswidth, function() {
                flag = true
            })

            //9.点击左箭头，小圆点跟随轮播图一起变化
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            CircleClassNameChange()
        }
    })

    function CircleClassNameChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    }

    //10.自动播放轮播图片
    var timer = setInterval(function() {
        next.click() //手动调用点击事件
    }, 3000)
})