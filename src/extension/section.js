import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "section",
  group: "block",
  content: "block+",

  parseHTML() {
    return [{ tag: "section" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["section", HTMLAttributes, 0];
  },
});
