export function mergeDuplicateStyles(HTMLAttributes) {
  // 提取样式字符串
  const styleString = HTMLAttributes.style;
  if (!styleString) return HTMLAttributes;

  // 将样式字符串分解为独立的属性
  const stylesArray = styleString
    .split(";")
    .map((style) => style.trim())
    .filter(Boolean);

  // 初始化一个空对象以保存处理后的样式
  const mergedStyles = {};

  // 遍历样式数组
  stylesArray.forEach((style) => {
    let [property, value] = style.split(":").map((s) => s.trim());

    // 如果存在！important，移除它并在值中进行标记
    const important = value.endsWith("!important");
    if (important) {
      value = value.replace("!important", "").trim();
    }

    // 如果当前样式属性在 mergedStyles 中，进行比对
    if (mergedStyles[property]) {
      // 如果新的样式值带有！important 或者原样式值没有！important，那么更新值
      if (important || !mergedStyles[property].important) {
        mergedStyles[property].value = value;
        mergedStyles[property].important = important;
      }
    }
    // 如果当前样式属性在 mergedStyles 中不存在，添加到 mergedStyles 中
    else {
      mergedStyles[property] = { value, important };
    }
  });

  // 从合并的样式对象创建新的样式字符串
  const newStyleString = Object.entries(mergedStyles)
    .map(
      ([property, { value, important }]) =>
        `${property}: ${value}${important ? " !important" : ""}`
    )
    .join("; ");

  // 返回新的属性对象
  return {
    ...HTMLAttributes,
    style: newStyleString,
  };
}
