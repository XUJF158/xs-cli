const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
  mode: "production",
  devtool: false,
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, // 匹配 sass/css/scss
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    // new CleanWebpackPlugin(),// output:{clean:true} 代替
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      // generateStatsFile: true, // 是否生成stats.json文件
    }),
  ],
};

module.exports = (env, argv) => {
  return merge(common(env, argv), config);
};
