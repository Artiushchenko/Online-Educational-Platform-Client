<template>
	<section>
		<h1>Register</h1>

		<form @submit.prevent="register">
			<div class="form-group">
				<input
					type="text"
					placeholder="Username"
					v-model="name"
					:class="{ 'is-invalid': v$.name.$error }"
				/>
				<span v-if="v$.name.$error" class="error">
					{{ getErrorMessage(v$.name) }}
				</span>
			</div>

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

			<div class="form-group">
				<input
					type="password"
					placeholder="Confirm password"
					v-model="password_confirmation"
					:class="{ 'is-invalid': v$.password_confirmation.$error }"
				/>
				<span v-if="v$.password_confirmation.$error" class="error">
					{{ getErrorMessage(v$.password_confirmation) }}
				</span>
			</div>

			<Button type="submit">Register</Button>
		</form>

		<span>
			Do you have an account?
			<a href="/login">Log In</a>
		</span>
	</section>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import {
	email as emailValidator,
	helpers,
	minLength,
	required,
	sameAs,
} from '@vuelidate/validators'
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

const customRequired = helpers.withMessage('This field is required', required)
const customEmail = helpers.withMessage(
	'Please enter a valid e-mail',
	emailValidator
)
const customMinLength = helpers.withMessage(
	'Password must be at least 8 characters',
	minLength(8)
)
const customSameAs = helpers.withMessage(
	'Passwords must match',
	sameAs(password)
)

const rules = {
	name: { required: customRequired },
	email: { required: customRequired, email: customEmail },
	password: { required: customRequired, minLength: customMinLength },
	password_confirmation: { required: customRequired, sameAs: customSameAs },
}
const v$ = useVuelidate(rules, { name, email, password, password_confirmation })

const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const getErrorMessage = field => {
	const firstError = Object.keys(field.$errors)[0]
	return firstError ? field.$errors[0].$message : ''
}

const register = async () => {
	v$.value.$touch()

	if (v$.value.$invalid) {
		return
	}

	try {
		const response = await AuthService.register(
			name.value,
			email.value,
			password.value,
			password_confirmation.value
		)
		authStore.register(response.config.headers['X-XSRF-TOKEN'])
		showSuccessToast('Registration successfully')
		router.push('/')
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || 'Registration failed. Please try again.'
		showErrorToast(errorMessage)
	}
}
</script>

<style src="../../../styles/screens/auth/register.scss" scoped lang="scss" />
