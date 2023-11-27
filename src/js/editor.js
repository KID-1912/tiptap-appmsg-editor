import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import Highlight from "@tiptap/extension-highlight";
import { Section } from "../extension/nodes.js";
import { Margin } from "../extension/extensions.js";

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
    Margin,
  ],
});

editor.commands.insertContentAt(
  0,
  `<section>
  <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" style="width: 100%;" />
  <section style="margin-top: 24px">
    <p style="margin-top: 24px">这    <strong>里</strong>
    是
    <strong>文字</strong></p>
  </section>
</section>`,
  {
    parseOptions: {
      preserveWhitespace: false,
    },
  }
);

export default editor;
