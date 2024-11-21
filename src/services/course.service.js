import api from '../config/api.config'

export const CourseService = {
	async getCourses() {
		const response = await api.get('/courses')

		return response.data
	},

	async getCourseBySlug(courseSlug) {
		const response = await api.get(`/courses/${courseSlug}`)

		return response.data
	},
}
