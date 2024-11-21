import api from '../config/api.config'

export const UserService = {
	async getUser() {
		const response = await api.get('/cabinet')

		return response.data
	},
}
