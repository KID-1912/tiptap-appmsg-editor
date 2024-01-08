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
import list from "../images/svg/list.svg";
import left from "../images/svg/left.svg";
import center from "../images/svg/center.svg";
import right from "../images/svg/right.svg";
import justify from "../images/svg/justify.svg";
import rowSpacingTop from "../images/svg/rowSpacingTop.svg";
import rowSpacingBottom from "../images/svg/rowSpacingBottom.svg";
import lineHeight from "../images/svg/lineHeight.svg";
import divider from "../images/svg/divider.svg";
import floatLeft from "../images/svg/floatLeft.svg";
import floatRight from "../images/svg/floatRight.svg";
import code from "../images/svg/code.svg";
import emoji from "../images/svg/emoji.svg";

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
  list,
  left,
  center,
  right,
  justify,
  rowSpacingTop,
  rowSpacingBottom,
  lineHeight,
  divider,
  floatLeft,
  floatRight,
  code,
  emoji,
].join("");

document.body.insertAdjacentHTML(
  "beforeend",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display: none">${symbols}</svg>`
);
