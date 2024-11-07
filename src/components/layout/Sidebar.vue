<template>
	<aside>
		<div class="user-info">
			<div class="user-pagination">
				<a href="/settings">
					<v-icon name="ri-settings-5-line" scale="1.2" fill="#646464" />
				</a>

				<a href="/logout">
					<v-icon name="gi-exit-door" scale="1.2" fill="#646464" />
				</a>
			</div>

			<img src="/test-avatar.png" alt="User Avatar" />

			<span class="username">IDENTITY x UNDEFINED</span>

			<span class="user-role">Administrator</span>
		</div>

		<nav>
			<ul>
				<li>
					<v-icon name="gi-entry-door" scale="1.2" fill="#646464" />
					<a href="/login">Log In</a>
				</li>

				<li>
					<v-icon name="io-home" scale="1.2" fill="#646464" />
					<a href="/cabinet">Cabinet</a>
				</li>

				<li>
					<v-icon name="bi-camera-video" scale="1.2" fill="#646464" />
					<a href="/courses">Courses</a>
				</li>

				<li>
					<v-icon name="bi-chat-dots" scale="1.2" fill="#646464" />
					<a href="/messenger">Messenger</a>
				</li>

				<li>
					<v-icon name="md-forum-outlined" scale="1.2" fill="#646464" />
					<a href="/forum">Forum</a>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<style src="../../styles/layout/sidebar.scss" scoped lang="scss" />
