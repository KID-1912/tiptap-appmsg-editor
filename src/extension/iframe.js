import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "iframe",
  draggable: true,
  inline: false,
  group: "block",

  addOptions() {
    return {
      HTMLAttributes: { frameborder: 0 },
    };
  },

  addAttributes() {
    return {
      src: { default: null },
      HTMLAttributes: {
        default: null,
        renderHTML: (attributes) => {
          return attributes.HTMLAttributes || {};
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
