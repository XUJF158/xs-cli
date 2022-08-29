module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        useBuiltIns: "usage",
        corejs: "3.25.0", // 是 core-js 版本号
        // targets: {
        //   chrome: "58",
        //   ie: "11",
        // },
      },
    ],
    [
      "@babel/preset-typescript", // 引用Typescript插件
      {
        allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
      },
    ],
  ],
};
