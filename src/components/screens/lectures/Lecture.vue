<template>
	<section class="lecture-page">
		<router-link :to="`/courses/${courseSlug}`">
			<v-icon name="bi-arrow-left" scale="1.2" fill="#646464" />
		</router-link>

		<h1 v-if="lecture">{{ lecture.title }}</h1>
		<div v-else>Loading...</div>

		<div v-if="lecture" class="lecture-content">
			<iframe
				:src="lecture.video_url"
				frameborder="0"
				allowfullscreen
				width="800"
				height="450"
			></iframe>
			<div v-html="lecture.content"></div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { LectureService } from '../../../services/lecture.service'

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

onMounted(() => {
	getLecture()
})
</script>

<style
	src="../../../styles/screens/lectures/lectures.scss"
	scoped
	lang="scss"
/>
