import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './assets/css/base.css'

const app = createApp(App)

app.use(DatePicker)

app.use(createPinia())
app.use(router)

app.mount('#app')
