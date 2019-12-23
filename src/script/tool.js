class Tool {
    constructor() {
        //  ajax obj的参数,
        //  obj = {
        //  type:"get"||"post" ,//默认值get
        //  url:"" ,//接口地址,必填
        //  async:true || flase //默认值true 异步
        //  dataType:"json"//得到的数据是否 json 转数组
        //  data:{}//传给后端数据
        // }
    }
    ajax(obj) {// ajax 方法
        let promise = new Promise((resolve, reject) => {
            var ajax = new XMLHttpRequest();
            //1.默认get,此参数可以省略。
            obj.type = obj.type || 'get';
            //2.接口地址不能为空
            if (!obj.url) {
                throw new Error('接口地址不能为空');
            }
            //3.数据存在(对象转字符串，字符串直接使用)
            if (obj.data) {
                if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
                    obj.data = this.objToString(obj.data);
                } else {
                    obj.data = obj.data;
                }
                //4.数组存在，同时get请求，将数据拼接到地址栏的后面

            }
            if (obj.data && obj.type === 'get') {
                obj.url += '?' + obj.data;
            }
            //6.是否异步,如果同步无需onreadystatechange进E行监听
            if (obj.async === "false" || obj.async === false) {
                obj.async = false;
            } else {
                obj.async = true;
            }
            ajax.open(obj.type, obj.url, obj.async);
            //5.数据存在和post,通过send和请求头传输数据
            if (obj.data && obj.type == "post") {
                ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                ajax.send(obj.data);
            } else {
                ajax.send();
            }
            //7.同步异步获取数据(利用回调函数将数据传输出来)
            if (obj.async) {
                ajax.onreadystatechange = function () {
                    if (ajax.readyState === 4) {
                        if (ajax.status === 200) {
                            let objdata = null;
                            if (obj.dataType === 'json') {//数据JOSN格式 转数组/对象
                                objdata = JSON.parse(ajax.responseText);
                            } else {
                                objdata = ajax.responseText;
                            }
                            resolve(objdata);
                        } else {
                            reject('接口地址有误');
                        }
                    }
                }
            } else {
                if (ajax.status === 200) {
                    let objdata = null;
                    if (obj.dataType == 'json') {//数据JSON格式 转数组/对象
                        objdata = JSON.parse(ajax.responseText);
                    } else {
                        objdata = ajax.responseText;
                    }
                    resolve(objdata);
                } else {
                    oreject('接口地址有误');
                }
            }
        });
        return promise;
    }

    objToString(obj) {//对象转字符串
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            let objarr = [];
            for (let i in obj) {
                objarr.push(i + '=' + obj[i]);
            }
            return objarr.join('&')
        }
    }
    // cookie 的增读删
    addcookie(key, value, days) {//修改cookie
        let d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
    }
    getcookie(key) {//得到cookie的值
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    }
    delcookie(key) {//删产出cookie
        document.cookie = `${key}='';-1`;
    }

    bufferMove(obj, json, fn) {//obj:运动的对象         jsnn:要改变的css属性和属性值       fn:回调函数
        let _this = this;
        let flag = true;
        clearInterval(obj.timer);//防止定时器的叠加
        let speed = 0;
        obj.timer = setInterval(function () {
            console.log(speed)
            flag = true;//假设运动都结束了
            for (let attr in json) {//遍历变量
                let target = json[attr];
                if (attr === 'opacity') {//透明度属性
                    let value = _this.getStyle(obj, attr) * 100;
                } else {//其他属性
                    let value = parseInt(_this.getStyle(obj, attr));//当前的css属性值
                }
                speed = (target - value) / 10;//减速
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//为了不让最后的speed是小数
                if (value != target) { //如果还没运动完成
                    if (attr === 'opacity') {//透明度属性
                        obj.style.opacity = (value + speed) / 100;
                        obj.style.filter = 'alpha(opacity=' + (value + speed) / 100 + ');';
                    } else {//其他px单位属性
                        obj.style[attr] = (value + speed) + 'px';
                    }
                    flag = false;
                }
            }
            if (flag) {//取消定时器
                clearInterval(obj.timer);
                fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
            }
        }, 1000 / 60)
    }
    getStyle(obj, attr) { //obj:当前元素对象  attr:获取css属性名称  值有单位
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    rannum(min, max) {
        return Math.random() * (max - min) + min;
    }
}
var tool = new Tool();

function $(select,flag) {//取元素
    flag = flag||false;

    let obj = document.querySelectorAll(select);
    if(flag){
        return obj;
    }else if (obj.length === 1) {
        return obj[0];
    } else {
        return obj;
    }

}
export {
    tool, $
}