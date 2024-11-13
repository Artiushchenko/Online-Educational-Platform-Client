<template>
	<section>
		<h1>Error 404 | Page Not Found</h1>
		<p>Sorry, the page you're looking for doesn't exist.</p>
		<Button @click="goBack">Go back</Button>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '../../ui/button/Button.vue'

const router = useRouter()

const goBack = () => {
	router.back()
}
</script>

<style
	src="../../../styles/screens/not-found/notFound.scss"
	scoped
	lang="scss"
/>
