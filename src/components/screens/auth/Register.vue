<template>
	<section>
		<h1>Register</h1>

		<form @submit.prevent="register">
			<input type="text" placeholder="Username" v-model="name" />
			<input type="email" placeholder="E-mail" v-model="email" />
			<input type="password" placeholder="Password" v-model="password" />
			<input
				type="password"
				placeholder="Confirm password"
				v-model="password_confirmation"
			/>
			<Button type="submit">Register</Button>
		</form>

		<span>
			Do you have an account?
			<a href="/login">Log In</a>
		</span>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToastNotification } from '../../../mixins/toast.mixin.js'
import { AuthService } from '../../../services/auth.service.js'
import { useAuthStore } from '../../../store/auth.store.js'
import Button from '../../ui/button/Button.vue'

const name = ref(null)
const email = ref(null)
const password = ref(null)
const password_confirmation = ref(null)
const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const register = async () => {
	try {
		const response = await AuthService.register(
			name.value,
			email.value,
			password.value,
			password_confirmation.value
		)
		authStore.register(response.config.headers['X-XSRF-TOKEN'])
		showSuccessToast('Registration successfully')
		router.push('/courses')
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || 'Registration failed. Please try again.'
		showErrorToast(errorMessage)
	}
}
</script>

<style src="../../../styles/screens/auth/register.scss" scoped lang="scss" />
