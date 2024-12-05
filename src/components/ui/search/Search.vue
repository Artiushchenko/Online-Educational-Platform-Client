<template>
	<div class="global-search">
		<input
			type="text"
			v-model="searchQuery"
			placeholder="Search something"
			@input="debouncedSearch"
		/>

		<ul v-if="results.length">
			<li v-for="course in results" :key="course.id">
				<a :href="`/courses/${course.slug}`">
					{{ course.title }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import debounce from 'lodash/debounce'
import { ref } from 'vue'
import { SearchService } from '../../../services/search.service'

const searchQuery = ref('')
const results = ref([])

const isValidQuery = query => /^[a-zA-Zа-яА-Я]+$/.test(query)

const fetchQuery = async query => {
	if (!isValidQuery(query)) {
		results.value = []
		return
	}

	if (!query) {
		results.value = []
		return
	}

	try {
		results.value = await SearchService.searchCourses(query)
	} catch (error) {
		console.error(error)
	}
}

const debouncedSearch = debounce(() => {
	fetchQuery(searchQuery.value)
}, 300)
</script>

<style src="../../../styles/ui/search.scss" scoped lang="scss" />
