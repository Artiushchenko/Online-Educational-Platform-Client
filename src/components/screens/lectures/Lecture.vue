<template>
	<section class="lecture-page">
		<router-link :to="`/courses/${courseSlug}`" v-if="lecture">
			Back
		</router-link>

		<h1 v-if="lecture">{{ lecture.title }}</h1>
		<div v-else>Loading...</div>

		<div v-if="lecture" class="lecture-content">
			<iframe
				:src="lecture.video_url"
				frameborder="0"
				allowfullscreen
				width="700"
				height="400"
			></iframe>

			<div
				v-if="isContentVisible"
				v-html="lecture.content"
				class="lecture-content-text"
			></div>

			<div v-if="lecture.files.length > 0" class="lecture-files">
				<p>Lecture files</p>

				<table>
					<thead>
						<tr>
							<th>File Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="file in lecture.files" :key="file.id">
							<td>{{ file.file_name }}</td>
							<td>
								<button
									@click="downloadFile(file)"
									class="download-file-button"
								>
									Download
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { LectureService } from '../../../services/lecture.service'
import Button from '../../ui/button/Button.vue'

const lecture = ref(null)
const route = useRoute()

const courseSlug = route.params.slug
const lectureId = route.params.lectureId

const getLecture = async () => {
	try {
		lecture.value = await LectureService.getLecture(courseSlug, lectureId)
	} catch (error) {
		console.error(error)
	}
}

const isContentVisible = computed(() => {
	return (
		lecture.value &&
		lecture.value.content &&
		lecture.value.content.trim() !== '<p><br></p>'
	)
})

const markLectureAsViewed = async () => {
	try {
		await LectureService.markLectureAsViewed(courseSlug, lectureId)
	} catch (error) {
		console.error(error)
	}
}

const downloadFile = async file => {
	try {
		const fileData = await LectureService.downloadLectureFile(
			courseSlug,
			lectureId,
			file
		)

		const url = window.URL.createObjectURL(new Blob([fileData]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', file.file_name)
		document.body.appendChild(link)
		link.click()
		link.remove()
	} catch (error) {
		console.error('Error downloading file', error)
	}
}

onMounted(() => {
	getLecture()
	setTimeout(markLectureAsViewed, 300000)
})
</script>

<style
	src="../../../styles/screens/lectures/lectures.scss"
	scoped
	lang="scss"
/>
