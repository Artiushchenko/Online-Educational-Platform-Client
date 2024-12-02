import api from '../config/api.config'

export const CategoryService = {
	async getCategories() {
		const response = await api.get('/categories')

		return response.data
	},
}
