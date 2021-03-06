// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1
}

// 编辑器左侧组件列表
const list = [
  {
    component: 'v-button',
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
    style: {
      width: 100,
      height: 34,
      borderWidth: '',
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      backgroundColor: ''
    }
  },
  {
    component: 'Picture',
    label: '图片',
    propValue: require('@/assets/title.jpg'),
    icon: 'tupian',
    style: {
      width: 300,
      height: 200,
      borderRadius: ''
    }
  }
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...item }
}

export default list
