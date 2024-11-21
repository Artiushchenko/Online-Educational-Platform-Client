<template>
	<section class="cabinet">
		<h1 v-if="username">Hello, {{ username }}</h1>
	</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { UserService } from '../../../services/user.service'

const username = ref('')

const getUser = async () => {
	try {
		const data = await UserService.getUser()
		username.value = data.username
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	getUser()
})
</script>

<style src="../../../styles/screens/cabinet/cabinet.scss" scoped lang="scss" />
