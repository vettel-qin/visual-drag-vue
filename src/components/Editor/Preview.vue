<template>
  <div class="bg" v-if="modelValue">
    <el-button @click="close" class="close">关闭</el-button>
    <div class="canvas-container">
      {{modelValue}}
      <div class="canvas">
        <ComponentWrapper
          v-for="(item, index) in componentData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ComponentWrapper from './ComponentWrapper'

export default {
  // model: {
  //   prop: 'show'
  // },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  components: { ComponentWrapper },

  computed: mapState([
    'componentData'
  ]),

  methods: {
    close () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .canvas-container {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;

        .canvas {
            background: #fff;
            position: relative;
            margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>
