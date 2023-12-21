import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "listStyle",
  addGlobalAttributes() {
    return [
      {
        types: ["orderedList", "bulletList"],
        attributes: {
          styleType: {
            default: null,
            renderHTML: (attributes) => {
              return { style: `list-style-type: ${attributes.style}` };
            },
            parseHTML: (element) => {
              const style = element.style["list-style-type"];
              return { style };
            },
          },
        },
      },
    ];
  },
});
