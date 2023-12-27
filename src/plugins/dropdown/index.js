import "./dropdown.css";
import { createClickoutsideHandler } from "../clickoutside";

class Dropdown {
  disabled = false;
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
    if (this.disabled) return;
    this.$menu.style.display = "block";
  }

  hide() {
    this.$menu.style.display = "none";
  }

  disable() {
    this.disabled = true;
    this.$toggle.classList.add("disabled");
  }

  enable() {
    this.disabled = false;
    this.$toggle.classList.remove("disabled");
  }
}

export { Dropdown };
