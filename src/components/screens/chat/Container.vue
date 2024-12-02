<template>
	<section class="chat-container">
		<div class="chat-header">
			<ChatRoomSelection
				v-if="currentRoom.id"
				:rooms="chatRooms"
				:currentRoom="currentRoom"
				v-on:roomchanged="setRoom($event)"
			/>
		</div>
		<div class="chat-area">
			<MessageContainer :messages="messages" />
			<InputMessage :room="currentRoom" v-on:messagesent="getMessages" />
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ChatService } from '../../../services/chat.service'
import { initializeEcho } from '../../../services/echo.service'
import ChatRoomSelection from './ChatRoomSelection.vue'
import InputMessage from './InputMessage.vue'
import MessageContainer from './MessageContainer.vue'

const chatRooms = ref([])
const currentRoom = ref([])
const messages = ref([])

const setRoom = room => {
	currentRoom.value = room
}

const getRooms = async () => {
	try {
		chatRooms.value = await ChatService.getRooms()
		setRoom(chatRooms.value[0])
	} catch (error) {
		console.error(error)
	}
}

const getMessages = async () => {
	try {
		messages.value = await ChatService.getMessages(currentRoom.value.id)
	} catch (error) {
		console.error(error)
	}
}

const connect = () => {
	console.log('connect called for room:', currentRoom.value.id)

	if (currentRoom.value.id) {
		getMessages()
		window.Echo.private('chat.' + currentRoom.value.id)
			.listen('.message.new', payload => {
				console.log('Received message:', payload)
				messages.value = [...messages.value, payload.message]
			})
			.error(error => {
				console.error('Error in Echo connection:', error)
			})
	}
}

const disconnect = room => {
	window.Echo.leave('chat.' + room.id)
}

watch(currentRoom, (value, oldValue) => {
	if (oldValue.id) {
		disconnect(oldValue)
	}

	connect()
})

onMounted(() => {
	initializeEcho()
	getRooms()
})
</script>

<style src="../../../styles/screens/chat/container.scss" scoped lang="scss" />
