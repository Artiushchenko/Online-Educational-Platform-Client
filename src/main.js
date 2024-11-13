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
	BiCameraVideo,
	BiChatDots,
	GiEntryDoor,
	GiExitDoor,
	IoHome,
	MdForumOutlined,
	RiSettings5Line,
} from 'oh-vue-icons/icons'

addIcons(
	RiSettings5Line,
	IoHome,
	GiEntryDoor,
	GiExitDoor,
	BiChatDots,
	MdForumOutlined,
	BiCameraVideo
)

const app = createApp(App)
const pinia = createPinia()

app.component('v-icon', OhVueIcon)

app.use(router)
app.use(pinia)
app.use(VueToastificationPlugin, toastConfig)

app.mount('#app')
