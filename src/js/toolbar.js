import editor from "./editor.js";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/monolith.min.css";
import { Dropdown } from "../plugins/dropdown";
import throttle from "lodash-es/throttle";

const $toolbar = document.querySelector("#toolbar");

// toolbar状态维护
const toolbarListeners = [];
const updateToolbarState = (arg) => {
  toolbarListeners.forEach((fn) => fn(arg));
};
editor.on("transaction", throttle(updateToolbarState, 240, { leading: false }));

// 历史记录
const $undoBtn = $toolbar.querySelector(".undo");
const $redoBtn = $toolbar.querySelector(".redo");
$undoBtn.addEventListener("click", () => editor.commands.undo());
$redoBtn.addEventListener("click", () => editor.commands.redo());

// 清除样式
const $clearBtn = $toolbar.querySelector(".clear");
$clearBtn.addEventListener("click", () => editor.commands.unsetAllMarks());

// 格式刷
const $painterBtn = $toolbar.querySelector(".painter");
$painterBtn.addEventListener("click", () => {});

// 加粗
const $boldBtn = $toolbar.querySelector("button.bold");
$boldBtn.addEventListener("click", () => {
  editor.chain().focus().toggleBold().run();
});
toolbarListeners.push(({ editor }) => {
  if (editor.isActive("bold")) {
    $boldBtn.classList.add("active");
  } else {
    $boldBtn.classList.remove("active");
  }
});

// 斜体
const $italicBtn = $toolbar.querySelector("button.italic");
$italicBtn.addEventListener("click", () => {
  editor.chain().focus().toggleItalic().run();
});
toolbarListeners.push(({ editor }) => {
  if (editor.isActive("italic")) {
    $italicBtn.classList.add("active");
  } else {
    $italicBtn.classList.remove("active");
  }
});

// 下划线
const $underlineBtn = $toolbar.querySelector("button.underline");
$underlineBtn.addEventListener("click", () => {
  editor.chain().focus().toggleUnderline().run();
});
toolbarListeners.push(({ editor }) => {
  if (editor.isActive("underline")) {
    $underlineBtn.classList.add("active");
  } else {
    $underlineBtn.classList.remove("active");
  }
});

// 中划线
const $strikeBtn = $toolbar.querySelector("button.strike");
$strikeBtn.addEventListener("click", () => {
  editor.chain().focus().toggleStrike().run();
});
toolbarListeners.push(({ editor }) => {
  if (editor.isActive("strike")) {
    $strikeBtn.classList.add("active");
  } else {
    $strikeBtn.classList.remove("active");
  }
});

// 字号
const $dropdownSize = $toolbar.querySelector(".dropdown-size");
new Dropdown({ el: $dropdownSize });
$dropdownSize.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  const size = e.target.dataset.size;
  if (!size) return;
  editor.chain().focus().setFontSize(size).run();
  $dropdownSize.querySelector(".dropdown-toggle .size").textContent = size;
});
toolbarListeners.push(({ editor, transaction }) => {
  let fontSizeValue = editor.getAttributes("textStyle").fontSize;
  if (!fontSizeValue) {
    const pos = transaction.curSelection.from;
    let node = editor.view.domAtPos(pos).node;
    while (node.nodeType !== 1) {
      node = node.parentNode;
    }
    fontSizeValue = window.getComputedStyle(node).fontSize;
  }
  $dropdownSize.querySelector(".dropdown-toggle .size").textContent =
    fontSizeValue;
});

// 颜色列表
const colorList = [
  "#ffffff",
  "#ffacaa",
  "#fffb00",
  "#73fa79",
  "#78acfe",
  "#d7aba9",
  "#ffda51",
  "#00d5ff",
  "#888888",
  "#7a4442",
  "#ff4c00",
  "#ffa900",
  "#3da742",
  "#000000",
];

// 文字颜色
const $colorPicker = $toolbar.querySelector(".color-picker");
const $colorlump = $colorPicker.querySelector(".colorlump");
$colorPicker.picker = Pickr.create({
  el: $colorPicker,
  theme: "monolith",
  useAsButton: true,
  swatches: colorList,
  components: {
    preview: true,
    hue: true,
    interaction: {
      input: true,
      save: true,
    },
  },
  i18n: { "btn:save": "确认" },
});
$colorPicker.picker.on("save", (color, instance) => {
  instance.hide();
  const hexValue = color.toHEXA().toString();
  editor.chain().focus().setColor(hexValue).run();
  $colorlump.style.backgroundColor = hexValue;
});
toolbarListeners.push(({ editor, transaction }) => {
  if (transaction.updated === 0) return;
  const colorValue = editor.getAttributes("textStyle").color;
  if (colorValue) {
    $colorPicker.picker.setColor(colorValue, true);
    $colorlump.style.backgroundColor = colorValue;
  } else {
    $colorPicker.picker.setColor(null, true);
    $colorlump.style.backgroundColor = "transparent";
  }
});

