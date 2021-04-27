<template>
  <div class="attr-list">
    <el-form>
      <el-form-item v-for="(key, index) in styleKeys.filter(item => item != 'rotate')" :key="index" :label="map[key]">
        <el-color-picker v-if="key === 'borderColor'" v-model="curComponent.style[key]"></el-color-picker>
        <el-color-picker v-else-if="key === 'color'" v-model="curComponent.style[key]"></el-color-picker>
        <el-color-picker v-else-if="key === 'backgroundColor'" v-model="curComponent.style[key]"></el-color-picker>
        <el-select v-else-if="key === 'textAlign'" v-model="curComponent.style[key]">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input type="number" v-else v-model="curComponent.style[key]"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          label: '左对齐',
          value: 'left'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '右对齐',
          value: 'right'
        }
      ],

      map: {
        left: 'x 坐标',
        top: 'y 坐标',
        height: '高',
        width: '宽',
        color: '颜色',
        backgroundColor: '背景色',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '行高',
        letterSpacing: '字间距',
        textAlign: '对齐方式',
        opacity: '透明度'
      }
    }
  },

  computed: {
    styleKeys () {
      console.log(this.$store.state.curComponent, '345345345435')
      return this.$store.state.curComponent ? Object.keys(this.$store.state.curComponent.style) : []
    },
    curComponent () {
      return this.$store.state.curComponent
    }
  }
}
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
