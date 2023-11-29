import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "section",
  group: "block",
  content: "block+",

  addAttributes() {
    return {
      style: {
        parseHTML: (element) => element.style.cssText,
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "section" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["section", mergeAttributes(HTMLAttributes), 0];
  },
});
