import { i18n } from '@/locales'
// import { store } from '@/store'
import { MyAxiosReqConfig } from './types'
import useMessage from '@/hooks/common/useMessage'
import axios from 'axios'

export const handleHttpError = function (axiosConfig: MyAxiosReqConfig, error: any): any {
  const { showMessage } = useMessage()

  // let msg = ''
  // const res = error.response
  // if (res) {
  //   const msgMap: Record<number, string> = {
  //     302: i18n?.global.t('http.error.302'),
  //     400: i18n?.global.t('http.error.400'),
  //     401: i18n?.global.t('http.error.401'),
  //     403: i18n?.global.t('http.error.403'),
  //     404: i18n?.global.t('http.error.404', [res.config.baseURL, res.config.url]),
  //     408: i18n?.global.t('http.error.408'),
  //     500: i18n?.global.t('http.error.500'),
  //     501: i18n?.global.t('http.error.501'),
  //     502: i18n?.global.t('http.error.502'),
  //     503: i18n?.global.t('http.error.503'),
  //     504: i18n?.global.t('http.error.504'),
  //     505: i18n?.global.t('http.error.505')
  //   }
  //   // 处理被取消的请求
  //   if (axios.isCancel(error)) console.error(i18n?.global.t('http.error.repeat') + error.data)

  //   if (msgMap[res.status]) msg = msgMap[res.status] || i18n?.global.t('http.error.unknow')

  //   switch (res.status) {
  //     case 401:
  //       store.commit('user/DEL_TOKEN')
  //       store.commit('permission/RESET_PERMISSION')
  //       setTimeout(() => {
  //         // 宏任务包装 避免 message 还没触发就刷新页面
  //         location.reload()
  //       }, 0)
  //       break
  //   }
  // } else {
  //   const errMsg = String(error?.message).toLowerCase()
  //   if (errMsg.includes('timeout')) msg = i18n?.global.t('http.error.overTime')
  //   if (errMsg.includes('network')) {
  //     // navigator.onLine 判断设备是否可以上网，正常联网(在线)返回true,不正常联网(离线)返回false
  //     msg = window.navigator.onLine
  //       ? i18n?.global.t('http.error.serverError')
  //       : i18n?.global.t('http.error.netDisConnect')
  //   }
  // }

  // if (!axiosConfig.hideErrMessage) {
  //   showMessage({ tips: msg, type: 'error' })
  // }
}
