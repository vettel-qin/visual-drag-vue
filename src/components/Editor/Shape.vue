<template>
  <div class="shape" @mousedown="handleMouseDownOnShape">
    <div
      class="shape-point"
      v-for="item in pointList"
      :key="item"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    >
    </div>
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

  data () {
    return {
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
      initialAngle: { // 每个点对应的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315
      }
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
    },

    getPointStyle (point) {
      console.log(point.length, 'point')
      const { width, height } = this.defaultStyle
      const hasT = /t/.test(point) // top
      const hasB = /b/.test(point) // bottom
      const hasL = /l/.test(point) // left
      const hasR = /r/.test(point) // right

      let newLeft = 0
      let newTop = 0

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width // 左上角的小圆点，坐标 left: 0, top: 0  右上角的小圆点，坐标 left: width, top: 0
        newTop = hasT ? 0 : height
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = Math.floor(height / 2)
        }
      }

      const style = {
        marginLeft: hasR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`
        // cursor: this.cursors[point]
      }

      return style
    },

    handleMouseDownOnPoint (point) {
      const downEvent = window.event
      downEvent.stopPropagation()
      downEvent.preventDefault()

      const pos = { ...this.defaultStyle }
      const height = Number(pos.height)
      const width = Number(pos.width)
      const top = Number(pos.top)
      const left = Number(pos.left)
      const startX = downEvent.clientX
      const startY = downEvent.clientY

      // 是否需要保存快照
      let needSave = false
      const move = (moveEvent) => {
        needSave = true
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const disY = currY - startY
        const disX = currX - startX
        const hasT = /t/.test(point)
        const hasB = /b/.test(point)
        const hasL = /l/.test(point)
        const hasR = /r/.test(point)
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
        pos.height = newHeight > 0 ? newHeight : 0
        pos.width = newWidth > 0 ? newWidth : 0
        pos.left = left + (hasL ? disX : 0)
        pos.top = top + (hasT ? disY : 0)
        this.$store.commit('setShapeStyle', pos)
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        needSave && this.$store.commit('recordSnapshot')
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

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
