/*
 * @Description: 国际化
 */
import useMessage from '@/hooks/common/useMessage'
// import { store } from '@/store'
import myAxios from '@/utils/http'
import axios from 'axios'
import { App, nextTick } from 'vue'
import { createI18n, I18nOptions } from 'vue-i18n'
import { IlocalesList } from './type'

const { showMessage } = useMessage()

let langList: ILangItem[] = []

// 已加载语言包列表
const loadedLangList: string[] = []

async function init() {
  // 获取语言包列表
  const res = await myAxios<IlocalesList>({
    baseURL: './',
    url: 'localeConfig.json',
    hideLoading: true
  })
  const showLangList = res.langList.filter((lang) => lang.show)
  if (showLangList.length == 0 || !showLangList) {
    showMessage({ tips: 'The language pack is missing or set incorrectly!', type: 'error' })
  }
  langList = showLangList
  // 设置语言包列表
  // store.commit('app/SET_LANGUAGE_LIST', langList)
}

// 设置语言
function setLang(lang: string) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang
  } else {
    ;(i18n.global.locale as any).value = lang
  }
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html')?.setAttribute('lang', lang)
}

// 异步加载翻译文件
async function asyncLoadLang(lang: string) {
  if (i18n.global.locale !== lang) {
    if (!loadedLangList.includes(lang)) {
      const langItem = langList.find((item: ILangItem) => item.key === lang)
      if (langItem) {
        const res = await myAxios({ baseURL: '/', url: `${langItem?.path}`, hideLoading: true })
        if (typeof res === 'string') {
          // 获取不到包
          showMessage({ tips: 'The language pack is missing or set incorrectly!', type: 'error' })
        } else {
          // 获取到包
          i18n.global.setLocaleMessage(lang, res)
          loadedLangList.push(lang)
          setLang(lang)
        }
        nextTick()
      }
      return Promise.resolve(lang)
    } else {
      return Promise.resolve(setLang(lang))
    }
  } else {
    return Promise.resolve(lang)
  }
}

let i18n: ReturnType<typeof createI18n>

const setupI18n = async (app: App) => {
  // const defaultLang = store?.state.app.lang || 'zh-cn'
  // const options: I18nOptions = {
  //   locale: defaultLang,
  //   legacy: false, // 是否使用 vue option API
  //   globalInjection: true // 全局注入 $t 函数
  // }
  // i18n = createI18n(options)
  // app.use(i18n)
  // await init()
  // await asyncLoadLang(defaultLang)
  const defaultLang = 'zh-cn'
  const options: I18nOptions = {
    locale: defaultLang,
    legacy: false, // 是否使用 vue option API
    globalInjection: true // 全局注入 $t 函数
  }
  i18n = createI18n(options)
  app.use(i18n)
  await init()
  await asyncLoadLang(defaultLang)
}

export { i18n, setupI18n, asyncLoadLang }
export interface ILangItem {
  key: string
  label: string
  path: string
}
