import "./dropdown.css";
import { createClickoutsideHandler } from "../clickoutside";

class Dropdown {
  constructor({ el }) {
    this.$toggle = el.querySelector(".dropdown-toggle");
    this.$menu = el.querySelector(".dropdown-menu");
    this.$toggle.addEventListener("click", this.show.bind(this));
    createClickoutsideHandler({
      el: this.$toggle,
      handle: this.hide.bind(this),
    });
  }

  show() {
    this.$menu.style.display = "block";
  }

  hide() {
    this.$menu.style.display = "none";
  }
}

export { Dropdown };
