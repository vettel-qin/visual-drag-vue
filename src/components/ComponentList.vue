<template>
  <div class="component-list" @dragstart="handleDragStart">
    <!-- 每一个组件都设置了 draggable 属性 -->
    <div v-for="(item, index) in componentList" :key="index" class="list" draggable="true" :data-index="index">
      <div class="iconfont" :class="`el-icon-${item.icon}`"></div>
      <div>{{item.label}}</div>
    </div>
  </div>
</template>

<script>
import componentList from '@/custom-component/component-list'

export default {
  data () {
    return {
      componentList
    }
  },

  methods: {
    handleDragStart (e) {
      // 在触发 dragstart 事件时，使用 dataTransfer.setData() 传输数据
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;

  .list {
    width: 45%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 18px;
    }
  }
}
</style>
