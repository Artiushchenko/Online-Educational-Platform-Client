import api from '../config/api.config'

export const SearchService = {
	async searchCourses(searchQuery) {
		const params = { search: searchQuery }

		const response = await api.get('/search', { params })

		return response.data
	},
}
