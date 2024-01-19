import "./modal.css";

export class Modal {
  $modal;
  $modelBackdrop;
  #visible = false;
  eventMap = {};
  constructor({ el }) {
    this.$modal = typeof el === "string" ? document.querySelector(el) : el;
    // modal-backdrop
    this.$modelBackdrop = document.createElement("div");
    this.$modelBackdrop.classList.add("modal-backdrop");
    // btn-close
    const $btnClose = this.$modal.querySelectorAll(".btn-close");
    $btnClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.trigger("close");
        this.hide();
      });
    });
    // btn-save
    const $btnSave = this.$modal.querySelector(".btn-save");
    $btnSave.addEventListener("click", () => {
      this.trigger("save");
    });
  }

  show() {
    if (this.#visible) return;
    this.#visible = true;
    this.$modal.insertAdjacentElement("afterend", this.$modelBackdrop);
    this.$modal.classList.add("show");
    requestAnimationFrame(() => {
      this.$modal.classList.add("fade");
      this.$modelBackdrop.classList.add("fade");
    });
    this.trigger("show");
  }

  hide() {
    if (!this.#visible) return;
    this.#visible = false;
    this.$modal.classList.remove("fade");
    this.$modelBackdrop.classList.remove("fade");
    this.$modal.addEventListener(
      "transitionend",
      () => {
        this.$modelBackdrop.remove();
        this.$modal.classList.remove("show");
      },
      { once: true }
    );
    this.trigger("hide");
  }

  on(event, callback) {
    if (!this.eventMap[event]) this.eventMap[event] = [];
    this.eventMap[event].push(callback);
  }

  off(event, callback) {
    if (!this.eventMap[event]) return;
    this.eventMap[event] = this.eventMap[event].filter((fn) => fn !== callback);
  }

  trigger(event) {
    this.eventMap[event]?.forEach((fn) => fn.call(this));
  }
}
