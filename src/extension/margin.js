import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "margin",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          margin: {
            default: null,
            renderHTML: (attributes) => {
              const obj = {};
              const { marginTop, marginBottom, marginLeft, marginRight } =
                attributes;
              if (marginTop) obj.marginTop = marginTop;
              if (marginBottom) obj.marginBottom = marginBottom;
              if (marginLeft) obj.marginLeft = marginLeft;
              if (marginRight) obj.marginRight = marginRight;
              return obj;
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
        ({ commands }) => {
          return commands.setNode("paragraph");
        },
    };
  },
});
