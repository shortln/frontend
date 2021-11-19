import { createApp } from 'vue'

import './assets/styles/css-var.scss'
import './assets/styles/element.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'

createApp(App)
  .use(ElementPlus)
  .mount('#app')
