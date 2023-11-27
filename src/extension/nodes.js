// Section.js
import { Node } from "@tiptap/core";

export const Section = Node.create({
  name: "section",
  group: "block",
  content: "block+",
  whitespace: "normal",
  renderHTML({ HTMLAttributes }) {
    return ["section", HTMLAttributes, 0];
  },
  parseHTML() {
    return [
      {
        tag: "section",
      },
    ];
  },
});
