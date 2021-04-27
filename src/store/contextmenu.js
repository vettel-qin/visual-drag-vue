export default {
  state: { // 右击菜单数据
    menuTop: 0,
    menuLeft: 0,
    menuShow: false
  },
  mutations: {
    showContextMenu (state, { top, left }) {
      state.menuShow = true
      state.menuTop = top
      state.menuLeft = left
    },

    hideContextMenu (state) {
      state.menuShow = false
    }
  }
}
