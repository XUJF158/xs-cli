module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 3, // 单位转换后保留的精度
      propList: ['*'],
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      // selectorBlackList 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      // example ['body'],=>忽略 .body-xxx
      selectorBlackList: ['.ignore'],
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px
      replace: true, // 是否直接更换属性值，而不添加备用属性
      exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      include: undefined, // 那将只有匹配到的文件才会被转换
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
      landscapeUnit: 'vh', // 横屏时使用的单位
      landscapeWidth: 667 // 横屏时使用的视口宽度
    }
  }
}
