import { $axiosAPI } from '../config/axios.config'

export const ChatService = {
	async getRooms() {
		const response = await $axiosAPI.get('/chat/rooms')

		return response.data
	},

	async getMessages(roomId) {
		const response = await $axiosAPI.get(`/chat/room/${roomId}/messages`)

		return response.data
	},

	async sendMessage(roomId, message) {
		const response = await $axiosAPI.post(`/chat/room/${roomId}/message`, {
			message,
		})

		return response
	},
}
