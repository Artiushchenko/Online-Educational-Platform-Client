import api from '../config/api.config'
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
}
