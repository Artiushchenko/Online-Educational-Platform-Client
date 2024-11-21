<template>
	<section class="courses">
		<h1>Courses</h1>

		<div class="courses-list">
			<router-link
				:to="`/courses/${course.slug}`"
				v-for="course in courses"
				:key="course.id"
				class="courses-item"
			>
				<h2>{{ course.title }}</h2>
				<p>
					Categories:
					<span v-for="category in course.categories" :key="category.id">
						{{ category.name }}
					</span>
				</p>
			</router-link>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CourseService } from '../../../services/course.service'

const courses = ref([])

onMounted(() => {
	fetchCourses()
})

const fetchCourses = async () => {
	try {
		courses.value = await CourseService.getCourses()
	} catch (error) {
		console.log(error)
	}
}
</script>

<style src="../../../styles/screens/courses/courses.scss" scoped lang="scss" />
