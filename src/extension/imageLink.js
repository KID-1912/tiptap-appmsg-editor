import { Node, mergeAttributes, getAttributes } from "@tiptap/core";

const ImageLink = Node.create({
  name: "imageLink",
  inline: true,
  group: "inline",
  draggable: false,
  content: "image*",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      href: { default: null },
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
    return [
      {
        tag: "a",
        getAttrs: (node) => {
          const imgNode = node.querySelector("img");
          const href = node.getAttribute("href");
          const src = imgNode ? imgNode.getAttribute("src") : null;
          return { href, src };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    let { src, ...attrs } = HTMLAttributes;
    return ["a", mergeAttributes(this.options.HTMLAttributes, attrs), 0];
  },

  addCommands() {
    return {
      setImageLink:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
            content: [{ type: "image", attrs: { src: options.src } }],
          });
        },
    };
  },
});

export default ImageLink;
