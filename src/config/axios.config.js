import axios from 'axios'
import getTokenFromCookies from '../utils/cookie.util'

const token = getTokenFromCookies()

const $axios = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token,
	},
	withCredentials: true,
})

export default $axios
