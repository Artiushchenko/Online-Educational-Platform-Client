<template>
	<header>
		<a href="/courses" class="logo">
			<img src="/logo.png" alt="OEP Logo" />
			<span>OEP</span>
		</a>

		<div>
			<Search v-if="isAuthenticated" />
			<span>Unlock your potential, one lesson at a time!</span>
		</div>
	</header>
</template>

<script setup>
import { useAuthStore } from '../../store/auth.store'
import Search from '../ui/search/Search.vue'

const authStore = useAuthStore()
const isAuthenticated = authStore.isAuthenticated
</script>

<style src="../../styles/layout/header.scss" scoped lang="scss" />
