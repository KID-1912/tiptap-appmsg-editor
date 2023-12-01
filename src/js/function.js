import Clipboard from "clipboard";
import editor from "./editor.js";

// 上传图片
const $image_uploader = document.querySelector("#image_uploader");
$image_uploader.addEventListener("change", (e) => {
  const [file] = $image_uploader.files;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.error) {
      console.warn(fileReader.error);
      window.alert("图片上传失败");
      return;
    }
    const dataString = fileReader.result;
    editor.chain().focus().setImage({ src: dataString }).run();
    $image_uploader.value = "";
  };
  fileReader.readAsDataURL(file);
});

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
