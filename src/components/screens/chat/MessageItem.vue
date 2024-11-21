<template>
	<strong>{{ props.message.user.name }}:</strong>
	{{ props.message.message }}
</template>

<script setup>
const props = defineProps(['message'])
</script>
