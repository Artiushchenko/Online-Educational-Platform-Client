<template>
	<div class="chat-message-area">
		<input
			type="text"
			v-model="message"
			@keyup.enter="pushMessage()"
			placeholder="Write a message"
		/>
	</div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { ChatService } from '../../../services/chat.service'

const props = defineProps(['room'])
const emit = defineEmits(['messagesent'])

const message = ref('')

const pushMessage = async () => {
	if (message.value.trim() === '') {
		return
	}

	try {
		const response = await ChatService.sendMessage(props.room.id, message.value)

		if (response.status === 201) {
			message.value = ''
			emit('messagesent')
		}
	} catch (error) {
		console.error(error)
	}
}
</script>

<style
	src="../../../styles/screens/chat/inputMessage.scss"
	scoped
	lang="scss"
/>
