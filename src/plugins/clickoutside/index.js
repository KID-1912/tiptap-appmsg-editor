const nodeList = [];
let clickStart;
let seed = 0;

document.addEventListener("mousedown", (e) => (clickStart = e));

document.addEventListener("mouseup", (e) => {
  nodeList.forEach((node) => {
    if (node.contains(e.target)) return;
    if (node.contains(clickStart.target)) return;
    if (!node["@@clickoutsideContext"]) return;
    node["@@clickoutsideContext"].clickoutsideHandle.call(node);
  });
});

const createClickoutsideHandler = function ({ el, handle }) {
  nodeList.push(el);
  el["@@clickoutsideContext"] = {
    id: seed++,
    clickoutsideHandle: handle,
  };
};

const removeCilckoutsideHander = function (el) {
  for (let i = 0; i < nodeList.length; i++) {
    const id = nodeList[i]["@@clickoutsideContext"].id;
    if (id === el["@@clickoutsideContext"].id) {
      nodeList.splice(i, 1);
      break;
    }
  }
};

export { createClickoutsideHandler, removeCilckoutsideHander };
