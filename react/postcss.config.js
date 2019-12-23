const tailwindcss = require("tailwindcss");
const atImport = require("postcss-import");

module.exports = {
  plugins: [
    atImport(),
    tailwindcss("./tailwind.config.js"),
    require("postcss-nested"),
    require("autoprefixer")
  ]
};
