const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  app: resolve("."),
  dist: resolve("dist"),
  src: resolve("src"),
  index: resolve("src/index.js"),
  packageJson: resolve("package.json"),
  nodeModules: resolve("node_modules")
};
