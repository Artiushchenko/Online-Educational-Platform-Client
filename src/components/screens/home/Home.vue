<template>
	<p v-if="!username">Loading...</p>
	<p v-else class="greeting">Nice to see you here, dear {{ username }} 🥳</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserService } from '../../../services/user.service.js'

const username = ref('')

onMounted(async () => {
	try {
		const data = await UserService.getUserName()
		username.value = data.user_name
	} catch (error) {
		console.error(error)
	}
})
</script>

<style src="../../../styles/screens/home/home.scss" scoped lang="scss" />
