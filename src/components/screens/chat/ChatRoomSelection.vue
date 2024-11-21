<template>
	<select
		v-model="selected"
		@change="emit('roomchanged', selected)"
		class="chat-select"
	>
		<option v-for="(room, index) in props.rooms" :key="index" :value="room">
			{{ room.name }}
		</option>
	</select>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['rooms', 'currentRoom'])
const emit = defineEmits(['roomchanged'])

const selected = ref('')

onMounted(() => {
	selected.value = props.currentRoom
})
</script>

<style
	src="../../../styles/screens/chat/chatRoomSelection.scss"
	scoped
	lang="scss"
/>
