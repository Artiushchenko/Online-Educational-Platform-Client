import { $axiosAPI } from '../config/axios.config'

export const SearchService = {
	async searchCourses(searchQuery) {
		const params = { search: searchQuery }

		const response = await $axiosAPI.get('/search', { params })

		return response.data
	},
}
