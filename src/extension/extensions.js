import { Extension } from "@tiptap/core";

export const Margin = Extension.create({
  name: "margin",
  addOptions() {
    return {
      defaultMargin: "0px", // 默认的 margin 值
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["heading", "paragraph", "section"],
        attributes: {
          margin: {
            default: this.options.defaultMargin,
            parseHTML: (element) =>
              element.style.margin || this.options.defaultMargin,
            renderHTML: (attributes) => {
              if (attributes.margin === this.options.defaultMargin) {
                return {};
              }
              return { style: `margin: ${attributes.margin}` };
            },
          },
          marginLeft: {
            default: this.options.defaultMargin,
            parseHTML: (element) =>
              element.style.marginLeft || this.options.defaultMargin,
            renderHTML: (attributes) => {
              if (attributes.marginLeft === this.options.defaultMargin) {
                return {};
              }
              return { style: `margin-left: ${attributes.marginLeft}` };
            },
          },
          marginRight: {
            default: this.options.defaultMargin,
            parseHTML: (element) =>
              element.style.marginRight || this.options.defaultMargin,
            renderHTML: (attributes) => {
              if (attributes.marginRight === this.options.defaultMargin) {
                return {};
              }
              return { style: `margin-right: ${attributes.marginRight}` };
            },
          },
          marginTop: {
            default: this.options.defaultMargin,
            parseHTML: (element) =>
              element.style.marginTop || this.options.defaultMargin,
            renderHTML: (attributes) => {
              if (attributes.marginTop === this.options.defaultMargin) {
                return {};
              }
              return { style: `margin-top: ${attributes.marginTop}` };
            },
          },
          marginBottom: {
            default: this.options.defaultMargin,
            parseHTML: (element) =>
              element.style.marginBottom || this.options.defaultMargin,
            renderHTML: (attributes) => {
              if (attributes.marginBottom === this.options.defaultMargin) {
                return {};
              }
              return { style: `margin-bottom: ${attributes.marginBottom}` };
            },
          },
        },
      },
    ];
  },
  // addCommands() {
  //   return {
  //     setMargin:
  //       (margin) =>
  //       ({ commands }) => {
  //         return this.options.types.every((type) =>
  //           commands.updateAttributes(type, { margin })
  //         );
  //       },
  //     setMarginLeft:
  //       (marginLeft) =>
  //       ({ commands }) => {
  //         return this.options.types.every((type) =>
  //           commands.updateAttributes(type, { marginLeft })
  //         );
  //       },
  //     setMarginRight:
  //       (marginRight) =>
  //       ({ commands }) => {
  //         return this.options.types.every((type) =>
  //           commands.updateAttributes(type, { marginRight })
  //         );
  //       },
  //     // Add more commands as needed
  //   };
  // },
});
