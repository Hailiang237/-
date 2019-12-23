import { tool, $ } from "./tool.js";//引入模块
class Registery {
    constructor() {
        this.oemail = document.querySelector('#email');
        this.opassword1 = document.querySelector('#password1');
        this.opassword2 = document.querySelector('#password2');
        this.ophone = document.querySelector('#phone');
        this.ovcode = document.querySelector('#vcode');
        this.osubmit = document.querySelector('#submit');
        this.opass = document.querySelectorAll('.pass span');
        this.oyzm = document.querySelector('.yzm');
        this.ohyz = document.querySelector('.hyz');
        this.otishi = document.querySelector('.tishi');
        this.arrnum=[];
    }
    init() {
        this.email()//oemail 设置邮箱
        this.password();//设置密码
        this.phone();//验证手机号
        this.vcode();//验证码
        this.submit();//提交
    }
    email() {//oemail 设置邮箱
        this.email_input();
        this.email_blur();
    }
    email_input() {
        this.oemail.oninput = function () {
            this.nextElementSibling.innerHTML = "";
            this.flag = false;
        }
    }
    email_blur() {//oemail 设置邮箱
        this.oemail.onblur = function () {
            this.flag = false;
            var _this = this;
            var reg = /^\w+([-\+\.\w]+)*\@\w+([-\.\w]+)*\.\w+([-\.\w]+)*$/;
            if (reg.test(this.value)) {
                tool.ajax({
                    type: 'post',
                    data: { email: _this.value },
                    async: true,
                    url: "http://10.31.161.172/MyProject/php/get.php"
                }).then((d) => {
                    if (d != 1) {
                        _this.nextElementSibling.innerHTML = "√";
                        _this.nextElementSibling.style.color = "green";
                        _this.flag = true;
                    }
                    else {
                        _this.nextElementSibling.innerHTML = "该邮箱号码已被注册";
                        _this.nextElementSibling.style.color = "red";
                        _this.flag = false;
                    }
                }).catch((e) => {
                    throw new Error(e);
                });

            } else if (this.value === '') {
                this.nextElementSibling.innerHTML = "邮箱不能为空";
                this.nextElementSibling.style.color = "red";
            } else {
                this.nextElementSibling.innerHTML = "请输入正确的邮箱";
                this.nextElementSibling.style.color = "red";
            }
        }
    }
    password() {
        this.password1_input();//验证密码强度
        this.password1_blur();//验证密码格式是否合法
        this.password2_blur();//再次输入密码
    }
    password1_input() {//验证密码强度
        this.opassword1.oninput = function () {
            var reg1 = /[0-9]/;
            var reg2 = /[a-z]/;
            var reg3 = /[A-Z]/;
            var reg4 = /[\W\_]/;

            var flag = 0
            this.nextElementSibling.innerHTML = "";

            if (reg1.test(this.value)) {
                flag++;
            }
            if (reg2.test(this.value)) {
                flag++;
            }
            if (reg3.test(this.value)) {
                flag++;
            }
            if (reg4.test(this.value)) {
                flag++;
            }
            if (flag <= 1) {
                opass[1].className = "";
                opass[2].className = "";
                opass[0].className = "low";
            } else if (flag > 1 && flag < 4) {
                opass[0].className = "";
                opass[2].className = "";
                opass[1].className = "middle";
            } else if (flag >= 4) {
                opass[1].className = "";
                opass[0].className = "";
                opass[2].className = "heigh";
            }
        }
    }
    password1_blur() {//验证密码格式是否合法
        this.opassword1.onblur = function () {
            this.flag = false;
            var reg5 = /[\u40ee-\u9fa5]/;
            if (this.value === '') {
                this.nextElementSibling.innerHTML = "密码不能为空";
                this.nextElementSibling.style.color = "red";
            } else if (reg5.test(this.value)) {
                this.nextElementSibling.innerHTML = "密码不能有中文";
            }
            else if (this.value.length < 6) {
                this.nextElementSibling.innerHTML = "密码太短";
                this.nextElementSibling.style.color = "red";
            } else if (this.value.length > 16) {
                this.nextElementSibling.innerHTML = "密码过长";
                this.nextElementSibling.style.color = "red";
            } else {
                this.nextElementSibling.innerHTML = "√";
                this.nextElementSibling.style.color = "green";
                this.flag = true;
            }
        }
    }
    password2_blur() {//再次输入密码
        let _this = this;
        this.opassword2.onblur = function () {
            this.flag = false;
            if (this.value === '') {
                this.nextElementSibling.innerHTML = "密码不能为空";
                this.nextElementSibling.style.color = "red";
            } else if (this.value.length < 6) {
                this.nextElementSibling.innerHTML = "密码太短";
                this.nextElementSibling.style.color = "red";
            } else if (this.value.length > 16) {
                this.nextElementSibling.innerHTML = "密码过长";
                this.nextElementSibling.style.color = "red";
            } else if (this.value === _this.opassword1.value) {
                this.nextElementSibling.innerHTML = "√";
                this.nextElementSibling.style.color = "green";
                this.flag = true;
            } else {
                this.nextElementSibling.innerHTML = "两次密码输入不正确";
                this.nextElementSibling.style.color = "red";
            }
        }
    }
    phone() {//手机号码
        this.ophone.onblur = function () {
            this.flag = false;
            var reg = /^1[0-9]{10,10}$/;
            if (reg.test(this.value)) {
                this.nextElementSibling.innerHTML = "√";
                this.nextElementSibling.style.color = "green";
                this.flag = true;
            } else if (this.value === '') {
                this.nextElementSibling.innerHTML = "手机号码不能为空";
                this.nextElementSibling.style.color = "red";
            } else {
                this.nextElementSibling.innerHTML = "请输入正确的手机号码";
                this.nextElementSibling.style.color = "red";
            }
        }
    }