// 高亮颜色
const $highlightPicker = $toolbar.querySelector(".highlight-picker");
const $highlightColorlump = $highlightPicker.querySelector(".colorlump");
$highlightPicker.picker = Pickr.create({
  el: $highlightPicker,
  theme: "monolith",
  useAsButton: true,
  swatches: colorList,
  components: {
    preview: true,
    hue: true,
    interaction: {
      input: true,
      save: true,
    },
  },
  i18n: { "btn:save": "确认" },
});
$highlightPicker.picker.on("save", (color, instance) => {
  instance.hide();
  const hexValue = color.toHEXA().toString();
  editor.chain().focus().toggleHighlight({ color: hexValue }).run();
  $highlightColorlump.style.backgroundColor = hexValue;
});
toolbarListeners.push(({ editor, transaction }) => {
  if (transaction.updated === 0) return;
  const colorValue = editor.getAttributes("highlight").color;
  if (colorValue) {
    $highlightPicker.picker.setColor(colorValue, true);
    $highlightColorlump.style.backgroundColor = colorValue;
  } else {
    $highlightPicker.picker.setColor(null, true);
    $highlightColorlump.style.backgroundColor = "transparent";
  }
});

// 对齐
const $dropdownAlign = $toolbar.querySelector(".dropdown-align");
new Dropdown({ el: $dropdownAlign });
$dropdownAlign
  .querySelector(".dropdown-menu")
  .addEventListener("click", (e) => {
    const menuItem = e.target.closest(".menu-item");
    if (!menuItem) return;
    const align = menuItem.dataset.align;
    editor.chain().focus().setTextAlign(align).run();
    $dropdownAlign
      .querySelector(".dropdown-toggle svg use")
      .setAttribute("href", `#${align}`);
  });
toolbarListeners.push(({ editor }) => {
  const align = editor.isActive({ textAlign: "left" })
    ? "left"
    : editor.isActive({ textAlign: "center" })
    ? "center"
    : editor.isActive({ textAlign: "right" })
    ? "right"
    : "justify";
  $dropdownAlign
    .querySelector(".dropdown-toggle svg use")
    .setAttribute("href", `#${align}`);
});

// 段前距
const $dropdownTopRowSpacing = $toolbar.querySelector(
  ".dropdown-topRowSpacing"
);
new Dropdown({ el: $dropdownTopRowSpacing });
$dropdownTopRowSpacing
  .querySelector(".dropdown-menu")
  .addEventListener("click", (e) => {
    const value = e.target.dataset.value;
    if (!value) return;
    editor.chain().focus().setMargin({ top: value }).run();
  });
