import { AxiosRequestConfig, AxiosResponse } from 'axios'
import storage, { Keys } from '../storage'
import { LoadingUtil } from '../loadingUtil'
import { MyAxiosReqConfig } from './types'
import { handleHttpError } from './handleHttpError'
import { t } from '@/hooks/common/useI18n'

const loading = new LoadingUtil()

export default {
  // 请求拦截处理
  requestInterceptor: (
    axiosConfig: MyAxiosReqConfig,
    config: AxiosRequestConfig
  ): AxiosRequestConfig => {
    if (!axiosConfig.hideLoading) loading.show()
    const token = 'Bearer ' + storage.getItem('session', Keys.token)
    if (token && config.headers) config.headers['Authorization'] = token || ''
    return config
  },
  // 响应拦截处理
  responseInterceptor: (axiosConfig: MyAxiosReqConfig, response: AxiosResponse): AxiosResponse => {
    if (!axiosConfig.hideLoading) loading.hidden()
    return response.data
  },
  // 响应错误处理
  responseHttpError: (axiosConfig: MyAxiosReqConfig, err: any) => {
    if (!axiosConfig.hideLoading) loading.hidden()
    handleHttpError(axiosConfig, err)
  }
}
