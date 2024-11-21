import api from '../config/api.config'

export const ChatService = {
	async getRooms() {
		const response = await api.get('/chat/rooms')

		return response.data
	},

	async getMessages(roomId) {
		const response = await api.get(`/chat/room/${roomId}/messages`)

		return response.data
	},

	async sendMessage(roomId, message) {
		const response = await api.post(`/chat/room/${roomId}/message`, { message })

		return response.data
	},
}
