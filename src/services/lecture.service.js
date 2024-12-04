import api from '../config/api.config'
import api_image from '../config/api_image'
import { generateEmbedUrl } from '../utils/embed_url.util'

export const LectureService = {
	async getLecture(courseSlug, lectureId) {
		const response = await api.get(
			`/courses/${courseSlug}/lectures/${lectureId}`
		)

		if (response.data && response.data.video_id) {
			response.data.video_url = generateEmbedUrl(response.data.video_id)
		}

		return response.data
	},

	async downloadLectureFile(courseSlug, lectureId, file) {
		const response = await api_image.get(
			`/courses/${courseSlug}/lectures/${lectureId}/files/${file.id}/download`
		)

		return response.data
	},

	async markLectureAsViewed(courseSlug, lectureId) {
		await api.post(`/courses/${courseSlug}/lectures/${lectureId}/complete`)
	},
}
