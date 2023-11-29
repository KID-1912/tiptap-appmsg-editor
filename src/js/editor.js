import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import Highlight from "@tiptap/extension-highlight";
import Section from "../extension/section.js";

const editor = new Editor({
  element: document.querySelector(".editor"),
  extensions: [
    StarterKit,
    Underline,
    TextStyle,
    Color,
    FontSize,
    Highlight.configure({ multicolor: true }),
    Image.configure({
      inline: true,
    }),
    Section,
  ],
});

// const module = await import("../templates/test.html");
const module = await import("../templates/graphic.html");
const template = await fetch(module.default);
const html = await template.text();
editor.commands.insertContentAt(0, html, {
  parseOptions: {
    preserveWhitespace: false,
  },
});

export default editor;
