import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router'

import 'vue-toastification/dist/index.css'
import './styles/main.scss'

import VueToastificationPlugin from 'vue-toastification'
import { toastConfig } from './config/toast.config'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
	BiArrowLeft,
	BiCameraVideo,
	BiChatDots,
	GiExitDoor,
	IoHome,
	RiSettings5Line,
} from 'oh-vue-icons/icons'

import getTokenFromCookies from './utils/cookie.util'

const csrfToken = getTokenFromCookies()

if (csrfToken) {
	const meta = document.querySelector('meta[name="csrf-token"]')

	if (meta) {
		meta.setAttribute('content', csrfToken)
	}
}

addIcons(
	RiSettings5Line,
	IoHome,
	GiExitDoor,
	BiChatDots,
	BiCameraVideo,
	BiArrowLeft
)

const app = createApp(App)
const pinia = createPinia()

app.component('v-icon', OhVueIcon)

app.use(router)
app.use(pinia)
app.use(VueToastificationPlugin, toastConfig)

app.mount('#app')
