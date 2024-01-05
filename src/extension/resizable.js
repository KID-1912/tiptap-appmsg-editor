import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "resizable",
  addOptions() {
    return {
      types: ["image", "video"],
      handlerStyle: {
        width: "8px",
        height: "8px",
        background: "#07c160",
      },
      layerStyle: {
        border: "2px solid #07c160",
      },
    };
  },

  addStorage() {
    return {
      resizeElement: null,
      resizeNode: null,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          width: {
            default: null,
            parseHTML: (element) => element.style.width,
            renderHTML: (attributes) => {
              console.log("width", attributes);
              if (!attributes.width) return {};
              return { style: `width: ${attributes.width}` };
            },
          },
        },
      },
    ];
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
    resizeLayer.addEventListener("mousedown", (e) => {
      const resizeElement = this.storage.resizeElement;
      if (!resizeElement) return;
      if (/bottom/.test(e.target.className)) {
        let startX = e.screenX;
        const dir = e.target.classList.contains("bottom-left") ? -1 : 1;
        const mousemoveHandle = (e) => {
          e.preventDefault();
          const width = resizeElement.clientWidth;
          const distanceX = e.screenX - startX;
          const total = width + dir * distanceX;
          // resizeElement
          resizeElement.style.width = total + "px";
          const clientWidth = resizeElement.clientWidth;
          const clientHeight = resizeElement.clientHeight;
          resizeElement.style.setProperty(
            "width",
            `${clientWidth}px`,
            "important"
          ); // max width
          resizeLayer;
          const pos = getRelativePosition(resizeElement, element);
          resizeLayer.style.top = pos.top + "px";
          resizeLayer.style.left = pos.left + "px";
          resizeLayer.style.width = clientWidth + "px";
          resizeLayer.style.height = clientHeight + "px";
          startX = e.screenX;
        };
        document.addEventListener("mousemove", mousemoveHandle);
        document.addEventListener("mouseup", () => {
          // const resizeElement = this.storage.resizeElement;
          // const resizeNode = this.storage.resizeNode;
          // const clientWidth = resizeElement.clientWidth;
          // editor.commands.updateAttributes(resizeNode.type.name, {
          //   width: `${clientWidth}px`,
          // });
          document.removeEventListener("mousemove", mousemoveHandle);
        });
      }
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
      if (name === "bottom-left") item.style.cursor = "sw-resize";
      if (name === "bottom-right") item.style.cursor = "se-resize";
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
      this.storage.resizeElement = dom;
      this.storage.resizeNode = node;
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

// 计算相对位置
function getRelativePosition(element, ancestor) {
  const elementRect = element.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const relativePosition = {
    top: parseInt(elementRect.top - ancestorRect.top + ancestor.scrollTop),
    left: parseInt(elementRect.left - ancestorRect.left + ancestor.scrollLeft),
  };
  return relativePosition;
}
