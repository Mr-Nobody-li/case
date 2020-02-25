$(function() {
    //1.全选(checkall) 全不选的功能模块
    $('.checkall').change(function() {
        //console.log($(this).prop('checked')); //注意prop()与attr()的区别
        $('.j-checkbox, .checkall').prop("checked", $(this).prop('checked'))

        //全选之后，所有商品背景颜色变成粉色
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item')
        } else {
            $('.cart-item').removeClass('check-cart-item')
        }
    })

    //2.小复选框(j-checkbox)全部选上之后，全选按钮被选中，否则不被选中
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }

        //选中某个商品之后，这个商品背景颜色变为粉色
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item')
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item')
        }
    })

    //3.增减商品数量模块，首先声明一个变量，当点击加号（.increment）时就让这个变量++，然后赋值给文本框（.itxt）
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val()
            //console.log(n);
        n++
        $(this).siblings('.itxt').val(n)

        //4.数量增减之后小计金额改变
        var p = $(this).parents('.p-num').siblings('.p-price').html().substr(1)
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2))
        getSum()
    })

    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val()
            //console.log(n);
        if (n == 1) {
            return false
        } else {
            n--
            $(this).siblings('.itxt').val(n)
            var p = $(this).parents('.p-num').siblings('.p-price').html().substr(1)
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2))
            getSum()
        }
    })

    //5.修改（.itxt）的值，小计的价格随之改变
    $('.itxt').change(function() {
        var n = $(this).val()
        var p = $(this).parents('.p-num').siblings('.p-price').html().substr(1)
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2))
        getSum()
    })

    //6.计算总计和总额
    getSum()

    function getSum() {
        var count = 0; //总计
        var money = 0; //总额
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val())
        })
        $('.amount-sum em').text(count)

        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1))
        })
        $('.price-sum em').text('￥' + money.toFixed(2))
    }

    //7.删除商品模块
    //(1)商品后面的删除按钮
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove()
        getSum()
    })

    //(2)删除选中的商品
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove()
        getSum()
    })

    //(3)清空购物车 删除全部
    $('.clear-all').click(function() {
        $('.cart-item').remove()
        getSum()
    })
})