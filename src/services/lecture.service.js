import { $axiosAPI, $axiosBlob } from '../config/axios.config'
import { generateEmbedUrl } from '../utils/embed_url.util'

export const LectureService = {
	async getLecture(courseSlug, lectureId) {
		const response = await $axiosAPI.get(
			`/courses/${courseSlug}/lectures/${lectureId}`
		)

		if (response.data && response.data.video_id) {
			response.data.video_url = generateEmbedUrl(response.data.video_id)
		}

		return response.data
	},

	async downloadLectureFile(courseSlug, lectureId, file) {
		const response = await $axiosBlob.get(
			`/courses/${courseSlug}/lectures/${lectureId}/files/${file.id}/download`
		)

		return response.data
	},

	async markLectureAsViewed(courseSlug, lectureId) {
		await $axiosAPI.post(
			`/courses/${courseSlug}/lectures/${lectureId}/complete`
		)
	},
}
