import axios from 'axios'
import Cookies from 'js-cookie'

export const $axios = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
		'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
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
