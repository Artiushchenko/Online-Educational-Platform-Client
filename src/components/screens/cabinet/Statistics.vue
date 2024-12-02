<template>
	<div>
		<p>Learning progress</p>

		<div class="progress-bar">
			<div
				:style="{
					width: progress + '%',
					transition: 'width 1s ease-in-out',
				}"
			>
				<span v-if="!isLoading">{{ Math.round(progress) }}%</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { UserService } from '../../../services/user.service'

const progress = ref(0)
const isLoading = ref(true)

const fetchStatistics = async () => {
	try {
		const data = await UserService.getStatistics()
		progress.value = data.progress
	} catch (error) {
		console.error(error)
	} finally {
		setTimeout(() => {
			isLoading.value = false
		}, 100)
	}
}

onMounted(() => {
	fetchStatistics()
})
</script>

<style
	src="../../../styles/screens/cabinet/statistics.scss"
	scoped
	lang="scss"
/>