toolbarListeners.push(({ editor }) => {
  const marginTop = editor.getAttributes("paragraph")?.margin?.top || "0px";
  const menuItems = $dropdownTopRowSpacing.querySelectorAll(".menu-item");
  for (let item of menuItems) {
    if (item.dataset.value === marginTop) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
});

// 段后距
const $dropdownBottomRowSpacing = $toolbar.querySelector(
  ".dropdown-bottomRowSpacing"
);
new Dropdown({ el: $dropdownBottomRowSpacing });
$dropdownBottomRowSpacing
  .querySelector(".dropdown-menu")
  .addEventListener("click", (e) => {
    const value = e.target.dataset.value;
    if (!value) return;
    editor.chain().focus().setMargin({ bottom: value }).run();
  });

toolbarListeners.push(({ editor, transaction }) => {
  let marginBottom = editor.getAttributes("paragraph")?.margin?.bottom;
  if (!marginBottom) {
    const pos = transaction.curSelection.from;
    let node = editor.view.domAtPos(pos).node;
    while (true) {
      if (node.nodeType === 1 && node.tagName === "P") {
        marginBottom = window.getComputedStyle(node).marginBottom;
        break;
      } else if (node === editor.view.dom) {
        marginBottom = "24px"; // 默认段后距
        break;
      }
      node = node.parentNode;
    }
  }
  const menuItems = $dropdownBottomRowSpacing.querySelectorAll(".menu-item");
  for (let item of menuItems) {
    if (item.dataset.value === marginBottom) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
});

// 行高
const $dropdownLineHeight = $toolbar.querySelector(".dropdown-lineHeight");
new Dropdown({ el: $dropdownLineHeight });
$dropdownLineHeight
  .querySelector(".dropdown-menu")
  .addEventListener("click", (e) => {
    const value = e.target.dataset.value;
    if (!value) return;
    editor.chain().focus().setLineHeight(value).run();
  });
toolbarListeners.push(({ editor, transaction }) => {
  let lineHeight = editor.getAttributes("paragraph")?.lineHeight;
  if (!lineHeight) {
    const pos = transaction.curSelection.from;
    let node = editor.view.domAtPos(pos).node;
    while (true) {
      if (node.tagName === "SECTION" && node.style.lineHeight) {
        lineHeight = node.style.lineHeight;
        break;
      } else if (node === editor.view.dom) {
        lineHeight = "1.6em"; // 默认行高
        break;
      }
      node = node.parentNode;
    }
  }
  const menuItems = $dropdownLineHeight.querySelectorAll(".menu-item");
  for (let item of menuItems) {
    if (item.dataset.value === lineHeight) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
});

// 分割线
const $dividerBtn = $toolbar.querySelector("button.divider");
$dividerBtn.addEventListener("click", () => {
  editor
    .chain()
    .focus()
    .insertContent([{ type: "hr" }])
    .run();
});

// 列表
const $dropdownList = $toolbar.querySelector(".dropdown-list");
new Dropdown({ el: $dropdownList });
const typeMap = new Map([
  ["bulletList", "toggleBulletList"],
  ["orderedList", "toggleOrderedList"],
]);
$dropdownList.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  const listType = e.target.dataset.listType;
  const toggleCommandName = typeMap.get(listType);
  const listStyleType = e.target.dataset.listStyleType;
  if (!toggleCommandName) return;
  let chain = editor.chain().focus();
  // 开启列表类型
  if (!editor.isActive(listType)) {
    chain[toggleCommandName]().updateAttributes(listType, { listStyleType });
  }
  // 切换列表类型
  else if (editor.getAttributes(listType).listStyleType !== listStyleType) {
    chain.updateAttributes(listType, { listStyleType });
  }
  // 关闭列表类型
  else {
    chain[toggleCommandName]();
  }
  chain.run();
});

// 浮动
const $dropdownFloat = $toolbar.querySelector(".dropdown-float");
const dropdownFloat = new Dropdown({ el: $dropdownFloat });
$dropdownFloat
  .querySelector(".dropdown-menu")
  .addEventListener("click", (e) => {
    const menuItem = e.target.closest(".menu-item");
    if (!menuItem) return;
    const float = menuItem.dataset.float || null;
    editor.chain().focus().updateAttributes("image", { float }).run();
  });
const $dropdownFloatToggle = $dropdownFloat.querySelector(".dropdown-toggle");
toolbarListeners.push(({ editor }) => {
  let float = editor.getAttributes("image").float;
  // 无可浮动的 Node
  if (!float) {
    dropdownFloat.disable();
    $dropdownFloatToggle
      .querySelector("svg use")
      .setAttribute("href", "#floatLeft");
    return;
  }
  dropdownFloat.enable();
  $dropdownFloatToggle
    .querySelector("svg use")
    .setAttribute("href", `#${float === "right" ? "floatRight" : "floatLeft"}`);
  const menuItems = $dropdownFloat.querySelectorAll(".menu-item");
  for (let item of menuItems) {
    if (item.dataset.float === float) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
});

// 代码块
const $codeBtn = $toolbar.querySelector(".edit-btn.code");
$codeBtn.addEventListener("click", () => {
  if (editor.isActive("codeBlock")) {
    editor.chain().focus().toggleCodeBlock().run();
  } else {
    editor.chain().focus().insertContent({ type: "codeBlock" }).run();
  }
});
toolbarListeners.push(({ editor }) => {
  if (editor.isActive("codeBlock")) {
    $codeBtn.classList.add("active");
  } else {
    $codeBtn.classList.remove("active");
  }
});

// emoji表情
const $emojiBtn = $toolbar.querySelector(".edit-btn.dropdown-emoji");
new Dropdown({ el: $emojiBtn });

const $emojiList = $emojiBtn.querySelector(".emoji-list");
let emojiHTML = "";
for (let i = 0; i < 105; i++) {
  emojiHTML += `<div class="emoji-item" data-index="${i}">
    <div class="icon-emoji" style="background-position-y: ${-100 * i}%"></div>
  </div>`;
}
$emojiList.innerHTML = emojiHTML;

$emojiList.addEventListener("click", (e) => {
  const emoji = e.target.closest(".emoji-item");
  if (!emoji) return;
  const index = emoji.dataset.index;
  const emojiHTML = `
    <img
      src="https://res.wx.qq.com/t/wx_fed/we-emoji/res/v1.3.10/assets/Expression/Expression_${
        +index + 1
      }@2x.png"
      style="width: 20px;background-size: cover;"
    >`;
  editor
    .chain()
    .focus()
    .insertContent(emojiHTML, {
      parseOptions: {
        preserveWhitespace: false,
      },
    })
    .run();
});
