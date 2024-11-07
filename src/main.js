import { createApp } from 'vue'
import App from './App.vue'

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

app.component('v-icon', OhVueIcon)

app.use(VueToastificationPlugin, toastConfig)

app.mount('#app')
