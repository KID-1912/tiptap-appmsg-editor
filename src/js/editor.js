import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "../extension/image.js";
import Video from "../extension/video.js";
import Iframe from "../extension/iframe.js";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "tiptap-extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import TrailingNode from "tiptap-extension-trailing-node";
import Section from "../extension/section.js";
import ImageLink from "tiptap-extension-image-link";
import Hr from "tiptap-extension-hr";
import BulletList from "tiptap-extension-bullet-list";
import OrderedList from "../extension/orderedList.js";
import LineHeight from "tiptap-extension-line-height";
import Float from "tiptap-extension-float";
import Margin from "tiptap-extension-margin";
import Resizable from "tiptap-extension-resizable";

const editor = new Editor({
  element: document.querySelector(".editor"),
  extensions: [
    TrailingNode,
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
      codeBlock: false,
    }),
    Underline,
    TextStyle,
    Color,
    FontSize,
    TextAlign.configure({ types: ["paragraph"], defaultAlignment: "justify" }),
    Highlight.configure({ multicolor: true }),
    Link.configure({ openOnClick: false, HTMLAttributes: { rel: "" } }),
    CodeBlock.configure({ HTMLAttributes: { class: "code-snippet" } }),
    Resizable.configure({ types: ["image", "video"] }),
    Image.configure({ inline: true, allowBase64: true }),
    Video.configure({ allowBase64: true }),
    Iframe,
    Section,
    ImageLink,
    Hr,
    BulletList.configure({ HTMLAttributes: { class: "list-paddingleft-1" } }),
    OrderedList,
    LineHeight,
    Float,
    Margin,
  ],
});

export default editor;
