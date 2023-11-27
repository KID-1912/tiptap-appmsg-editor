import undo from "../images/svg/undo.svg";
import redo from "../images/svg/redo.svg";
import clearFormat from "../images/svg/clear-format.svg";
import brush from "../images/svg/brush.svg";
import bold from "../images/svg/bold.svg";
import italic from "../images/svg/italic.svg";
import underline from "../images/svg/underline.svg";
import strike from "../images/svg/strike.svg";
import highlight from "../images/svg/highlight.svg";
import font from "../images/svg/font.svg";

const symbols = [
  undo,
  redo,
  clearFormat,
  brush,
  bold,
  italic,
  underline,
  strike,
  highlight,
  font,
].join("");

document.body.insertAdjacentHTML(
  "beforeend",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display: none">${symbols}</svg>`
);
