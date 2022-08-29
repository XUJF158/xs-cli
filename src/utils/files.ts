/**
 * 限制文件上传大小
 * @param {File} file 文件对象
 * @param {number} size 限制大小 单位M
 */
export function fileSizeLimit(file: File, size = 1) {
  let flag = false
  const limitSize = size * 1024 * 1024
  if (file === null || file == undefined) return flag
  if (file.size <= limitSize) {
    flag = true
  } else {
    flag = false
    const imgSize = (file.size / (1024 * 1024)).toFixed(2)
    console.log(`图片超出限制大小(${limitSize}M)，该图片大小为(${imgSize}M)`)
  }
  return flag
}

/**
 * 校验文件上传格式
 * @param {File} file 文件对象
 * @param {string[]} types default ['jpg', 'jpeg', 'png']
 */
export function fileTypeValid(file: File, types = ['jpg', 'jpeg', 'png']) {
  let flag = false
  if (!file) return flag
  const fileType = file.type.split('/').pop() || ''
  if (types.includes(fileType.toLocaleLowerCase())) {
    flag = true
  }
  return flag
}

/**
 * 限制图片宽高
 * @param {File} file 文件对象
 * @param {number} width 宽度最小值
 * @param {number} height 高度最小值
 * @param {callBack} callback 回调（boolean）
 */
export function imgWHLimit(
  file: File,
  width: number,
  height: number,
  callback?: (flag: boolean) => void
) {
  let flag = false
  const url = window.URL.createObjectURL(file)
  const image = new Image()
  image.src = url
  image.onload = () => {
    setTimeout(() => {
      if (image.width >= width || image.height >= height) {
        flag = true
      }
      callback && callback(flag)
    })
  }
}
