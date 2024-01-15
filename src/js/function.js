import Clipboard from "clipboard";
import editor from "./editor.js";
import { Dropdown } from "../plugins/dropdown/index.js";
import { Modal } from "../plugins/modal/index.js";

// 图片
const $imageDropdown = document.querySelector(".header .dropdown-image");
new Dropdown({ el: $imageDropdown });
// 插入本地图片
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
// 插入链接图片
const $image_link = document.querySelector("#image_link");
$image_link.addEventListener("click", () => {
  const imageUrl = window.prompt("请输入图片链接", "");
  try {
    new URL(imageUrl);
  } catch (error) {
    console.warn(error);
    return;
  }
  editor.chain().focus().setImage({ src: imageUrl }).run();
});

// 视频
const $uploadVideoBtn = document.querySelector(".header .btn-upload-video");
const videoModal = new Modal({ el: "#video_modal" });
$uploadVideoBtn.addEventListener("click", () => {
  videoModal.show();
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
