<template>
	<aside v-if="isAuthenticated">
		<div class="user-info">
			<div class="user-pagination">
				<router-link to="/settings">
					<v-icon
						name="ri-settings-5-line"
						scale="1.2"
						fill="#646464"
						animation="spin"
						speed="fast"
						hover
					/>
				</router-link>

				<a @click.prevent="handleLogout" href="#">
					<v-icon name="gi-exit-door" scale="1.2" fill="#646464" />
				</a>
			</div>

			<img src="/test-avatar.png" alt="User Avatar" />

			<span class="username">IDENTITY x UNDEFINED</span>

			<span class="user-role">Administrator</span>
		</div>

		<nav>
			<ul>
				<li v-if="!isAuthenticated">
					<v-icon name="gi-entry-door" scale="1.2" fill="#646464" />
					<router-link to="/login">Log In</router-link>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="io-home" scale="1.2" fill="#646464" />
					<router-link to="/cabinet">Cabinet</router-link>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="bi-camera-video" scale="1.2" fill="#646464" />
					<router-link to="/courses">Courses</router-link>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="bi-chat-dots" scale="1.2" fill="#646464" />
					<router-link to="/chat">Chat</router-link>
				</li>

				<li v-if="isAuthenticated">
					<v-icon name="md-forum-outlined" scale="1.2" fill="#646464" />
					<router-link to="/forum">Forum</router-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../config/api.config'
import { useToastNotification } from '../../mixins/toast.mixin'
import { useAuthStore } from '../../store/auth.store'

const router = useRouter()
const { showSuccessToast, showErrorToast } = useToastNotification()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
	api
		.post('/logout')
		.then(() => {
			authStore.logout()
			showSuccessToast('Logout successfully')
			router.push('/login')
		})
		.catch(error => {
			const errorMessage =
				error.response?.data?.message || 'Logout failed. Please try again.'
			showErrorToast(errorMessage)
		})
}
</script>

<style src="../../styles/layout/sidebar.scss" scoped lang="scss" />
