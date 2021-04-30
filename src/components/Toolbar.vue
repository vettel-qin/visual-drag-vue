<template>
<div>
  <div class="toolbar">
    <el-button @click="undo">撤消</el-button>
    <el-button style="margin-left: 10px" @click="preview">预览</el-button>
  </div>
  <!-- 预览 -->
  <Preview :modelValue = "isShowPreview" @update:modelValue="isShowPreview = $event"></Preview>
</div>
</template>

<script>
import Preview from '@/components/Editor/Preview'

export default {
  data () {
    return {
      isShowPreview: false
    }
  },
  components: { Preview },

  methods: {
    // 撤消
    undo () {
      this.$store.commit('undo')
    },
    preview () {
      this.isShowPreview = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
