import undo from "../images/svg/undo.svg";
import redo from "../images/svg/redo.svg";
import clearFormat from "../images/svg/clear-format.svg";
import brush from "../images/svg/brush.svg";
import bold from "../images/svg/bold.svg";
import italic from "../images/svg/italic.svg";
import underline from "../images/svg/underline.svg";
import strike from "../images/svg/strike.svg";
import font from "../images/svg/font.svg";
import highlight from "../images/svg/highlight.svg";
import left from "../images/svg/left.svg";
import center from "../images/svg/center.svg";
import right from "../images/svg/right.svg";
import justify from "../images/svg/justify.svg";
import topRowSpacing from "../images/svg/topRowSpacing.svg";

const symbols = [
  undo,
  redo,
  clearFormat,
  brush,
  bold,
  italic,
  underline,
  strike,
  font,
  highlight,
  left,
  center,
  right,
  justify,
  topRowSpacing,
].join("");

document.body.insertAdjacentHTML(
  "beforeend",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display: none">${symbols}</svg>`
);
