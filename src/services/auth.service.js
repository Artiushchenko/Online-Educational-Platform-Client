import { $axios, $axiosAPI } from '../config/axios.config'

export const AuthService = {
	login(email, password) {
		$axios.get('/sanctum/csrf-cookie')

		return $axiosAPI.post('/login', {
			email,
			password,
		})
	},

	register(name, email, password, password_confirmation) {
		$axios.get('/sanctum/csrf-cookie')

		return $axiosAPI.post('/register', {
			name,
			email,
			password,
			password_confirmation,
		})
	},

	logout() {
		return $axiosAPI.post('/logout')
	},
}
