// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface GlobalConfig {
  VERSION: string
  TITLE: string
  URL_PROD_API: string
  MQTT_PROD: {
    url: string
    host: string
    port: number
  }
  // x秒未收到数据标记为离线
  OFFLINE_TIME: number
  // 立即执行控制，屏蔽设备接收x秒
  SHIELD_TIME: number
  // 默认语言Key
  DEFAULT_LANG_KEY: 'en'
}
declare const globalConfig: GlobalConfig
