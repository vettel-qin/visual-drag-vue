import { createStore } from 'vuex'
import { $ } from '@/utils/utils'
import layer from './layer'
import contextmenu from './contextmenu'

export default createStore({
  state: {
    ...layer.state,
    ...contextmenu.state,
    componentData: [], // 画布组件数据
    curComponent: null,
    curComponentIndex: null
  },
  mutations: {
    ...layer.mutations,
    ...contextmenu.mutations,

    getEditor (state) {
      state.editor = $('#editor')
    },

    setCurComponent (state, { component, index }) {
      state.curComponent = component
      state.curComponentIndex = index
    },

    setShapeStyle ({ curComponent }, { top, left, width, height, rotate }) {
      console.log(curComponent)

      if (top) curComponent.style.top = top
      if (left) curComponent.style.left = left
      if (width) curComponent.style.width = width
      if (height) curComponent.style.height = height
      if (rotate) curComponent.style.rotate = rotate
    },

    addComponent (state, { component, index }) {
      console.log(component, 'component')
      if (index !== undefined) {
        state.componentData.splice(index, 0, component)
      } else {
        state.componentData.push(component)
      }
    },

    deleteComponent (state, index) {
      if (index === undefined) {
        index = state.curComponentIndex
      }

      if (index === state.curComponentIndex) {
        state.curComponentIndex = null
        state.curComponent = null
      }

      state.componentData.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
