import store from './index'
import { deepCopy } from '@/utils/utils'

export default {
  state: {
    snapshotData: [], // 编辑器画板数据
    snapshotIndex: -1 // 画板索引
  },

  mutations: {
    // 添加新的画板数据
    recordSnapshot (state) {
      state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData)
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
      }
    },
    undo (state) {
      console.log(state, 'undooooo')
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--
        store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]))
      }
    }
  }
}
