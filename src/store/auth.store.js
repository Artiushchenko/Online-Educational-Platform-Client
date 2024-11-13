import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
	const isAuthenticated = ref(!!localStorage.getItem('x_xsrf_token'))

	const login = token => {
		localStorage.setItem('x_xsrf_token', token)
		isAuthenticated.value = true
	}

	const register = token => {
		localStorage.setItem('x_xsrf_token', token)
		isAuthenticated.value = true
	}

	const logout = () => {
		localStorage.removeItem('x_xsrf_token')
		isAuthenticated.value = false
	}

	return {
		isAuthenticated,
		login,
		register,
		logout,
	}
})
