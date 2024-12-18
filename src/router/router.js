import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../components/screens/auth/Login.vue'),
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../components/screens/auth/Register.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not_found',
		component: () => import('../components/screens/not-found/NotFound.vue'),
	},
	{
		path: '/',
		name: 'home',
		component: () => import('../components/screens/home/Home.vue'),
	},
	{
		path: '/cabinet',
		name: 'cabinet',
		component: () => import('../components/screens/cabinet/Cabinet.vue'),
	},
	{
		path: '/courses',
		name: 'courses',
		component: () => import('../components/screens/courses/Courses.vue'),
	},
	{
		path: '/courses/:slug',
		name: 'course_page',
		component: () => import('../components/screens/courses/Course.vue'),
	},
	{
		path: '/courses/:slug/lectures/:lectureId',
		name: 'lecture_page',
		component: () => import('../components/screens/lectures/Lecture.vue'),
	},
	{
		path: '/chat',
		name: 'chat',
		component: () => import('../components/screens/chat/Container.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

function isProtectedRoute(route) {
	return !['login', 'register'].includes(route.name)
}

function isAuthRouteWithToken(route, token) {
	return ['login', 'register'].includes(route.name) && token
}

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('x_xsrf_token')

	if (!token && isProtectedRoute(to)) {
		next('/login')
	} else if (isAuthRouteWithToken(to, token)) {
		next(false)
	} else {
		next()
	}
})

export default router
