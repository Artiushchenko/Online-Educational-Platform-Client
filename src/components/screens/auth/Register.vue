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
			<router-link to="/login">Log In</router-link>
		</span>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../../config/api.config.js'
import $axios from '../../../config/axios.config.js'
import { useToastNotification } from '../../../mixins/toast.mixin.js'
import { useAuthStore } from '../../../store/auth.store.js'
import Button from '../../ui/button/Button.vue'

const name = ref(null)
const email = ref(null)
const password = ref(null)
const password_confirmation = ref(null)
const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const register = () => {
	$axios.get('/sanctum/csrf-cookie').then(response => {
		api
			.post('/register', {
				name: name.value,
				email: email.value,
				password: password.value,
				password_confirmation: password_confirmation.value,
			})
			.then(response => {
				authStore.register(response.config.headers['X-XSRF-TOKEN'])
				showSuccessToast('Registration successfully')
				router.push('/courses')
			})
			.catch(error => {
				const errorMessage =
					error.response?.data?.message ||
					'Registration failed. Please try again.'
				showErrorToast(errorMessage)
			})
	})
}
</script>

<style src="../../../styles/screens/auth/register.scss" scoped lang="scss" />
