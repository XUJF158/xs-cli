import { t } from '@/hooks/common/useI18n'
// import html2canvas from 'html2canvas'
// import JsPDF from 'jspdf'
import { LoadingUtil } from './loadingUtil'

/**
 * @description 防抖函数
 */
export class Debounce {
  /** * @param func 须要包装的函数 * @param delay 延迟时间，单位ms * @param immediate 是否默认执行一次(第一次不延迟) */
  static use(func: any, delay = 1000, immediate = false) {
    let timer: any
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args) // 确保引用函数的指向正确，而且函数的参数也不变
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}
export class Debounced {
  /** * @param func 须要包装的函数 * @param delay 延迟时间，单位ms * @param immediate 是否默认执行一次(第一次不延迟) */
  public use = (func: () => any, delay = 1000, immediate = false) => {
    let timer: any
    return (...args: any) => {
      if (immediate) {
        func.apply(this, args) // 确保引用函数的指向正确，而且函数的参数也不变
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

/**
 * @description 节流函数
 */
export class Throttle {
  static use(fn: () => any, delay = 500) {
    let timer: NodeJS.Timeout | null
    return (...args: any) => {
      if (!timer) {
        fn.apply(this, args)
        timer = setTimeout(() => {
          if (timer) clearTimeout(timer)
          timer = null
        }, delay)
      }
    }
  }
}

/**
 * @description 深拷贝函数
 * @param {Object} obj
 * @param {WeakMap} hash 对象存在循环引用的情况
 */
export function deepClone(obj: any, hash = new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  if (hash.get(obj)) return hash.get(obj)
  const cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

/**
 * @description 下载文件
 * @param link 地址
 * @param name 文件名
 */
export function downloadExcel(link: string, name: string) {
  if (!name) {
    name = link.slice(link.lastIndexOf('/') + 1)
  }
  const elLink = document.createElement('a')
  elLink.download = name
  elLink.style.display = 'none'
  elLink.href = link
  document.body.appendChild(elLink)
  elLink.click()
  document.body.removeChild(elLink)
}

/**
 * 日期格式化函数
 * @param {Date|number} value 日期
 * @param {string} format 格式化规则
 * @return {string} 结果
 * @example
 * formatDate(1617244098351, "Y年M月D日") //2021年04月01日
 * formatDate(1617244098351, "Y年M月D日 h:m:s") //2021年04月01日 10:28:18
 * formatDate(1617244098351, 'Y-M-D h:m:s 星期d') //2021-06-03 09:57:08 星期四
 */
export function formatDate(
  value: number | string | Date = Date.now(),
  format = 'Y-M-D h:m:s'
): string {
  const formatNumber = (n: number) => `0${n}`.slice(-2) // 补0
  const date: Date = new Date(value)
  const formatList: string[] = ['Y', 'M', 'D', 'h', 'm', 's', 'd']
  const resultList: string[] = []
  resultList.push(date.getFullYear().toString())
  resultList.push(formatNumber(date.getMonth() + 1))
  resultList.push(formatNumber(date.getDate()))
  resultList.push(formatNumber(date.getHours()))
  resultList.push(formatNumber(date.getMinutes()))
  resultList.push(formatNumber(date.getSeconds()))
  resultList.push(['日', '一', '二', '三', '四', '五', '六'][date.getDay()])
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i])
  }
  return format
}

/**
 * 动画垂直滚动到页面指定位置
 * @param {HTMLElement} el 滚动的dom元素
 * @param { number } currentY 当前位置
 * @param { number } targetY 目标位置
 */
export function scrollAnimation(el: HTMLElement, currentY: number, targetY: number): void {
  const needScrollTop: number = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    el.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(el, _currentY, targetY)
    } else {
      el.scrollTo(_currentY, targetY)
    }
  }, 20)
}

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = (el?: HTMLElement): any => {
  let val = document.documentElement.scrollTop || document.body.scrollTop
  if (el) val = el.scrollTop
  if (val > 0) {
    window.requestAnimationFrame(scrollToTop(el))
    el ? el.scrollTo(0, val - val / 8) : window.scrollTo(0, val - val / 8)
  }
}

/**
 * 获取设备类型
 * @returns  'Mobile' | 'Desktop'
 */
export const getDeviceType = () => {
  const reg = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return reg.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
}

export const mix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - weight) + r2 * weight)
  let g = Math.round(g1 * (1 - weight) + g2 * weight)
  let b = Math.round(b1 * (1 - weight) + b2 * weight)
  r = Number(('0' + (r || 0).toString(16)).slice(-2))
  g = Number(('0' + (g || 0).toString(16)).slice(-2))
  b = Number(('0' + (b || 0).toString(16)).slice(-2))
  return '#' + r + g + b
}

