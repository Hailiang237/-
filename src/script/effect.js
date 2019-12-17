import { tool, $ } from "./tool.js";//引入模块
class Banner {//轮播图
    constructor() {
        this.banner_num = $(".banner-num li");//点击的是子元素li .active
        this.banner_img = $(".banner-box img");//轮播图片img  .select
        this.pindex = 0;//当前激活的 下标
        this.nindex = 0;//要切换的下标
        this.timer = null;//自动轮播定时器
    }
    init() {
        this.banner_num_click();
        this.auto_change();
    }
    banner_num_click() {
        let _this = this;
        for (let i = 0; i < this.banner_num.length; i++) {
            this.banner_num[i].onclick = function (ev) {
                _this.banner_change(i);
            }
        }
        this.banner_num.onclick = function (ev) {
            var ev = ev || window.event;
            let ele = ev.target || ev.srcElement; //获取当前点击的元素对象。
            if (ele.tagName === "LI") {
                $(".banner-num .active").className = "";
                ele.className = "active";
            }
        }
    }
    auto_change() {//自动切换轮播图
        let _this = this;
        this.timer = setInterval(function () {
            _this.banner_change(_this.pindex + 1);
        }, 4000)
    }
    banner_change(index) {//切换轮播图
        if (index >= this.banner_img.length) {
            index = 0;
        }
        this.nindex = index;
        this.banner_num[this.pindex].className = "";
        this.banner_num[this.nindex].className = "active";
        this.banner_img[this.pindex].className = "";
        this.banner_img[this.nindex].className = "select";
        this.pindex = this.nindex;
    }
}
class Head_nav {
    constructor() {
        this.head_nav_sub = $(".head-nav-sub");//二级导航栏的盒子, 0-5
        this.head_nav_ul_li = $(".head-nav-ul li");//一级导航栏的盒子,1-6
        this.head_nav_ul = $(".head-nav-ul");
        this.flag = false;//是否已经打开了二级导航栏,true:切换li时 直接显示,
        this.index = 0;

        //移动到li下面 二级导航动画显示, 
    }
    init() {
        this.set();
    }
    set() {
        let _this = this;
        for (let i = 1; i < this.head_nav_ul_li.length; i++) {
            this.head_nav_ul_li[i].onmouseover = function () {
                _this.index = i;
                if (_this.flag ===false) {
                    console.log("move:"+i)
                    
                    _this.moveout();
                } else {
                    
                    _this.change();
                }
            }
        }
        this.head_nav_ul.onclick = function(){
            console.log(_this.head_nav_ul)
            _this.hide()
        }
    }

    hide(){
        console.log("hide:"+this.index);
        this.flag = false;
        let _this = this;
        let speed = 5;
        let timer2 = setInterval(function () {
            _this.head_nav_sub[_this.index - 1].style.height = _this.head_nav_sub[_this.index - 1].offsetHeight - speed + "px";
            speed++;
            if (_this.head_nav_sub[_this.index - 1].offsetHeight < 0) {
                _this.head_nav_sub[_this.index - 1].style.height = "0px";
                clearInterval(timer2);    
                _this.head_nav_sub[_this.index - 1].style.display = "none";
            }
        }, 20);
    }
    change() {
        console.log("change:"+this.index);
        this.flag=true;//在里面
        for (let j = 0; j < this.head_nav_sub.length; j++) {
            this.head_nav_sub[j].style.display = "none";
            this.head_nav_sub[j].style.height = "0px";
        }
        this.head_nav_sub[this.index - 1].style.height = "230px";
        this.head_nav_sub[this.index - 1].style.display = "block";
       
    }
    moveout() {
        console.log("moveout:"+this.index);
        let _this = this;
        let speed = 5;
        this.head_nav_sub[_this.index - 1].style.display = "block";
        let timer = setInterval(function () {
            _this.flag = true;//在
            _this.head_nav_sub[_this.index - 1].style.height = _this.head_nav_sub[_this.index - 1].offsetHeight + speed + "px";
            speed++;
            if (_this.head_nav_sub[_this.index - 1].offsetHeight >= 230) {
                _this.head_nav_sub[_this.index - 1].style.height = "230px";
                clearInterval(timer);
                
            }
        }, 20)
    }
}


export { Banner, Head_nav }