/**
 * @description: 全局存储类(AES加密)
 */
import Cookies from 'js-cookie'

type StorageType = 'local' | 'session' | 'cookie'

interface IStorage {
  setItem<T>(type: StorageType, key: string, value: T, cookieOption?: Record<string, unknown>): void
  getItem(type: StorageType, key: string): string | null
  removeItem(type: StorageType, key: string): void
}

class VStorage implements IStorage {
  private static instance: VStorage
  static _() {
    if (!this.instance) {
      this.instance = new VStorage()
    }
    return this.instance
  }
  setItem<T>(
    type: StorageType,
    key: string,
    value: T,
    cookieOption?: Record<string, unknown>
  ): void {
    const valueJson = JSON.stringify(value)
    if (type === 'local') {
      localStorage.setItem(key, valueJson)
    } else if (type === 'session') {
      sessionStorage.setItem(key, valueJson)
    } else {
      Cookies.set(key, valueJson, cookieOption)
    }
  }
  getItem(type: StorageType, key: string): string | null {
    let res: any
    if (type === 'local') {
      res = localStorage.getItem(key)
    } else if (type === 'session') {
      res = sessionStorage.getItem(key)
    } else {
      res = Cookies.get(key)
    }
    return JSON.parse(res || '""')
  }
  removeItem(type: StorageType, key: string): void {
    if (type === 'local') {
      localStorage.removeItem(key)
    } else if (type === 'session') {
      sessionStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  }
}

export default VStorage._()
export { Keys } from '@/constant/key'
