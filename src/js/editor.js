import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import Highlight from "@tiptap/extension-highlight";
import TrailingNode from "../extension/trailingNode.js";
import Section from "../extension/section.js";
import Style from "../extension/style.js";
import Resizable from "../extension/resizable.js";

const editor = new Editor({
  element: document.querySelector(".editor"),
  extensions: [
    TrailingNode,
    StarterKit,
    Underline,
    TextStyle,
    Color,
    FontSize,
    Highlight.configure({ multicolor: true }),
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Section,
    Style,
    Resizable,
  ],
});

export default editor;
