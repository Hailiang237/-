import{tool,$} from "./tool.js";
class Banner{
    constructor(){
        const $banner_num = $("banner-num");
    }
    init(){
        this.change();
    }
    change(){
        $banner_num.onclick = function(ev){
            var ev = ev||window.event;
            var ele = ev.target || ev.srcElement; 
            
        }
    }
}

new banner().init();