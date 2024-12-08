import { $axiosAPI, $axiosBlob } from '../config/axios.config'

export const ReportService = {
	async generateReport() {
		const response = await $axiosAPI.post('/report/generate')

		return response.data
	},

	async downloadReport(fileName) {
		const response = await $axiosBlob.get(`/report/download/${fileName}`)

		return response.data
	},
}
