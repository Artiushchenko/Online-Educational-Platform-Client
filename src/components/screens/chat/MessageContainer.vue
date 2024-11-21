<template>
	<div class="messages">
		<div v-for="(message, index) in props.messages" :key="index">
			<MessageItem :message="message" />
		</div>
	</div>
</template>

<script setup>
import MessageItem from './MessageItem.vue'

const props = defineProps(['messages'])
</script>

<style
	src="../../../styles/screens/chat/messageContainer.scss"
	scoped
	lang="scss"
/>
