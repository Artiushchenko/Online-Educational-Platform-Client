<template>
	<Header />

	<section class="content-container">
		<Sidebar />
		<Main />
	</section>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Sidebar from './components/layout/Sidebar.vue'
import Main from './components/layout/Main.vue'
</script>
