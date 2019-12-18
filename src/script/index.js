import { tool, $ } from "./tool.js";//引入模块
import { Banner, Head_nav, Lazy } from "./effect.js";//主页的js效果

if (document.body.id === "index_html") {
    new Banner().init();
    new Head_nav().init();
    new Lazy().init();
}
