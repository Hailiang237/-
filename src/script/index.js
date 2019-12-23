import { tool, $ } from "./tool.js";//引入模块
import { Banner, Head_nav, Lazy } from "./effect.js";//主页的js效果
import{Registery} from "./registery.js"


if ($("#index",true).length>0) {
    new Banner().init();
    new Head_nav().init();
    new Lazy().init();
}

if($("#registry",true).length>0){
    new Registery().init();
}