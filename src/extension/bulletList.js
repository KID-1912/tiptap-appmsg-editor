import { mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";

export default BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: "disc",
        parseHTML: (element) => {
          const listStyleType = element.style["list-style-type"];
          return { listStyleType: listStyleType || "disc" };
        },
        renderHTML: (attributes) => {
          return { style: `list-style-type: ${attributes.listStyleType}` };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "ol",
      mergeAttributes(HTMLAttributes, { class: "list-paddingleft-1" }),
      0,
    ];
  },
});
