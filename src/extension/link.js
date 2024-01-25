import Link from "@tiptap/extension-link";

export default Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        default: null,
        renderHTML: (attributes) => {
          return attributes.HTMLAttributes || {};
        },
      },
    };
  },
});
