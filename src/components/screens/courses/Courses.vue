<template>
	<section class="courses">
		<div class="courses-header">
			<h1>Courses</h1>

			<div class="filters">
				<select
					v-model="selectedCategories"
					id="categories"
					class="categories-filter"
					multiple
				>
					<option
						v-for="category in allCategories"
						:key="category.id"
						:value="category.id"
					>
						{{ category.name }}
					</option>
				</select>
			</div>
		</div>

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
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CategoryService } from '../../../services/category.service'
import { CourseService } from '../../../services/course.service'

const courses = ref([])
const allCategories = ref([])
const selectedCategories = ref([])

const route = useRoute()
const router = useRouter()

const fetchCourses = async () => {
	try {
		courses.value = await CourseService.getCourses(selectedCategories.value)
	} catch (error) {
		console.log(error)
	}
}

const fetchCategories = async () => {
	try {
		allCategories.value = await CategoryService.getCategories()

		await nextTick()

		new MultiSelectTag('categories', {
			placeholder: 'Category(ies)',
			tagColor: {
				textColor: '#000000',
				borderColor: '#000000',
				bgColor: '#FFFFFF',
			},
			onChange: selectedOptions => {
				selectedCategories.value = selectedOptions
					.map(option => option.value)
					.filter(value => !isNaN(value))
					.map(Number)

				router.push({
					name: 'courses',
					query: {
						category_ids: selectedCategories.value.join(','),
					},
				})

				fetchCourses()
			},
		})
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	if (route.query.category_ids) {
		selectedCategories.value = route.query.category_ids.split(',').map(Number)
	}

	fetchCourses()
	fetchCategories()
})
</script>

<style src="../../../styles/screens/courses/courses.scss" scoped lang="scss" />
