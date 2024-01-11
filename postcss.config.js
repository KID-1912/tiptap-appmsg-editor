const postcssUrl = require("postcss-url");
const fs = require("fs");
const url = require("url");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  plugins: [
    postcssUrl({
      assetsPath: "images", // 图片放置目录
      maxSize: 10, // 小于10kb的图片转为base64
      useHash: true, // 文件名添加哈希值
      url: (asset, dir, { assetsPath, maxSize, useHash }) => {
        const { pathname, hash, search } = asset;
        // 源文件路径
        const isAbsolute = pathname.startsWith("@");
        const sourcePath = isAbsolute
          ? path.join(__dirname, pathname.replace("@", ""))
          : path.join(dir.from, pathname);
        const fileData = fs.readFileSync(sourcePath);
        // 输出文件路径
        let assetName = path.basename(pathname);
        if (useHash) {
          const hash = crypto
            .createHash("sha256")
            .update(fileData)
            .digest("hex")
            .slice(0, 8);
          const ext = path.extname(assetName);
          const name = path.basename(assetName, ext);
          assetName = assetName.replace(
            `${name}${ext}`,
            `${name}.${hash}${ext}`
          );
        }
        const targetPath = path.join(dir.to, assetsPath, assetName);
        // maxSize
        const stats = fs.statSync(sourcePath);
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        if (maxSize && fileSizeInKilobytes < maxSize) {
          const base64 = `data:${asset.mimeType};base64,${fileData.toString(
            "base64"
          )}`;
          return base64;
        }
        // copy文件
        const dirToCheck = path.dirname(targetPath);
        if (!fs.existsSync(dirToCheck)) {
          fs.mkdirSync(dirToCheck, { recursive: true });
        }
        fs.copyFileSync(sourcePath, targetPath);
        // 转换 url
        let transformUrl = path.relative(dir.to, targetPath);
        if (hash) transformUrl += hash;
        if (search) transformUrl += search;
        transformUrl = transformUrl.replace(/\\/g, "/");
        return transformUrl;
      },
    }),
  ],
};
