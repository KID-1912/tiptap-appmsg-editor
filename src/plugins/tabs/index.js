import "./tabs.css";

class Tabs {
  activeName;
  constructor({ el, activated }) {
    this.activeName = activated || undefined;
    this.$tabs_nav = el.querySelector(".tabs-nav");
    this.$tabs_content = el.querySelector(".tabs-content");
    this.tabChange(this.activeName);

    this.$tabs_nav.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-item")) {
        const name = e.target.dataset.name || null;
        this.tabChange(name, e.target);
      }
    });
  }

  tabChange(name) {
    if (!name) return;
    this.activeName = name;
    const $tab_items = this.$tabs_nav.querySelectorAll(".tab-item");
    const $tab_panel = this.$tabs_content.querySelectorAll(".tab-pane");
    // 清除选中
    $tab_items.forEach(function (item) {
      item.classList.remove("active");
    });
    $tab_panel.forEach(function (item) {
      item.classList.remove("active");
    });
    // 选中
    this.$tabs_nav
      .querySelector(`.tab-item[data-name="${name}"]`)
      .classList.add("active");
    this.$tabs_content
      .querySelector(`.tab-pane[data-id="${name}"]`)
      .classList.add("active");
  }
}

export { Tabs };
