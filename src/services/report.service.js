import api from '../config/api.config'
import api_image from '../config/api_image'

export const ReportService = {
	async generateReport() {
		const response = await api.post('/report/generate')

		return response.data
	},

	async downloadReport(fileName) {
		const response = await api_image.get(`/report/download/${fileName}`)

		return response.data
	},
}
