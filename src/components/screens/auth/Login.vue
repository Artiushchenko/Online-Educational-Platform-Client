<template>
	<section>
		<h1>Log In</h1>

		<form @submit.prevent="login">
			<div class="form-group">
				<input
					type="email"
					placeholder="E-mail"
					v-model="email"
					:class="{ 'is-invalid': v$.email.$error }"
				/>
				<span v-if="v$.email.$error" class="error">
					{{ getErrorMessage(v$.email) }}
				</span>
			</div>

			<div class="form-group">
				<input
					type="password"
					placeholder="Password"
					v-model="password"
					:class="{ 'is-invalid': v$.password.$error }"
				/>
				<span v-if="v$.password.$error" class="error">
					{{ getErrorMessage(v$.password) }}
				</span>
			</div>

			<Button type="submit"> Log In </Button>
		</form>

		<span>
			Don't have an account yet?
			<a href="/register">Register</a>
		</span>
	</section>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import {
	email as emailValidator,
	helpers,
	required,
} from '@vuelidate/validators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToastNotification } from '../../../mixins/toast.mixin.js'
import { AuthService } from '../../../services/auth.service.js'
import { useAuthStore } from '../../../store/auth.store.js'
import Button from '../../ui/button/Button.vue'

const email = ref(null)
const password = ref(null)
const customRequired = helpers.withMessage('This field is required', required)
const customEmail = helpers.withMessage(
	'Please enter a valid e-mail address',
	emailValidator
)
const rules = {
	email: { required: customRequired, email: customEmail },
	password: { required: customRequired },
}
const v$ = useVuelidate(rules, { email, password })
const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const getErrorMessage = field => {
	const firstError = Object.keys(field.$errors)[0]
	return firstError ? field.$errors[0].$message : ''
}

const login = async () => {
	v$.value.$touch()

	if (v$.value.$invalid) {
		return
	}

	try {
		const response = await AuthService.login(email.value, password.value)
		authStore.login(response.config.headers['X-XSRF-TOKEN'])
		showSuccessToast('Login successfully')
		router.push('/courses')
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || 'Login failed. Please try again.'
		showErrorToast(errorMessage)
	}
}
</script>

<style src="../../../styles/screens/auth/login.scss" scoped lang="scss" />
