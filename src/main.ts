import './styles/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

export const app = createApp(App)

async function init() {
  // 挂载
  app.mount('#app')
  app.use(router).use(store)
}
console.log(process.env.NODE_ENV)

init()
