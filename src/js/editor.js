import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
import Image from "../extension/image.js";
import Video from "../extension/video.js";
import Iframe from "../extension/iframe.js";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import TrailingNode from "../extension/trailingNode.js";
import Section from "../extension/section.js";
import ImageLink from "../extension/imageLink.js";
import Hr from "../extension/hr.js";
import BulletList from "../extension/bulletList.js";
import OrderedList from "../extension/orderedList.js";
import LineHeight from "../extension/lineHeight.js";
import Float from "../extension/float.js";
import Margin from "../extension/margin.js";
import Resizable from "../extension/resizable.js";

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
    Link.configure({ openOnClick: false }),
    CodeBlock.configure({ HTMLAttributes: { class: "code-snippet" } }),
    Resizable.configure({ types: ["image", "video"] }),
    Image.configure({ inline: true, allowBase64: true }),
    Video.configure({ allowBase64: true }),
    Iframe,
    Section,
    ImageLink,
    Hr,
    BulletList,
    OrderedList,
    LineHeight,
    Float,
    Margin,
  ],
});

export default editor;
