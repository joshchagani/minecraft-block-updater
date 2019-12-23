const path = require("path");

module.exports = {
  // content: [
  //   path.join(__dirname, "build", "static", "css", "*.css"),
  //   path.join(__dirname, "build", "static", "index.html"),
  //   path.join(__dirname, "build", "static", "js", "*.js")
  // ],
  // css: [path.join(__dirname, "build", "static", "css")],
  content: [
    "build/static/css/*.css",
    "build/static/index.html",
    "build/static/js/*.js"
  ],
  css: ["build/static/css"],
  // extractors: content => content.match(/[\w-/:]+(?<!:)/g) || []
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[\w-/:]+(?<!:)/g) || [];
        }
      },
      extensions: ["html", "js", "jsx"]
    }
  ]
};

// "purgecss --css build/static/css/*.css --content build/static/css/*.css build/static/js/*.js build/static/index.html --out build/static/css",
