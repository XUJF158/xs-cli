const hostName = window.location.hostname
const globalConfig = {
  // 版本号
  VERSION:'1.0.7',
  // 设置网站浏览器tab栏标题
  TITLE:'AIMS',
  // API 接口
  URL_PROD_API: `http://${hostName}:8001/api`,
  // MATT Server
  MQTT_PROD: {
    url: `ws://${hostName}:1886/mqtt`,
    host: hostName,
    port: 1886
  },
  // x秒未收到数据标记为离线
  OFFLINE_TIME: 20,
  // 立即执行控制，屏蔽设备接收x秒
  SHIELD_TIME: 15,
  // 默认语言Key
  DEFAULT_LANG_KEY:'en'
}
