import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";

export default Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...this.parent?.(),
      baseStyle: {
        default: "",
        rendered: false,
        parseHTML: (element) => element.getAttribute("style"),
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const baseStyle = node.attrs.baseStyle;
    const style = HTMLAttributes.style || "";
    if (style || baseStyle) {
      HTMLAttributes.style = mergeStyles(baseStyle, HTMLAttributes.style);
    }
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

// 合并样式
function mergeStyles(...styleStrings) {
  let styleObject = {};
  for (let styleString of styleStrings) {
    let styleArray = styleString
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    for (let style of styleArray) {
      let [property, value] = style.split(":");
      styleObject[property.trim()] = value.trim();
    }
  }

  let finalStyleString = Object.entries(styleObject)
    .map(([property, value]) => `${property}: ${value}`)
    .join("; ");

  return finalStyleString;
}