    vcode(){//验证码
        this.vcode_init();// 验证码初始化
        this.vcode_change();//看不清?换一张
    }
    vcode_init(){// 验证码初始化
        let _this = this;
        let arrnum = []
        for (let i = 0; i <= 9; i++) {
            arrnum[i] = String(i);
        }
        for (let i = 65, j = 10; i <= 90; i++ , j++) {
            arrnum[j] = String.fromCharCode(i);
        }
        this.arrnum = arrnum;
        this.oyzm.innerHTML = arrnum[Math.floor(tool.rannum(0, 35))] + arrnum[Math.floor(tool.rannum(0, 35))] + arrnum[Math.floor(tool.rannum(0, 35))] + arrnum[Math.floor(tool.rannum(0, 35))]
        
        this.ovcode.onblur = function () {
            this.flag = false;
            var arr = [];//小写字母转大写
            for (let i = 0; i < this.value.length; i++) {
                arr.push(this.value[i].toUpperCase());
            }
            arr = arr.join('');
            if (arr === _this.oyzm.innerHTML) {
                _this.otishi.innerHTML = "√";
                _this.otishi.style.color = "green";
                this.flag = true;
            } else {
                _this.otishi.innerHTML = "输入的验证码有误";
                _this.otishi.style.color = "red";
                this.flag = false;
            }
        }
    }
    vcode_change(){//看不清?换一张
        let _this = this;
        this.ohyz.onclick = function () {
            _this.oyzm.innerHTML = _this.arrnum[Math.floor(tool.rannum(0, 35))] + _this.arrnum[Math.floor(tool.rannum(0, 35))] + _this.arrnum[Math.floor(tool.rannum(0, 35))] + _this.arrnum[Math.floor(tool.rannum(0, 35))]
            _this.ovcode.flag = false;
            _this.otishi.innerHTML = '';
        }
    }
    submit(){//提交表单
        let _this = this;
        this.osubmit.onclick = function () {
            if (_this.oemail.flag && _this.opassword1.flag && _this.opassword2.flag && _this.ophone.flag && _this.ovcode.flag) {
        
            } else {
                return false;
            }
        }
    }
}
export {
    Registery
}