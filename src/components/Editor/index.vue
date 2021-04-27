<template>
  <div class="editor" id="editor" @contextmenu="handleContextMenu">
    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :defaultStyle="item.style"
      :index="index"
      :key="item.id"
      :element="item"
      :style="getShapeStyle(item.style)"
    >
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Shape from './Shape'
import ContextMenu from './ContextMenu'
import { getStyle } from '@/utils/style'

export default {
  components: { Shape, ContextMenu },

  methods: {
    handleMouseDown (e) {
      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      e.stopPropagation()

      // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
      // const rectInfo = this.editor.getBoundingClientRect()
      const pos = { ...this.defaultStyle }
      const startY = e.clientY
      const startX = e.clientX

      // const startTop = rectInfo.x
      // const startLeft = rectInfo.y

      // const move = (moveEvent) => {
      //   const currX = moveEvent.clientX
      //   const currY = moveEvent.clientY

      // }

      console.log(startY, 'startY')
      console.log(startX, 'startX')

      console.log(pos, 'rectInfoX')
    },

    getShapeStyle (style) {
      console.log(style, '111')
      const result = {};
      ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr !== 'rotate') {
          result[attr] = `${style[attr]}px`
        } else {
          result.transform = `rotate(${style[attr]}deg)`
        }
      })

      return result
    },

    getComponentStyle (style) {
      return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
    },

    // 右键菜单
    handleContextMenu (e) {
      e.stopPropagation()
      e.preventDefault()

      // 计算菜单相对于编辑器的位移
      let target = e.target
      let top = e.offsetY
      let left = e.offsetX

      while (!target.className.includes('editor')) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
      }

      this.$store.commit('showContextMenu', { top, left })
    }
  },

  computed: mapState([
    'componentData',
    'editor'
  ]),

  mounted () {
    // 获取编辑器元素
    this.$store.commit('getEditor')
  }
}
</script>

<style scoped>
.editor {
  position: relative;
  background: #fff;
}
</style>
