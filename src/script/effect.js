import { tool, $ } from "./tool.js";//引入模块
//轮播图
class Banner {
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
// 导航栏hover效果
class Head_nav {
    constructor() {
        this.head_nav_sub = $(".head-nav-sub");//二级导航栏的盒子, 0-5
        this.head_nav_ul_li = $(".head-nav-ul li");//一级导航栏的盒子,1-6
        this.head_nav_ul = $(".head-nav-ul");
        this.flag = false;//是否已经打开了二级导航栏,true:切换li时 直接显示,
        this.index = 1;
        this.pindex = 1;
        this.timer1 = null;//moveout 显示的定时器
        this.timer2 = null;//hide 隐藏的定时器
        this.timer3 = null;//延时定时器

        //移动到li下面 二级导航动画显示, 
    }
    init() {
        let _this = this;
        for (let i = 1; i < this.head_nav_ul_li.length; i++) {
            this.head_nav_ul_li[i].onmouseenter = function () {//onmouseenter 当用户将鼠标指针移动到对象内时触发。
                _this.index = i;
                //延时执行  
                clearTimeout(this.timer3);
                clearTimeout(this.timer2);
                clearTimeout(this.timer1);

                // console.log("已经清楚定时器timer3,2,1")
                _this.timer3 = setTimeout(function () {
                    if (_this.flag === false) {
                        _this.moveout();
                    } else {
                        _this.change();
                    }
                }, 400)

            }
        }
        this.head_nav_ul.onmouseleave = function () {//onmouseleave 当用户将鼠标指针移出对象边界时触发。            
            _this.hide()
        }
        this.head_nav_ul_li[0].onmouseenter = function () {
            _this.hide();
        }
    }

    hide() {
        // console.log("hide:" + this.index,this.pindex,this.flag);
        clearTimeout(this.timer3);
        // console.log("已经清楚定时器timer3","out")
        this.flag = false;
        let _this = this;
        let speed = 5;

        this.timer3 = setTimeout(function () {
            clearInterval(_this.timer2);
            _this.timer2 = setInterval(function () {
                _this.head_nav_sub[_this.index - 1].style.height = _this.head_nav_sub[_this.index - 1].offsetHeight - speed + "px";
                speed++;
                if (_this.head_nav_sub[_this.index - 1].offsetHeight <= 10) {
                    _this.head_nav_sub[_this.index - 1].style.height = "0px";
                    _this.head_nav_sub[_this.index - 1].style.display = "none";
                    clearInterval(_this.timer2);
                    // console.log("已清除定时器timer2")


                }
            }, 8);
        }, 200)


    }
    change() {
        // console.log("change:" + this.index,this.pindex,this.flag);
        this.flag = true;//在里面
        // clearInterval(this.timer);
        // clearInterval(this.timer2);
        this.head_nav_sub[this.pindex - 1].style.display = "none";
        this.head_nav_sub[this.pindex - 1].style.height = "0px";

        this.head_nav_sub[this.index - 1].style.height = "230px";
        this.head_nav_sub[this.index - 1].style.display = "block";

        this.pindex = this.index;
    }
    moveout() {
        // console.log("moveout:" + this.index,this.pindex,this.flag);
        let _this = this;
        let speed = 5;
        this.head_nav_sub[_this.index - 1].style.display = "block";
        clearInterval(this.timer1);
        this.timer1 = setInterval(function () {
            _this.flag = true;//在
            _this.head_nav_sub[_this.index - 1].style.height = _this.head_nav_sub[_this.index - 1].offsetHeight + speed + "px";
            speed++;
            if (_this.head_nav_sub[_this.index - 1].offsetHeight >= 220) {
                _this.head_nav_sub[_this.index - 1].style.height = "230px";
                clearInterval(_this.timer1);
                // console.log("已清除定时器timer1")
                _this.pindex = _this.index;
            }
        }, 8)
    }
}
//主页渲染 render 和 Lazy loading
class Lazy {
    constructor() {
        this.render_content = $(".home-series-content");
        this.tv = $("#tv");//电视产品
        this.air = $("#air");//空调产品
        this.wash = $("#wash");//冰洗产品ul
        this.life = $("#life");//生活家电
        this.other = $("#other");//周边产品
        this.home_activity = $(".home-activity");
        this.louti_box = $(".xhome-fixl");//楼梯的盒子 下面 li 选中.clicked
        this.louti_li = $(".xhome-fixl ul li");
        this.pro_float_toTop = $(".pro-float-toTop");
        // this.louti_now= 0;//当前楼层
        this.box;
    }
    init() {
        this.lazy();
        this.scroll();
        this.louti();
        this.louti_jump();
    }
    scroll() {//滚轮事件(懒加载 + 楼梯)
        window.onscroll = (ev) => {
            var ev = ev || window.ev;
            this.lazy();
            this.louti();
        }
    }
    lazy() {//懒加载渲染数据
        let height = document.documentElement.clientHeight + document.documentElement.scrollTop;
        if (this.tv.offsetTop < height) {
            this.render(this.tv, "电视产品");
        }
        if (this.air.offsetTop - document.documentElement.clientHeight < document.documentElement.scrollTop) {
            this.render(this.air, "空调产品");
        }
        if (this.wash.offsetTop - document.documentElement.clientHeight < document.documentElement.scrollTop) {
            this.render(this.wash, "冰洗产品");
        }
        if (this.life.offsetTop - document.documentElement.clientHeight < document.documentElement.scrollTop) {
            this.render(this.life, "生活家电");
        }
        if (this.other.offsetTop - document.documentElement.clientHeight < document.documentElement.scrollTop) {
            this.render(this.other, "周边产品");
        }
    }
    render(box, ssort) {//渲染
        let _this = this;
        let num = 8;
        // let sort = this.get_idname(id);
        if (!box.isrander) {
            box.isrander = true;
            if (ssort === "周边产品") {
                num = 4;
            }

            tool.ajax({
                data: {
                    sort: ssort
                },
                url: "http://10.31.161.172/MyProject/php/get.php",
                type: "post",
                dataType: "json",
                async: true
            }).then(function (data) {
                let maindata = _this.getmain(data);
                let sortdata = _this.getsort(data);
                let str = `
                <div class="home-series xfindex">
                <div class="home-series-left">
                    <div class="home-series-title home-theme-TV">
                        <p>${data[0].sort_1}</p>
                        <a href="javascript:;" target="">查看更多 &gt;</a>
                    </div>
                    <a href="http://10.31.161.172/MyProject/dist/details.html?${maindata.sid}"
                        class="home-series-tj" target="_blank">
                        <img class="lazy" alt="" src=${maindata.url_main}>
                    </a>
                </div>
                <div class="home-series-content">
                    <div class="home-series-nav">
                        <ul>`
                for (let p of sortdata) {
                    str += `<li> ${p}</li>`;
                }
                str += `</ul>
                    </div>
                    <div class="home-goods-right" id="TV-div-number">
                    `
                for (let i = 0; i < num; i++) {
                    str += `
                    <div class="home-ele-f ">
                        <div class="home-ele-img">
                            <a href="http://10.31.161.172/MyProject/dist/details.html?${data[i].sid}"
                                target="_blank">
                                <img class="lazy" alt=""
                                    src=${data[i].url_show}>
                            </a>
                        </div>
                        <div class="home-ele-text">
                            <h1><a href="http://10.31.161.172/MyProject/dist/details.html?${data[i].sid}"
                                    target="_blank" title=${data[i].name}>${data[i].name}</a></h1>
                            <p>${data[i].s_title}</p>
                            <h2>￥${data[i].price}</h2>
                        </div>
                    </div>
                    `
                }
                console.log(ssort + "rander")
                str += `</div></div></div></div>`

                box.innerHTML = str;
            })

        }
    }

