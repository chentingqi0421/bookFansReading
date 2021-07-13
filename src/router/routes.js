export const routes = [{
		path: '/main',
		name: 'Main',
		component: () => import('../views/Main.vue'),

		children: [{
				path: 'home',
				name: 'Home',
				component: () => import('../views/mainViews/Home.vue')
			},
			{
				path: 'rank',
				name: 'Rank',
				component: () => import('../views/mainViews/Rank.vue')
			},
			{
				path: 'bookshelf',
				name: 'Bookshelf',
				component: () => import('../views/mainViews/Bookshelf.vue')
			},
			{
				path: 'search',
				name: 'Search',
				component: () => import('../views/mainViews/Search.vue')
			},
			{
				path: 'my',
				name: 'My',
				component: () => import('../views/mainViews/My.vue')
			}, {
				path: 'login',
				name: 'Login',
				component: () => import('../views/Login.vue')
			}
		]
	},
	{
		path: '/cataloglist',
		name: 'CatalogList',
		component: () => import('../views/CatalogList.vue')
	},
	{
		path: '/detail',
		name: 'Detail',
		component: () => import('../views/Detail.vue')
	},
	{
		path: '/classifymax',
		name: 'ClassifyMax',
		component: () => import('../views/ClassifyMax.vue')
	},
	{
		path: '/classifymin',
		name: 'ClassifyMin',
		component: () => import('../views/ClassifyMin.vue')
	},
	{
		path: '/reader',
		name: 'Reader',
		component: () => import('../views/Reader.vue')
	},
	{
		path: '/relevant',
		name: 'Relevant',
		component: () => import('../views/Relevant.vue')
	},
	{
		path: '*',
		redirect: {
			name: 'Home'
		}
	}
]
