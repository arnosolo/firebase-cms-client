import { createApp } from 'vue'
import i18n from './locale/i18n'
import App from './App.vue'
import { router } from "./route/index"
import './index.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
