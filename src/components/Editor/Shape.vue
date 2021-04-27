<template>
  <div class="shape" @mousedown="handleMouseDownOnShape">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {

    element: {
      require: true,
      type: Object
    },
    defaultStyle: {
      require: true,
      type: Object
    },
    index: {
      require: true,
      type: [Number, String]
    }
  },

  methods: {
    handleMouseDownOnShape (e) {
      // this.$store.commit('setClickComponentStatus', true)
      // if (this.element.component != 'v-text' && this.element.component != 'rect-shape') {
      //   e.preventDefault()
      // }

      e.stopPropagation()
      // 选中组件
      this.$store.commit('setCurComponent', { component: this.element, index: this.index })
      // if (this.element.isLock) return

      // this.cursors = this.getCursor() // 根据旋转角度获取光标位置

      const pos = { ...this.defaultStyle }
      const startY = e.clientY
      const startX = e.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.top)
      const startLeft = Number(pos.left)

      // 如果元素没有移动，则不保存快照
      // let hasMove = false
      const move = (moveEvent) => {
        // hasMove = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        pos.top = curY - startY + startTop
        pos.left = curX - startX + startLeft

        // 修改当前组件样式
        this.$store.commit('setShapeStyle', pos)
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        // this.$nextTick(() => {
        //   // 触发元素移动事件，用于显示标线、吸附功能
        //   // 后面两个参数代表鼠标移动方向
        //   // curY - startY > 0 true 表示向下移动 false 表示向上移动
        //   // curX - startX > 0 true 表示向右移动 false 表示向左移动
        //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
        // })
      }

      const up = () => {
        // hasMove && this.$store.commit('recordSnapshot')
        // // 触发元素停止移动事件，用于隐藏标线
        // eventBus.$emit('unmove')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  }
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
</style>
