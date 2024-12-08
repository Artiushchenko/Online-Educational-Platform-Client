import { $axiosAPI } from '../config/axios.config'

export const CategoryService = {
	async getCategories() {
		const response = await $axiosAPI.get('/categories')

		return response.data
	},
}
