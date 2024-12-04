<template>
	<aside v-if="isAuthenticated">
		<div class="user-info">
			<span class="username">{{ userName }}</span>

			<span class="user-role">{{ userRole }}</span>
		</div>

		<nav>
			<ul>
				<li v-if="isAuthenticated">
					<a href="/cabinet">Cabinet</a>
				</li>

				<li v-if="isAuthenticated">
					<a href="/courses">Courses</a>
				</li>

				<li v-if="isAuthenticated">
					<a href="/chat">Chat</a>
				</li>

				<li>
					<a @click.prevent="handleLogout" href="#">Logout</a>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToastNotification } from '../../mixins/toast.mixin'
import { AuthService } from '../../services/auth.service'
import { UserService } from '../../services/user.service'
import { useAuthStore } from '../../store/auth.store'

const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()
const userName = ref('')
const userRole = ref('')

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = async () => {
	try {
		await AuthService.logout()
		authStore.logout()
		showSuccessToast('Logout successfully')
		router.push('/login')
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || 'Logout failed. Please try again.'
		showErrorToast(errorMessage)
	}
}

onMounted(async () => {
	try {
		const data = await UserService.getUserName()
		userName.value = data.user_name
		userRole.value = data.user_role
	} catch (error) {
		console.error(error)
	}
})
</script>

<style src="../../styles/layout/sidebar.scss" scoped lang="scss" />
