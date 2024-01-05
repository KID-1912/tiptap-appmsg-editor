import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";
import { mergeDuplicateStyles } from "../js/utils.js";

export default Image.extend({
  name: "image",
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    HTMLAttributes = mergeDuplicateStyles(HTMLAttributes);
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});
