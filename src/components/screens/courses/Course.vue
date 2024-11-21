<template>
	<section class="course-page">
		<router-link to="/courses">
			<v-icon name="bi-arrow-left" scale="1.2" fill="#646464" />
		</router-link>

		<h1 v-if="course">{{ course.title }}</h1>

		<div v-else>Loading...</div>

		<div class="course-lectures-container">
			<div class="course-lectures" v-if="course && course.lectures">
				<ul>
					<li v-for="lecture in course.lectures" :key="lecture.id">
						<router-link :to="`/courses/${course.slug}/lectures/${lecture.id}`">
							{{ lecture.title }}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CourseService } from '../../../services/course.service'

const course = ref(null)
const route = useRoute()

const getCourseLectures = async () => {
	const courseSlug = route.params.slug

	try {
		course.value = await CourseService.getCourseBySlug(courseSlug)
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	getCourseLectures()
})
</script>

<style src="../../../styles/screens/courses/course.scss" scoped lang="scss" />
