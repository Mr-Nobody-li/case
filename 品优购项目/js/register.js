window.addEventListener('load', function() {
    var tel = document.querySelector('.phone')
    var regtel = /^1[3|4|5|6|7|8]\d{9}$/
    var qq = document.querySelector('.qq')
    var regqq = /^[1-9][0-9]{4,}/
    var name = document.querySelector('.name')
    var regname = /^[\u4e00-\u9fa5]{2,}$/
    var psw = document.querySelector('.password')
    var regpsw = /^[a-zA-Z]\w{5,17}$/
    var confirm_password = document.querySelector('.confirm_password')

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) { //nextElementSibling:这个节点的下一个兄弟节点
                this.nextElementSibling.className = 'correct'
                this.nextElementSibling.innerHTML = '&nbsp<i class="correct-icon"></i><p>  格式正确!</p>'

            } else {
                this.nextElementSibling.className = 'error'
                this.nextElementSibling.innerHTML = '&nbsp<i class="error-icon"></i><p>  格式错误，请重新输入!</p>'
            }
        }
    }
    regexp(tel, regtel)
    regexp(qq, regqq)
    regexp(name, regname)
    regexp(psw, regpsw)

    function Confirm_Password(confirm_password) {
        confirm_password.onblur = function() {
            if (this.value === psw.value) {
                this.nextElementSibling.className = 'correct'
                this.nextElementSibling.innerHTML = '&nbsp<i class="correct-icon"></i><p>  密码正确!</p>'
            } else {
                this.nextElementSibling.className = 'error'
                this.nextElementSibling.innerHTML = '&nbsp<i class="error-icon"></i><p>  两次密码输入不一致!</p>'
            }
        }
    }

    Confirm_Password(confirm_password)



})