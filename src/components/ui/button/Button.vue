<template>
	<button @click="handleClick">
		<slot></slot>
	</button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
	onClick: {
		type: Function,
		default: null,
	},
})

const emit = defineEmits(['click'])

const handleClick = event => {
	if (props.onClick) {
		props.onClick(event)
	}

	emit('click', event)
}
</script>

<style src="../../../styles/ui/button.scss" scoped lang="scss" />
