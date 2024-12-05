import api from '../config/api.config'

export const CourseService = {
	async getCourses(categoryIds = [], search = '') {
		const params = categoryIds.length
			? { category_ids: categoryIds.join(',') }
			: {}

		const response = await api.get('/courses', { params })

		return response.data
	},

	async getCourseBySlug(courseSlug) {
		const response = await api.get(`/courses/${courseSlug}`)

		return response.data
	},
}
