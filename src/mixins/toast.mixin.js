import { useToast } from 'vue-toastification'

export function useToastNotification() {
	const toast = useToast()

	const showSuccessToast = message => {
		toast.success(message)
	}

	const showErrorToast = message => {
		toast.error(message)
	}

	const showInfoToast = message => {
		toast.info(message)
	}

	return { showSuccessToast, showErrorToast, showInfoToast }
}
