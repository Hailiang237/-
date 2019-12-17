import{tool,$} from "./tool.js";//引入模块

class Banner{
    constructor(){
        this.banner_num= $(".banner-num");//下面的点 的父元素盒子, 点击的是子元素li
    }
    init(){
        this.banner_num_click();
    }
    banner_num_click(){
        this.banner_num.onclick=function(){
            
        }
    }
}


export{Banner}