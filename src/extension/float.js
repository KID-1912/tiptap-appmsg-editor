import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "float",
  addOptions() {
    return {
      types: ["image"],
      directions: ["left", "right", "default"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          float: {
            default: "default",
            renderHTML: (attributes) => {
              if (attributes.float === "default") return {};
              return { style: `float: ${attributes.float}` };
            },
          },
        },
      },
    ];
  },
});
