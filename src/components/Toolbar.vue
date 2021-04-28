<template>
<div>
  <div class="toolbar">
    <el-button style="margin-left: 10px" @click="preview">预览</el-button>
  </div>
  <!-- 预览 -->
  <p>{{isShowPreview}}</p>
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
    preview () {
      console.log(1111)
      this.isShowPreview = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
