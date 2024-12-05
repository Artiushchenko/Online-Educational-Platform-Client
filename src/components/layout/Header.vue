<template>
	<header>
		<a href="/courses" class="logo">
			<img src="/logo.png" alt="OEP Logo" />
			<span>OEP</span>
		</a>

		<div>
			<Search />
			<span>Unlock your potential, one lesson at a time!</span>
		</div>
	</header>
</template>

<script setup>
import Search from '../ui/search/Search.vue'
</script>

<style src="../../styles/layout/header.scss" scoped lang="scss" />
