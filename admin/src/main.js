import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3" //粒子库
import '@/util/axios.config.js'

createApp(App)
    .use(Particles)
    .use(ElementPlus)
    .use(store).use(router).mount('#app')