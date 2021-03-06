import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

require('@/assets/main.scss');
createApp(App).use(store).mount('#app')
