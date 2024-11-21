import api from '../config/api.config'
import $axios from '../config/axios.config'

export const AuthService = {
	login(email, password) {
		$axios.get('/sanctum/csrf-cookie')

		return api.post('/login', {
			email,
			password,
		})
	},

	register(name, email, password, password_confirmation) {
		$axios.get('/sanctum/csrf-cookie')

		return api.post('/register', {
			name,
			email,
			password,
			password_confirmation,
		})
	},

	logout() {
		return api.post('/logout')
	},
}
