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
	GiEntryDoor,
	GiExitDoor,
	IoHome,
	RiSettings5Line
} from 'oh-vue-icons/icons'

addIcons(
	RiSettings5Line,
	IoHome,
	GiEntryDoor,
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
