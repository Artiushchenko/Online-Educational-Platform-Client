<!-- <template>
	<section class="chat">
		<div class="chat-header">
			<input type="text" v-model="username" placeholder="username" />
		</div>

		<div class="chat-body">
			<div v-for="(message, index) in messages" :key="index" class="message">
				<strong>{{ message.username }}:</strong>
				{{ message.message }}
			</div>
		</div>

		<div class="chat-footer">
			<input
				type="text"
				v-model="message"
				placeholder="Write a message"
				@keyup.enter="sendMessage"
			/>
			<Button @click="sendMessage">Send</Button>
		</div>
	</section>
</template>

<script setup>
import Pusher from 'pusher-js'
import { onMounted, ref } from 'vue'
import $axios from '../../../config/axios.config'
import Button from '../../ui/button/Button.vue'

const username = ref('username')
const messages = ref([])
const message = ref('')

onMounted(() => {
	Pusher.logToConsole = true

	const pusher = new Pusher('02e4b53c5287d7a172c2', {
		cluster: 'mt1',
	})

	const channel = pusher.subscribe('chat')

	channel.bind('message', data => {
		messages.value.push(data)
	})
})

const sendMessage = async () => {
	if (!message.value.trim()) {
		return
	}

	try {
		await $axios.post('http://localhost:8080/api', {
			message: message.value,
			username: username.value,
		})

		message.value = ''
	} catch (error) {
		console.log('Error sending message:', error)
	}
}
</script>

<style src="../../../styles/screens/chat/chat.scss" scoped lang="scss" /> -->
