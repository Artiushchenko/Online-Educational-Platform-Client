<template>
	<section>
		<h1>Log In</h1>

		<form @submit.prevent="login">
			<input type="email" placeholder="E-mail" v-model="email" />
			<input type="password" placeholder="Password" v-model="password" />
			<Button type="submit">Log In</Button>
		</form>

		<span>
			Don't have an account yet?
			<router-link to="/register">Register</router-link>
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

const email = ref(null)
const password = ref(null)
const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const login = () => {
	$axios.get('/sanctum/csrf-cookie').then(response => {
		api
			.post('/login', {
				email: email.value,
				password: password.value,
			})
			.then(response => {
				authStore.login(response.config.headers['X-XSRF-TOKEN'])
				showSuccessToast('Login successfully')
				router.push('/courses')
			})
			.catch(error => {
				const errorMessage =
					error.response?.data?.message || 'Login failed. Please try again.'
				showErrorToast(errorMessage)
			})
	})
}
</script>

<style src="../../../styles/screens/auth/login.scss" scoped lang="scss" />
