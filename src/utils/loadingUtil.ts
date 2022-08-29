export class LoadingUtil {
  // loadingCount = 0
  // loadingInstance: LoadingInstance | undefined

  // text: string | Ref<string> | undefined
  // target?: string | HTMLElement
  // background?: MaybeRef<string> = 'rgba(0,0,0,0.5)'
  // lock?: boolean = true
  // spinner?: string | true | Ref<string | boolean>

  constructor() {
    // this.text = options.text
    // this.target = options.target
    // if (options.background) this.background = options.background
    // if (options.spinner) this.spinner = options.spinner
    // if (options.lock) this.lock = options.lock
  }

  show() {
    // if (this.loadingCount === 0) {
    //   this.loadingInstance = ElLoading.service({
    //     text: this.text,
    //     background: this.background,
    //     target: this.target,
    //     lock: this.lock,
    //     spinner: this.spinner
    //   })
    // }
    // this.loadingCount++
  }
  hidden() {
    // if (this.loadingCount <= 0) return
    // this.loadingCount--
    // if (this.loadingCount === 0) {
    //   this.loadingInstance?.close()
    // }
  }
}
