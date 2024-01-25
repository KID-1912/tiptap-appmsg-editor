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
  editor.chain().focus().setImage({ src: imageUrl }).run();
});

// 视频
// 视频弹窗
const $uploadVideoBtn = document.querySelector(".header .module-item.video");
const videoModal = new Modal({ el: "#video_modal" });
$uploadVideoBtn.addEventListener("click", () => {
  videoModal.show();
});
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
    editor.chain().focus().setVideo({ src: videoUrl }).run();
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

// 超链接
// 超链接弹窗
const $insertLinkBtn = document.querySelector(".header .module-item.link");
const linkModal = new Modal({ el: "#link_modal" });
$insertLinkBtn.addEventListener("click", () => {
  linkModal.show();
});
const handleResetLinkModal = () => {
  linkTitle = "";
  $linkTitle.value = "";
  linkPicture = "";
  $linkPictureUploader.value = "";
  linkUrl = "";
  $linkUrl.value = "";
};
// 插入超链接tabs
const $linkTabs = document.querySelector("#link_modal .tabs");
const linkModalTabs = new Tabs({
  el: $linkTabs,
  activated: "text",
});
linkModal.on("save", () => {
  const activeName = linkModalTabs.activeName;
  if (!linkUrl) {
    window.alert("文章链接不可为空");
    return;
  }
  if (!linkUrl.match(/^(http|https):\/\/mp\.weixin\.qq\.com\/s\/.+$/)) {
    window.alert("仅支持公众号文章链接");
    return;
  }
  if (activeName === "text") {
    if (!linkTitle) {
      window.alert("链接标题不可为空");
      return;
    }
    let { state } = editor;
    let linkMark = state.schema.text(linkTitle, [
      state.schema.marks.link.create({
        href: linkUrl,
        HTMLAttributes: { _href: linkUrl },
      }),
    ]);
    const tr = state.tr.insert(state.selection.from, linkMark);
    editor.view.dispatch(tr);
  }
  if (activeName === "picture") {
    if (!linkPicture) {
      window.alert("请先选择链接图片");
      return;
    }
    editor
      .chain()
      .focus()
      .setImageLink({
        href: linkUrl,
        src: linkPicture,
        HTMLAttributes: {
          class: "h5_image_link",
          target: "_blank",
          linktype: "image",
          tab: "innerlink",
        },
      })
      .enter()
      .run();
  }
  linkModal.hide();
  handleResetLinkModal();
  console.log(editor.getHTML());
});
linkModal.on("close", () => {
  linkModalTabs.tabChange("text");
  handleResetLinkModal();
});
// 链接标题
let linkTitle = "";
const $linkTitle = document.querySelector("#link_modal .link-title");
$linkTitle.addEventListener("change", (e) => {
  linkTitle = e.target.value;
});
// 链接图片
let linkPicture = "";
const $linkPictureUploader = document.querySelector("#link_picture_uploader");
$linkPictureUploader.addEventListener("change", (e) => {
  const [file] = $linkPictureUploader.files;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.error) {
      console.warn(fileReader.error);
      window.alert("图片上传失败");
      return;
    }
    linkPicture = fileReader.result;
  };
  fileReader.readAsDataURL(file);
});
// 链接地址
let linkUrl = "";
const $linkUrl = document.querySelector("#link_modal .link-url");
$linkUrl.addEventListener("change", (e) => {
  linkUrl = e.target.value;
});

// 小程序
// 小程序弹窗
const $insertWeappBtn = document.querySelector(".header .module-item.weapp");
const weappModal = new Modal({ el: "#weapp_modal" });
$insertWeappBtn.addEventListener("click", () => {
  weappModal.show();
});
const handleResetWeappModal = () => {
  weappTitle = "";
  $weappTitle.value = "";
  weappPicture = "";
  $weappPictureUploader.value = "";
};
// 插入小程序tabs
const $weappTabs = document.querySelector("#weapp_modal .tabs");
const weappModalTabs = new Tabs({
  el: $weappTabs,
  activated: "text",
});
weappModal.on("save", () => {
  const activeName = weappModalTabs.activeName;
  if (!weappName) {
    window.alert("小程序名称不可为空");
    return;
  }
  if (!weappAppID) {
    window.alert("小程序AppID不可为空");
    return;
  }
  if (!weappPath) {
    window.alert("小程序页面路径不可为空");
    return;
  }
  if (activeName === "text") {
    if (!weappTitle) {
      window.alert("文字标题不可为空");
      return;
    }
    let { state } = editor;
    let weappMark = state.schema.text(weappTitle, [
      state.schema.marks.link.create({
        href: "",
        HTMLAttributes: {
          class: "weapp_text_link",
          "data-miniprogram-nickname": weappName,
          "data-miniprogram-appid": weappAppID,
          "data-miniprogram-path": weappPath,
          "data-miniprogram-type": "text",
          "data-miniprogram-servicetype": "",
          target: "",
        },
      }),
    ]);
    const tr = state.tr.insert(state.selection.from, weappMark);
    editor.view.dispatch(tr);
  }
  if (activeName === "picture") {
    if (!weappPicture) {
      window.alert("请先选择小程序图片");
      return;
    }
    editor
      .chain()
      .focus()
      .setImageLink({
        href: "",
        src: weappPicture,
        HTMLAttributes: {
          class: "weapp_image_link",
          "data-miniprogram-nickname": weappName,
          "data-miniprogram-appid": weappAppID,
          "data-miniprogram-path": weappPath,
          "data-miniprogram-type": "image",
          "data-miniprogram-servicetype": "",
          target: "",
        },
      })
      .enter()
      .run();
  }
  weappModal.hide();
  handleResetWeappModal();
  console.log(editor.getHTML());
});
weappModal.on("close", () => {
  weappModalTabs.tabChange("text");
  handleResetWeappModal();
});

// 小程序标题
let weappTitle = "";
const $weappTitle = document.querySelector("#weapp_modal .weapp-title");
$weappTitle.addEventListener("change", (e) => {
  weappTitle = e.target.value;
});
// 小程序图片
let weappPicture = "";
const $weappPictureUploader = document.querySelector("#weapp_picture_uploader");
$weappPictureUploader.addEventListener("change", (e) => {
  const [file] = $weappPictureUploader.files;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.error) {
      console.warn(fileReader.error);
      window.alert("图片上传失败");
      return;
    }
    weappPicture = fileReader.result;
  };
  fileReader.readAsDataURL(file);
});
// 小程序名称
let weappName = "";
const $weappName = document.querySelector("#weapp_modal .weapp-name");
$weappName.addEventListener("change", (e) => {
  weappName = e.target.value;
});
// 小程序AppID
let weappAppID = "";
const $weappAppID = document.querySelector("#weapp_modal .weapp-appid");
$weappAppID.addEventListener("change", (e) => {
  weappAppID = e.target.value;
});
// 小程序页面路径
let weappPath = "";
const $weappPath = document.querySelector("#weapp_modal .weapp-path");
$weappPath.addEventListener("change", (e) => {
  weappPath = e.target.value;
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
  console.warn(e);
});
