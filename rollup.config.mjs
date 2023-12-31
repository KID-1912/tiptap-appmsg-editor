import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import resolver from "@rollup/plugin-node-resolve";
// import globImport from "rollup-plugin-glob-import";
import url from "@rollup/plugin-url";
// import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import svgToSymbol from "rollup-plugin-svg-to-symbol";
import html, { makeHtmlAttributes } from "@rollup/plugin-html";
import clear from "rollup-plugin-clear";
import watch from "rollup-plugin-watch";
import serve from "rollup-plugin-serve";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
  },
  plugins: [
    resolver(),
    commonjs({ sourceMap: false }),
    // string({ include: ["src/templates/*.html"] }),
    url({ include: ["src/templates/*.html"], limit: 0 }),
    // globImport(),
    postcss({ plugins: [] }),
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
    watch({ dir: "public" }),
    serve("dist"),
  ],
};
