import Clipboard from "clipboard";
import editor from "./editor.js";

import { Dropdown } from "../plugins/dropdown/index.js";

import { Tabs } from "../plugins/tabs/index.js";

import { Modal } from "../plugins/modal/index.js";
import video from "../extension/video.js";

// 图片
const $imageDropdown = document.querySelector(".header .dropdown-image");

new Dropdown({
  el: $imageDropdown,
});
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

    editor
      .chain()
      .focus()
      .setImage({
        src: dataString,
      })
      .run();
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

  editor
    .chain()
    .focus()
    .setImage({
      src: imageUrl,
    })
    .run();
});

// 视频
// 视频弹窗
const $uploadVideoBtn = document.querySelector(".header .btn-upload-video");

const videoModal = new Modal({
  el: "#video_modal",
});

$uploadVideoBtn.addEventListener("click", () => {
  videoModal.show();
});
videoModal.show();

const handleResetVideoModal = () => {
  $video_uploader.value = "";
  $video_filename.innerText = "";
  $video_link.value = "";
  videoUrl = "";
};

videoModal.on("save", () => {
  const activeName = videoModalTabs.activeName;

  if (activeName === "local") {
    if (!videoUrl) {
      window.alert("请先上传视频");
      return;
    }

    editor
      .chain()
      .focus()
      .setVideo({
        src: videoUrl,
      })
      .run();
  }

  if (activeName === "link") {
    if (!videoUrl) {
      window.alert("请先输入视频链接");
      return;
    }
    if (!videoUrl.match(/^(http|https):\/\/v\.qq\.com\/x\/cover\/.+$/)) {
      window.alert("仅支持腾讯视频链接");
      return;
    }
    // 解析出video id
    let videoId =
      videoUrl.match(/j_vid=(\w+)&?/)?.[1] || videoUrl.match(/\/(\w+).html/)[1];
    editor
      .chain()
      .focus()
      .setParagraph()
      .setIframe({
        src: `http://v.qq.com/txp/iframe/player.html?vid=${videoId}`,
        HTMLAttributes: {
          class: "video_iframe",
          style: `height: 325px;border-radius: 4px;pointer-events: none;`,
        },
      })
      .run();
  }

  videoModal.hide();
  handleResetVideoModal();
});

videoModal.on("close", () => {
  videoModalTabs.tabChange("local");
  handleResetVideoModal();
});
// 视频tabs
const $videoTabs = document.querySelector("#video_modal .tabs");

const videoModalTabs = new Tabs({
  el: $videoTabs,
  activated: "local",
});
videoModalTabs.on("change", handleResetVideoModal);
// 插入本地视频
let videoUrl = "";
const $video_uploader = document.querySelector("#video_uploader");

$video_uploader.addEventListener("change", (e) => {
  const [file] = $video_uploader.files;
  const fileReader = new FileReader();

  fileReader.onload = () => {
    if (fileReader.error) {
      console.warn(fileReader.error);
      window.alert("视频上传失败");
      return;
    }

    videoUrl = fileReader.result;
    $video_filename.innerText = file.name;
  };
  fileReader.readAsDataURL(file);
});
const $video_filename = document.querySelector("#video_uploader~.filename");
// 插入视频链接
const $video_link = document.querySelector("#video_link");

$video_link.addEventListener("change", (e) => {
  videoUrl = e.target.value;
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
