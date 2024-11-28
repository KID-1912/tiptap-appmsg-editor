import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import resolver from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import svgToSymbol from "rollup-plugin-svg-to-symbol";
import html, { makeHtmlAttributes } from "@rollup/plugin-html";
import watch from "rollup-plugin-watch";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import clear from "rollup-plugin-clear";
import { string } from "rollup-plugin-string";

let devPlugins = [];
if (process.env.NODE_ENV === "development") {
  devPlugins = [
    watch({ dir: "public" }), // 额外监听public目录
    livereload("dist"),
    serve("dist"),
  ];
}

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    chunkFileNames: "js/[name]-[hash].js",
    entryFileNames: "js/[name]-[hash].js",
    assetFileNames: "[ext]/[name]-[hash].[ext]",
    manualChunks: {},
  },
  plugins: [
    clear({ targets: ["dist"] }),
    resolver(),
    commonjs({ sourceMap: false }),
    url({
      // include: ["src/templates/*.html", "src/images/**"],
      include: ["src/images/**"],
      exclude: ["src/images/svg/*.svg"],
      limit: 0,
    }),
    postcss({ extract: true, to: "dist/main.css" }),
    svgToSymbol(),
    html({
      template: ({ files, attributes, publicPath }) => {
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join("\n");

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join("\n");
        let htmlString = fs.readFileSync("public/index.html", "utf-8");
        htmlString = htmlString.replace(`\${links}`, links);
        htmlString = htmlString.replace(`\${scripts}`, scripts);
        return htmlString;
      },
    }),
    string({
      include: "**/*.html",
      exclude: ["public/index.html"],
    }),
    ...devPlugins,
  ],
};
