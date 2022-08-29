// import { store } from '@/store'
import { isArray } from '@/utils/checkedType'
import { App, Directive, DirectiveBinding } from 'vue'

/**
 * HTML 元素权限控制指令
 * @example
 * ```
 * <div v-auth="userType.superAdmin" ></div>
 * <div v-auth="[userType.superAdmin,userType.admin]" ></div>
 * ```
 */
function isAuth(el: Element, binding: any) {
  // const roles = store.state.permission.roles
  const roles = ['1']

  const value = binding.value
  if (value === null || value === undefined) return

  if (isArray(value)) {
    if (!roles.some((role: string) => value.includes(role))) {
      el.parentNode?.removeChild(el)
    }
  } else if (!roles.includes(value)) {
    el.parentNode?.removeChild(el)
  }
}

const auth: Directive = {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    isAuth(el, binding)
  }
}

export default function vAuth(app: App) {
  app.directive('auth', auth)
}
