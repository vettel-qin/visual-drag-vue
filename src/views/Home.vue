<template>
  <div class="home">
    <Toolbar />
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList />
      </section>

      <!-- 中间画布 -->
      <section class="center">
        <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mouseup="deselectCurComponent">
          <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <AttrList v-if="curComponent" />
        <p v-else class="placeholder">请选择组件</p>
      </section>
    </main>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'
import ComponentList from '@/components/ComponentList.vue'
import componentList from '@/custom-component/component-list' // 左侧列表数据
import { deepCopy } from '@/utils/utils'
import Editor from '@/components/Editor/index'
import AttrList from '@/components/AttrList'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'Home',
  components: { ComponentList, Editor, AttrList, Toolbar },

  computed: mapState([
    'curComponent'
  ]),

  methods: {
    handleDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      // 触发 drop 事件时，使用 dataTransfer.getData() 接收传输过来的索引数据，然后根据索引找到对应的组件数据，再添加到画布，从而渲染组件。
      const component = deepCopy(componentList[e.dataTransfer.getData('index')])
      component.style.top = e.offsetY
      component.style.left = e.offsetX
      component.id = uuidv4()
      this.$store.commit('addComponent', { component })

      console.log(this.$store.state.componentData)
    },

    handleDragOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },

    deselectCurComponent (e) {
      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        this.$store.commit('hideContextMenu')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
