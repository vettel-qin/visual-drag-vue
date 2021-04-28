<template>
  <component
    class="component"
    :is="config.component"
    :style="getStyle(config.style)"
    :propValue="config.propValue"
    :element="config"
  />
</template>

<script>
import { getStyle } from '@/utils/style'

export default {
  props: {
    config: {
      type: Object,
      require: true
    }
  },

  methods: {
    getStyle
  }
}
</script>
<style lang="scss" scoped>

</style>
