import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "margin",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          margin: {
            default: {},
            renderHTML: (attributes) => {
              const {
                top: top = 0,
                bottom: bottom = 0,
                left: left = 0,
                right: right = 0,
              } = attributes.margin;
              return { style: `margin: ${top} ${left} ${bottom} ${right}` };
            },
            parseHTML: (element) => {
              const computedStyle = window.getComputedStyle(element);
              return {
                marginTop: computedStyle.getPropertyValue("margin-top"),
                marginBottom: computedStyle.getPropertyValue("margin-bottom"),
                marginLeft: computedStyle.getPropertyValue("margin-left"),
                marginRight: computedStyle.getPropertyValue("margin-right"),
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setMargin:
        (options) =>
        ({ commands, editor }) => {
          const margin = editor.getAttributes("paragraph").margin;
          return commands.updateAttributes("paragraph", {
            margin: Object.assign({}, margin, options),
          });
        },
    };
  },
});
