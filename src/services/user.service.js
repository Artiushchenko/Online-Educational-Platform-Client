import { $axiosAPI } from '../config/axios.config'

export const UserService = {
	async getUserName() {
		const response = await $axiosAPI.get('/home')

		return response.data
	},

	async getStatistics() {
		const response = await $axiosAPI.get('/statistics')

		return response.data
	},
}
