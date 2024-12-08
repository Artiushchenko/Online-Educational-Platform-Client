import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { $axiosAPI } from '../config/axios.config'

export const initializeEcho = () => {
	window.Pusher = Pusher

	window.Echo = new Echo({
		broadcaster: 'pusher',
		key: import.meta.env.VITE_PUSHER_APP_KEY,
		cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
		wsHost: import.meta.env.VITE_PUSHER_HOST
			? import.meta.VITE_PUSHER_HOST
			: `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
		wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
		wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
		forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
		enabledTransports: ['ws', 'wss'],
		authEndpoint: '',
		authorizer: channel => {
			return {
				authorize: (socketId, callback) => {
					$axiosAPI
						.post('/broadcasting/auth', {
							socket_id: socketId,
							channel_name: channel.name,
						})
						.then(response => {
							callback(null, response.data)
						})
						.catch(error => {
							callback(error)
						})
				},
			}
		},
	})
}
