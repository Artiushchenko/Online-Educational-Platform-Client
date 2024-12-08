import { $axiosAPI } from '../config/axios.config'

export const CourseService = {
	async getCourses(categoryIds = [], search = '') {
		const params = categoryIds.length
			? { category_ids: categoryIds.join(',') }
			: {}

		const response = await $axiosAPI.get('/courses', { params })

		return response.data
	},

	async getCourseBySlug(courseSlug) {
		const response = await $axiosAPI.get(`/courses/${courseSlug}`)

		return response.data
	},
}
