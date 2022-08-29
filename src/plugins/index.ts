/*
 * @Description: 批量注入app实例
 */
import { createApp } from 'vue'
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = require.context('.', true, /\.ts$/)
  files.keys().forEach((key) => {
    if (typeof files(key).default === 'function' && key !== './index.ts') {
      files(key).default(app)
    }
  })
}
