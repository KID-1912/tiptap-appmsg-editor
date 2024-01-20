import { Node } from "@tiptap/core";

export default Node.create({
  name: "link",
  inline: true,
  group: "inline",

  addAttributes() {
    return {
      href: { default: null },
    };
  },

  parseHTML() {
    return { tag: "a[href]" };
  },
});
