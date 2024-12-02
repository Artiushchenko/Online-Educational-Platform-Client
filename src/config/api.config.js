import axios from 'axios'
import getTokenFromCookies from '../utils/cookie.util'

const token = getTokenFromCookies()

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token,
	},
	withCredentials: true,
})

export default api
