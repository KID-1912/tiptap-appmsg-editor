import editor from "./editor.js";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/monolith.min.css";
import { Dropdown } from "../plugins/dropdown";

const $toolbar = document.querySelector("#toolbar");

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

// 斜体
const $italicBtn = $toolbar.querySelector("button.italic");
$italicBtn.addEventListener("click", () => {
  editor.chain().focus().toggleItalic().run();
});

// 下划线
const $underlineBtn = $toolbar.querySelector("button.underline");
$underlineBtn.addEventListener("click", () => {
  editor.chain().focus().toggleUnderline().run();
});

// 中划线
const $strikeBtn = $toolbar.querySelector("button.strike");
$strikeBtn.addEventListener("click", () => {
  editor.chain().focus().toggleStrike().run();
});

// 字号
const $dropdownSize = $toolbar.querySelector(".dropdown-size");
const defaultFontSize = "17px"; // 默认字号
editor.options.element.style.fontSize = defaultFontSize;
$dropdownSize.querySelector(".dropdown-toggle .size").textContent =
  defaultFontSize;
new Dropdown({ el: $dropdownSize });
$dropdownSize.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  const size = e.target.dataset.size;
  if (!size) return;
  editor.chain().focus().setFontSize(`${size}px`).run();
  $dropdownSize.querySelector(
    ".dropdown-toggle .size"
  ).textContent = `${size}px`;
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

// 按钮激活状态回显
const btnStateMap = new Map([
  ["bold", $boldBtn],
  ["italic", $italicBtn],
  ["underline", $underlineBtn],
  ["strike", $strikeBtn],
  ["highlight", $highlightPicker],
  ["color", $colorPicker],
  ["fontSize", $dropdownSize],
]);
const checkActiveState = () => {
  for (let [state, btn] of btnStateMap) {
    // 颜色选择按钮
    if (btn.classList.contains("picker")) {
      const $colorlump = btn.querySelector(".colorlump");
      let colorValue;
      if (state === "color") {
        colorValue = editor.getAttributes("textStyle").color;
      } else {
        const attribute = editor.getAttributes(state);
        colorValue = attribute.color;
      }
      if (colorValue) {
        btn.picker.setColor(colorValue, true);
        $colorlump.style.backgroundColor = colorValue;
      } else {
        btn.picker.setColor(null, true);
        $colorlump.style.backgroundColor = "transparent";
      }
      continue;
    }
    // 字号选择按钮
    if (btn.classList.contains("dropdown")) {
      let fontSizeValue = editor.getAttributes("textStyle").fontSize;
      fontSizeValue = fontSizeValue || defaultFontSize;
      btn.querySelector(".dropdown-toggle .size").textContent = fontSizeValue;
      continue;
    }
    // 普通按钮
    if (editor.isActive(state)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
};
editor.on("focus", checkActiveState);
editor.on("selectionUpdate", checkActiveState);