    getmain(data) {//找到main标记的数据记录
        for (let obj of data) {
            if (obj.main == "true") {
                return obj;
            }
        }
    }
    getsort(data) {//找到标签导航
        let sortarr = [];
        for (let obj of data) {
            if (sortarr.indexOf(obj.sort_2) < 0) {
                sortarr.push(obj.sort_2);
            }
        }
        // console.log(sortarr)
        return sortarr;
    }
    louti() {
        // - this.render_content[i]
        //document.documentElement.clientHeight/2
        if (document.documentElement.scrollTop < 100) {
            this.pro_float_toTop.style.display = "none";
        }
        if (document.documentElement.scrollTop >= 100) {
            this.pro_float_toTop.style.display = "block";
        }

        if (this.home_activity.offsetTop < document.documentElement.clientHeight / 2 + document.documentElement.scrollTop) {
            this.louti_box.style.display = "block";
            this.louti_change(0);
        }

        for (let i = 0; i < this.render_content.length; i++) {
            if (this.render_content[i].offsetTop < document.documentElement.clientHeight / 2 + document.documentElement.scrollTop) {
                this.louti_box.style.display = "block";
                this.louti_change(i + 1);
            }
        }
        if (this.home_activity.offsetTop - this.louti_box.offsetTop > document.documentElement.scrollTop) {
            this.louti_box.style.display = "none";
        }

    }
    louti_jump() {//点击跳转楼梯层数
        this.louti_li[0].onclick = () => {
            // document.documentElement.scrollTop = -80 + this.home_activity.offsetTop;
            this.move(-80 + this.home_activity.offsetTop)
        }
        this.louti_li[this.louti_li.length - 1].onclick = () => {
            // document.documentElement.scrollTop = -80 + this.home_activity.offsetTop;
            this.move(-100 + this.render_content[this.render_content.length - 1].offsetTop)
        }
        for (let i = 1; i < this.louti_li.length - 1; i++) {
            this.louti_li[i].onclick = () => {
                this.lazy();
                this.move(-80 + this.render_content[i - 1].offsetTop)
                // document.documentElement.scrollTop = -80 + this.render_content[i - 1].offsetTop;
            }
        }
        this.pro_float_toTop.onclick = () => {
            console.log(1)
            this.pro_float_toTop.style.display = "none";
            this.move(0);
        }
    }
    move(target) {
        document.documentElement.timer = null;
        clearInterval(document.documentElement.time);
        let speed = 1;
        let flag = true;
        document.documentElement.time = setInterval(() => {
            flag = true;
            let now = document.documentElement.scrollTop;
            speed = (target - now) / 10;//减速
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//为了不让最后的speed是小数
            if (now != target) { //如果还没运动完成
                document.documentElement.scrollTop = (now + speed);
                flag = false;
            } else {
                clearInterval(document.documentElement.time);
            }
            console.log(1)
            // if (flag) {
            //     clearInterval(document.documentElement.time);
            // }
        }, 20);
    }
    louti_change(i) {
        // console.log($(".xhome-fixl ul .clicked").className)
        for (let obj of this.louti_li) {
            obj.className = ""
        }
        this.louti_li[i].className = "clicked";
    }

}

export { Banner, Head_nav, Lazy }