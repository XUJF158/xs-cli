/**
 * @description 获取开发\生产环境下Mqtt、Http URL
 */

// 开发环境配置
export const configServer = Object.assign(globalConfig, {
  URL_DEV_API: 'http://192.168.123.79:8001/api',
  MQTT_DEV: {
    url: 'ws://192.168.123.79:1886/mqtt',
    host: '192.168.123.79',
    port: 1886
  }
})

const useEnvUrl = () => {
  // 当前环境
  const isDEV = process.env.NODE_ENV === 'development'

  let mqttUrl = ''
  let mqttPort
  let mqttHost = ''
  let httpUrl = ''
  try {
    const { MQTT_DEV, MQTT_PROD } = configServer
    const { URL_DEV_API, URL_PROD_API } = configServer
    mqttUrl = isDEV ? MQTT_DEV.url : MQTT_PROD.url
    mqttPort = isDEV ? MQTT_DEV.port : MQTT_PROD.port
    mqttHost = isDEV ? MQTT_DEV.host : MQTT_PROD.host
    httpUrl = isDEV ? URL_DEV_API : URL_PROD_API
  } catch (error) {
    throw new Error('not found MQTT_DEV、MQTT_PROD')
  }

  return { mqttUrl, mqttPort, mqttHost, httpUrl, isDEV }
}

export default useEnvUrl
