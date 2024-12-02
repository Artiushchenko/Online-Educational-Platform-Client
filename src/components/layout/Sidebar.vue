<template>
	<aside v-if="isAuthenticated">
		<div class="user-info">
			<div class="user-pagination">
				<a href="/settings">
					<v-icon
						name="ri-settings-5-line"
						scale="1.2"
						fill="#646464"
						animation="spin"
						speed="fast"
						hover
					/>
				</a>

				<a @click.prevent="handleLogout" href="#">
					<v-icon name="gi-exit-door" scale="1.2" fill="#646464" />
				</a>
			</div>

			<img src="/test-avatar.png" alt="User Avatar" />

			<span class="username">{{ userName }}</span>

			<span class="user-role">{{ userRole }}</span>
		</div>

		<nav>
			<ul>
				<li v-if="isAuthenticated">
					<v-icon name="io-home" scale="1.2" fill="#646464" />
					<a href="/cabinet">Cabinet</a>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="bi-camera-video" scale="1.2" fill="#646464" />
					<a href="/courses">Courses</a>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="bi-chat-dots" scale="1.2" fill="#646464" />
					<a href="/chat">Chat</a>
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

const getUserData = async () => {
	try {
		const data = await UserService.getUser()
		userName.value = data.user_name
		userRole.value = data.user_role
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	getUserData()
})
</script>

<style src="../../styles/layout/sidebar.scss" scoped lang="scss" />
