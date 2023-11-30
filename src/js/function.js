import Clipboard from "clipboard";
import editor from "./editor.js";

// 一键复制
const $btn_copy = document.querySelector(".btn-copy");
const clipboard = new Clipboard($btn_copy);

clipboard.on("success", function (e) {
  window.alert("复制成功");
  e.clearSelection(); // 清除默认选中复制内容
});
clipboard.on("error", function (e) {
  window.alert("浏览器不支持按钮复制，请手动ctrl+c");
});
