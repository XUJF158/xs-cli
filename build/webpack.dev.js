const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const config = {
  mode: "development",
  devServer: {
    static: "../public", //从目录提供静态文件的选项 默认是 'public'
    port: 8877,
    compress: true, //开启 gzip 压缩
    open: true,
    proxy: {}, //代理跨域
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, // 匹配 sass/css/scss
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [],
};

module.exports = (env) => {
  return merge(common(env), config);
};
