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
              if (!Object.keys(attributes.margin).length) return {};
              const {
                top: top = 0,
                bottom: bottom = 0,
                left: left = 0,
                right: right = 0,
              } = attributes.margin;
              return { style: `margin: ${top} ${left} ${bottom} ${right}` };
            },
            parseHTML: (element) => {
              const margin = {};
              const computedStyle = window.getComputedStyle(element);
              const top = computedStyle.getPropertyValue("margin-top");
              const bottom = computedStyle.getPropertyValue("margin-bottom");
              const left = computedStyle.getPropertyValue("margin-left");
              const right = computedStyle.getPropertyValue("margin-right");
              top && (margin.top = top);
              bottom && (margin.bottom = bottom);
              left && (margin.left = left);
              right && (margin.right = right);
              return margin;
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
