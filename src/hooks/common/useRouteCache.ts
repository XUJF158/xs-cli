/**
 * Description: 页面刷新 param传参丢失 缓存Hooks
 */

import { onUnmounted } from 'vue'
import storage from '@/utils/storage'

const useRouteCache = (cacheKey: string, cacheValue: any) => {
  if (!storage.getItem('session', cacheKey)) {
    storage.setItem('session', cacheKey, cacheValue)
  }

  const getCacheValue = () => storage.getItem('session', cacheKey)

  onUnmounted(() => storage.removeItem('session', cacheKey))

  return { getCacheValue }
}

export default useRouteCache
