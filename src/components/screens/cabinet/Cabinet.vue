<template>
	<section class="cabinet">
		<Statistics />

		<Button @click="generateReport" :disabled="loading">
			{{ loading ? 'Loading...' : 'Get viewed lectures' }}
		</Button>
	</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToastNotification } from '../../../mixins/toast.mixin'
import { initializeEcho } from '../../../services/echo.service'
import { ReportService } from '../../../services/report.service'
import Button from '../../ui/button/Button.vue'
import Statistics from './Statistics.vue'

const { showSuccessToast, showErrorToast } = useToastNotification()

const loading = ref(false)

const generateReport = async () => {
	if (loading.value) {
		return
	}

	loading.value = true

	try {
		await ReportService.generateReport()
	} catch (error) {
		console.error(error)
		showErrorToast('Failed to start report generation')
	} finally {
		loading.value = false
	}
}

const downloadReport = async data => {
	try {
		const fileName = data.fileName
		const reportData = await ReportService.downloadReport(fileName)
		const url = window.URL.createObjectURL(new Blob([reportData]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		link.click()
		link.remove()
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	initializeEcho()

	window.Echo.private('reports').listen('.report.generated', data => {
		showSuccessToast(
			'The report is ready! The download will start automatically'
		)
		downloadReport(data)
	})
})
</script>

<style src="../../../styles/screens/cabinet/cabinet.scss" scoped lang="scss" />
