import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "resizable",
  addOptions() {
    return {
      types: ["image", "video"],
      handlerStyle: {
        width: "8px",
        height: "8px",
        background: "red",
      },
      layerStyle: {
        border: "2px solid red",
      },
    };
  },

  onCreate({ editor }) {
    const element = editor.options.element;
    element.style.position = "relative";

    // 初始化 resizeLayer
    const resizeLayer = document.createElement("div");
    resizeLayer.className = "resize-layer";
    resizeLayer.style.display = "none";
    resizeLayer.style.position = "absolute";
    Object.entries(this.options.layerStyle).forEach(([key, value]) => {
      resizeLayer.style[key] = value;
    });

    const handlers = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const fragment = document.createDocumentFragment();
    for (let name of handlers) {
      const item = document.createElement("div");
      item.className = `handler ${name}`;
      item.style.position = "absolute";
      Object.entries(this.options.handlerStyle).forEach(([key, value]) => {
        item.style[key] = value;
      });
      const dir = name.split("-");
      item.style[dir[0]] = parseInt(item.style.width) / -2 + "px";
      item.style[dir[1]] = parseInt(item.style.height) / -2 + "px";
      fragment.appendChild(item);
    }
    resizeLayer.appendChild(fragment);
    editor.resizeLayer = resizeLayer;
    element.appendChild(resizeLayer);
  },

  onSelectionUpdate({ editor, transaction }) {
    const element = editor.options.element;
    const node = transaction.curSelection.node;
    const resizeLayer = editor.resizeLayer;
    if (node && this.options.types.includes(node.type.name)) {
      // resizeLayer位置大小
      resizeLayer.style.display = "block";
      let dom = editor.view.domAtPos(transaction.curSelection.from).node;
      if (dom.getAttribute("src") !== node.attrs.src) {
        dom = dom.querySelector(`[src="${node.attrs.src}"]`);
      }
      const pos = getRelativePosition(dom, element);
      resizeLayer.style.top = pos.top + "px";
      resizeLayer.style.left = pos.left + "px";
      resizeLayer.style.width = dom.width + "px";
      resizeLayer.style.height = dom.height + "px";
    } else {
      resizeLayer.style.display = "none";
    }
  },
});

function getRelativePosition(element, ancestor) {
  const elementRect = element.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const relativePosition = {
    top: parseInt(elementRect.top - ancestorRect.top + ancestor.scrollTop),
    left: parseInt(elementRect.left - ancestorRect.left + ancestor.scrollLeft),
  };
  return relativePosition;
}
