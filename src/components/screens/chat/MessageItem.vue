<template>
	<strong>{{ props.message.user.name }}:</strong>
	{{ props.message.message }}
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['message'])
</script>

<style src="../../../styles/screens/chat/messageItem.scss" scoped lang="scss" />
