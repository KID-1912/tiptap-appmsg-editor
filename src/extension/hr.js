import { Node } from "@tiptap/core";

export default Node.create({
  name: "hr",
  group: "block",
  addOptions() {
    return {
      style:
        "border-style: solid;border-width: 1px 0 0;border-color: rgba(0,0,0,0.1);transform-origin: 0 0;transform: scale(1, 0.5);",
    };
  },
  addAttributes() {
    return {
      style: {
        default: this.options.style,
      },
    };
  },
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", HTMLAttributes, 0];
  },
});
