import api from '../config/api.config'

export const UserService = {
	async getUserName() {
		const response = await api.get('/home')

		return response.data
	},

	async getStatistics() {
		const response = await api.get('/statistics')

		return response.data
	},
}
