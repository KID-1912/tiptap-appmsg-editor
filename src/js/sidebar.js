import { Tabs } from "../plugins/tabs";
import editor from "./editor";

// Tabs
const $sidebar_tabs = document.querySelector(".sidebar .tabs");
const tabs = new Tabs({ el: $sidebar_tabs, activated: "graphic" });

// 图文列表
const graphicList = [
  import("../templates/graphic.html"),
  import("../templates/test.html"),
];

// 渲染图文列表
const $graphic_list = document.querySelector(".sidebar .graphic-list");
for (let graphic of graphicList) {
  try {
    const module = await graphic;
    const template = await fetch(module.default);
    const html = await template.text();
    const $item = document.createElement("div");
    $item.classList.add("graphic-item");
    $item.addEventListener("click", handleInsert);
    $item.innerHTML = html;
    $graphic_list.appendChild($item);
  } catch (error) {
    console.warn(error);
  }
}

// 插入图文/模板
function handleInsert() {
  editor
    .chain()
    .focus()
    .createParagraphNear()
    .insertContent(this.innerHTML, {
      parseOptions: {
        preserveWhitespace: false,
      },
    })
    .run();
}

// $graphic_list.innerHTML = graphicList.reduce(
//   (html, curr) => {
//     // `<div class="graphic-item">${curr.default}</div>`
//     import('../templates/' + curr + '.html').then((res) => {
//       console.log(res.default);
//       html += `<div class="graphic-item">${res.default}</div>`;
//   },
//   ""
// );

// const graphic = await fetch(graphicTemplate.default);
// const graphicHTML = await graphic.text();
// editor.commands.insertContentAt(0, graphicHTML, {
//   parseOptions: {
//     preserveWhitespace: false,
//   },
// });

// const testTemplate = await import("../templates/test.html");
// const test = await fetch(testTemplate.default);
// const testHTML = await test.text();
// editor.commands.insertContentAt(0, testHTML, {
//   parseOptions: {
//     preserveWhitespace: false,
//   },
// });
