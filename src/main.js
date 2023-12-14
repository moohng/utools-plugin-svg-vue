import { createApp } from 'vue'
import { Toast } from '@moohng/tui';
import './style.css'
import App from './App.vue'

if (typeof utools === 'undefined') {
  window.utools = {
    showNotification: (text, options) => Toast({ text, ...options }),
  }
}

createApp(App).mount('#app')
