import axios from 'axios'
import getTokenFromCookies from '../utils/cookie.util'

const token = getTokenFromCookies()

export const $axios = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token,
	},
	withCredentials: true,
})

export const createApiInstance = (basePath = '', options = {}) => {
	return $axios.create({
		baseURL: `http://localhost:8080${basePath}`,
		...options,
	})
}

export const $axiosAPI = createApiInstance('/api')
export const $axiosBlob = createApiInstance('/api', { responseType: 'blob' })
