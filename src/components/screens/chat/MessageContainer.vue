<template>
	<div class="messages">
		<div v-for="(message, index) in props.messages" :key="index">
			<MessageItem :message="message" />
		</div>
	</div>
</template>

<script setup>
import { watch } from 'vue'
import MessageItem from './MessageItem.vue'

const props = defineProps(['messages'])

watch(
	() => props.messages,
	newMessages => {
		console.log('Updated messages in MessageContainer:', newMessages)
	}
)
</script>

<style
	src="../../../styles/screens/chat/messageContainer.scss"
	scoped
	lang="scss"
/>
