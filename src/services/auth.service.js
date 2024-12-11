import { $axios, $axiosAPI } from '../config/axios.config'

export const AuthService = {
	async login(email, password) {
		await $axios.get('/sanctum/csrf-cookie')

		return $axiosAPI.post('/login', {
			email,
			password,
		})
	},

	async register(name, email, password, password_confirmation) {
		await $axios.get('/sanctum/csrf-cookie')

		return $axiosAPI.post('/register', {
			name,
			email,
			password,
			password_confirmation,
		})
	},

	async logout() {
		return $axiosAPI.post('/logout')
	},
}
