# tiptap-appmsg-editor

<h3 align="center">
    基于 tiptap 搭建的微信公众号编辑器示例，支持排版后复制到微信公众平台，支持开发者自己开发样式库、模板库作为内容插入；如 135Editor、壹伴等
</h3>

[在线示例](https://kid-1912.github.io/tiptap-appmsg-editor/index.html)

<br/>

[![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/02/18/20240218183840.png)](https://kid-1912.github.io/tiptap-appmsg-editor/index.html)

<br>

---

## 功能点罗列

- 文字样式（字号、颜色、高亮、加粗、行高...）

- 清除文字样式

- 内容排版（对齐、间距、缩进、浮动）

- 历史记录撤销/重做

- 图片插入

- 代码块内容

- 视频内容

- 分割线

- 有序/无序列表

- 超链接

- 图片超链接

- 微信小程序

- 表情插入

- 图文样式库开发规范

- 插入图文样式与模板

- 一键复制使用

- 字数统计

持续更新...

## 文件目录

```
tiptap-appmsg-editor\src
├─extensions // 自定义的tiptap拓展
├─js
| ├─editor.js // tiptap编辑器实例
| ├─function.js // 编辑器功能实现
| ├─sidebar.js // 侧边栏实现
| ├─svg.js // svg图标插入
| ├─toolbar.js // 工具栏实现
├─images
|   ├─svg
|   ├─sprite
|   |   └emoji_sprite.png // 表情雪碧图
|   ├─icon
|   |  ├─icon-image-link.png // 图片超链接标示图
|   |  └icon-weapp-link.png // 小程序标示图
├─main.js
├─templates // 样式组件和内容模板
├─styles
|   ├─base.css
|   ├─editor.css  // 编辑器默认样式
|   ├─index.css // 页面主样式
|   └reset.css
├─plugins
|    ├─tabs // tab实现
|    ├─modal // 弹窗实现
|    ├─dropdown // 下拉菜单实现
|    ├─clickoutside // 点击外部关闭实现
```

## 自定义编辑器

基于本示例开发自定义样式的编辑器，需要注意内容样式

由于文章内容默认样式存在，为了预览效果一致性，需要在 tiptap 编辑区与侧边栏保证以下样式存在

```css
.tiptap.ProseMirror {
  min-height: 960px;
  outline: none;
  color: rgba(0, 0, 0, 0.9);
  font-size: 17px;
  line-height: 1.6;
  text-align: justify;
}

.ProseMirror * {
  max-width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box !important;
  word-wrap: break-word !important;
}

.ProseMirror p {
  clear: both;
  min-height: 1em;
}

.ProseMirror > p {
  margin-top: 0;
  margin-bottom: 24px;
}
```

更多内容类的样式，可见公众号内容默认样式文件：`src/styles/editor.css`

### 样式组件开发

对于可用的、灵活的、自适应组件，需要你按照一定的规范开发

**核心标签**

section：组件内容容器，允许 style 所有样式值

p：文字段落，仅允许 text-align 等段落样式，若文字内容未包含于 p 标签，则解析后自动追加

span：文字样式容器，仅允许 color、font-size、font-family 等文字样式

img：图片元素，允许 style 所有样式值

**标记标签**

以下标签为 tiptap 标记样式的 node，在插入内容被解析后自动追加，无需额外关注

如插入内容

```html
<section style="color: grey; text-decoration: underline">
  <p>
    <span style="font-size: 12px">COMPANY BROCHURE</span>
  </p>
</section>
```

实际插入结果

```html
<section style="color: grey; text-decoration: underline">
  <p>
    <u>
      <span style="font-size: 12px">COMPANY BROCHURE</span>
    </u>
  </p>
</section>
```

strong：加粗 node

em：斜体 node

u：下划线 node

**更合理的组件建议**

内容块(section)之间距离：推荐 margin-top/margin-bottom 边距（段前距/段后距）

文字行距离：推荐 line-height 行高（行间距）

使用 em 单位替代 px 单位，如 line-height 值，更加灵活自适应

使用 br 实现段落内文字手动换行

**借鉴样式**

可以参考其他公众号编辑平台的样式，如 135Editor、壹伴等

壹伴公众号样式平台：https://yiban.io/style_center/0_1_0
