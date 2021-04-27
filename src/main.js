import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VButton from '@/custom-component/VButton.vue'
import Picture from '@/custom-component/Picture.vue'

const app = createApp(App)
app.use(store).use(router)
app.use(ElementPlus)
app.component('VButton', VButton)
app.component('Picture', Picture)
app.mount('#app')