/**
 * @description 导出PDF
 * @param {string} id 导出对象HTML id
 * @param {string} folderName 文件名称
 */
export const outputPDF = (id: string, folderName: string) => {
  // const loading = new LoadingUtil({
  //   text: t('common.loading'),
  //   background: 'rgba(0,0,0,0.5)',
  //   target: 'body'
  // })
  // return new Promise((resolve, reject) => {
  //   loading.show()
  //   const canvas = document.createElement('canvas')
  //   const context = canvas.getContext('2d')
  //   const targetHtml = document.getElementById(id)
  //   if (!targetHtml) throw new Error('target is null or undefined')
  //   const width = targetHtml?.clientWidth ?? 0
  //   let height = targetHtml?.clientHeight ?? 0
  //   const scale = 3
  //   if (width > height) height = width
  //   canvas.width = width * scale
  //   canvas.height = height * scale
  //   context?.scale(scale, scale)
  //   const options = {
  //     scale: 1,
  //     width,
  //     height,
  //     canvas
  //   }
  //   try {
  //     import(/* webpackChunkName: "html2canvas" */ 'html2canvas').then(
  //       ({ default: html2canvas }) => {
  //         html2canvas(targetHtml, options).then((canvas) => {
  //           const contentW = canvas.width / scale
  //           const contentH = canvas.height / scale
  //           // JsPDF('p', 'px', [contentW, contentH])
  //           // args_1 : l：横向  p：纵向
  //           // args_2 : 测量单位（"pt"，"mm", "cm", "m", "in" or "px"）
  //           import(/* webpackChunkName: "jspdf" */ 'jspdf').then(({ default: JsPDF }) => {
  //             const pdf = new JsPDF('p', 'px', [contentW, contentH])
  //             const pageData = canvas.toDataURL('image/jpeg', 1.0)
  //             pdf.addImage(pageData, 'JPEG', 0, 0, contentW, contentH)
  //             pdf.save(`${folderName}.pdf`)
  //             resolve(true)
  //           })
  //         })
  //       }
  //     )
  //   } catch (error) {
  //     reject(false)
  //   } finally {
  //     loading.hidden()
  //   }
  // })
}

/**
 * @description 对象数组排序
 * @param {Array} objArr  对象数组
 * @param {string} key 键名
 * @param {OptType} opt 升序降序
 */
type OptType = 'up' | 'down'
export const objListSort = (objArr: any[], key: string, opt: OptType) => {
  return objArr.sort(function (value1: any, value2: any) {
    const val_1 = value1[key]
    const val_2 = value2[key]
    return opt === 'up' ? val_1 - val_2 : val_2 - val_1
  })
}

/**
 * @description 新旧 id数组 获取新添加和删除的
 * @param newIdList 新id数组
 * @param oldIdList 旧id数组
 * @returns [新加的，移除的]
 */
export function getAddAndRemove(newIdList: string[], oldIdList: string[]) {
  const mergeIdList = Array.from(new Set([...newIdList, ...oldIdList]))
  const addList = mergeIdList.filter((id) => !oldIdList.includes(id)) || []
  const removeList = mergeIdList.filter((id) => !newIdList.includes(id)) || []
  return [addList, removeList]
}

/**
 * 计算两个时间的间隔
 */
export function timeInterval(start: Date, end: Date) {
  const timeDiff = new Date(end).getTime() - new Date(start).getTime()
  const days = Math.floor(timeDiff / (24 * 3600 * 1000)) // 计算出天数
  const level1 = timeDiff % (24 * 3600 * 1000) // 计算天数后剩余的时间
  const hours = Math.floor(level1 / (3600 * 1000)) // 计算天数后剩余的小时数
  const level2 = timeDiff % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
  const minutes = Math.floor(level2 / (60 * 1000)) // 计算剩余的分钟数
  const level3 = timeDiff % (60 * 1000) // 计算剩余分钟后剩余的毫秒数
  const seconds = Math.floor(level3 / 1000) // 计算剩余的秒数
  return {
    timeDiff,
    days,
    hours,
    minutes,
    seconds
  }
}

/**
 * 生成 base64
 */
export const generateBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imgRes: string | ArrayBuffer | null
    reader.readAsDataURL(file)
    reader.onload = () => {
      imgRes = reader.result
    }
    reader.onerror = () => {
      reject(false)
    }
    reader.onloadend = () => {
      resolve(imgRes)
    }
  })
}

/**
 * 转换字节
 * @param value byte
 */
export function byteFormat(value = 0) {
  if (!value) return '0B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  const i = Math.floor(Math.log(value) / Math.log(k))
  return (value / Math.pow(k, i)).toFixed(2) + sizes[i]
}
