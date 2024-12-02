import api from '../config/api.config'

export const UserService = {
	async getUser() {
		const response = await api.get('/cabinet')

		return response.data
	},

	async getStatistics() {
		const response = await api.get('/statistics')

		return response.data
	},
}
