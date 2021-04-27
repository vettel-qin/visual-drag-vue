import { swap } from '@/utils/utils'
import toast from '@/utils/toast'

export default {
  mutations: {
    // 上移图层 index，表示元素在数组中越往后
    upComponent ({ componentData, curComponentIndex }) {
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, curComponentIndex + 1)
      } else {
        toast('已经到顶了')
      }
    },
    // 下移图层 index，表示元素在数组中越往前
    downComponent ({ componentData, curComponentIndex }) {
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex, curComponentIndex - 1)
      } else {
        toast('已经到底了')
      }
    },
    // 置顶
    topComponent ({ componentData, curComponentIndex }) {
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, componentData.length - 1)
      } else {
        toast('已经到顶了')
      }
    },
    // 置底
    bottomComponent ({ componentData, curComponentIndex }) {
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex, 0)
      } else {
        toast('已经到底了')
      }
    }
  }
}
