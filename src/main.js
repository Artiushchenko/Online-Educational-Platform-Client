import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router'

import 'vue-toastification/dist/index.css'
import './styles/main.scss'

import VueToastificationPlugin from 'vue-toastification'
import { toastConfig } from './config/toast.config'

import getTokenFromCookies from './utils/cookie.util'

const csrfToken = getTokenFromCookies()

if (csrfToken) {
	const meta = document.querySelector('meta[name="csrf-token"]')

	if (meta) {
		meta.setAttribute('content', csrfToken)
	}
}

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueToastificationPlugin, toastConfig)

app.mount('#app')
