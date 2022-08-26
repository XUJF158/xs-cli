const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "../dist"), // 打包后输出文件目录
      filename: `js/[name].[chunkhash:8].js`, // 打包后的js文件存放路径
    },
    resolve: {
      modules: [path.resolve("src"), "node_modules"],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
      extensions: [".ts", ".js", ".vue", ".json", "..."], // 如果用户引入模块时不带扩展名
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/, // 匹配普通 .js 文件 以及 .vue 的script标签
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.ts$/,
          use: ["ts-loader"],
        },
        {
          test: /\.(jpg|png|gif|jpeg)$/,
          type: "asset",
          generator: {
            filename: "assets/[name].[chunkhash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 超过 10kb 不转 base64
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: "asset",
          generator: {
            filename: "assets/[name].[chunkhash:8][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 超过100kb不转 base64
            },
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        title: "vue-app",
        url: "",
        // 生成模式开启压缩
        minify: {
          html5: true, // 根据HTML5规范解析输入
          collapseWhitespace: true, // 折叠空白区域
          preserveLineBreaks: false,
          minifyCSS: true, // 压缩文内css
          minifyJS: true, // 压缩文内js
          removeComments: false, // 移除注释
        },
        hash: true,
      }),
    ],
  };
};
