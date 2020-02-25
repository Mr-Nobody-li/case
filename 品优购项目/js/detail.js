window.addEventListener('load', function() {
    var preview = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
    var bigImg = document.querySelector('.bigImg')

    //1.鼠标在盒子内的时候，让遮罩层和放大图层显示
    preview.addEventListener('mouseover', function() {
        mask.style.display = 'block'
        big.style.display = 'block'
    })

    //2.鼠标离开盒子的时候，让遮罩层和放大图层隐藏
    preview.addEventListener('mouseout', function() {
        mask.style.display = 'none'
        big.style.display = 'none'
    })

    //3.鼠标在盒子内移动的时候，让遮罩层跟随鼠标走
    preview.addEventListener('mousemove', function(e) {
        var x = e.pageX - preview.offsetLeft
        var y = e.pageY - preview.offsetTop
        var maskX = x - mask.offsetWidth / 2
        var maskY = y - mask.offsetHeight / 2

        //不让遮罩层超出父盒子外面,可写成三元表达式
        var maskMax = preview.offsetWidth - mask.offsetWidth
        if (maskX < 0) {
            maskX = 0
        } else if (maskX > maskMax) {
            maskX = maskMax
        }
        if (maskY < 0) {
            maskY = 0
        } else if (maskY > maskMax) {
            maskY = maskMax
        }

        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        //4.遮罩层移动的时候，让大图片跟随移动
        // 遮罩层移动距离maskX，maskY / 遮罩层移动最大距离maskMax = 大图片移动距离bigX，bigY / 大图片移动最大距离bigMax
        var bigMax = bigImg.offsetWidth - big.offsetWidth
        var bigX = maskX * bigMax / maskMax
        var bigY = maskY * bigMax / maskMax
        bigImg.style.left = -bigX + 'px'
        bigImg.style.top = -bigY + 'px'
    })

})