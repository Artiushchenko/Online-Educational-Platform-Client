import axios from 'axios'
import getTokenFromCookies from '../utils/cookie.util'

const token = getTokenFromCookies()

const api_image = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token,
	},
	withCredentials: true,
	responseType: 'blob',
})

export default api_image
