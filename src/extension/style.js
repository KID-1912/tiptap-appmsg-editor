import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "style",
  addGlobalAttributes() {
    return [
      {
        types: ["image", "section"],
        attributes: {
          style: {
            default: null,
            parseHTML: (element) => element.getAttribute("style"),
            renderHTML: (attributes) => ({ style: attributes.style }),
          },
        },
      },
    ];
  },
});
