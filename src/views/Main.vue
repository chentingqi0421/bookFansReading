<template>
	<div>
		<router-view />
		<van-tabbar v-model="active" :route="true" active-color="#ee0a24" >
			<van-tabbar-item v-for="item in data" :to="item.to" :icon="item.icon" @click="onload">{{item.title}}</van-tabbar-item>
			<van-tabbar-item :to="isTo" icon="manager-o" @click="onload">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				isTo: '',
				data: [{
						title: '书城',
						to: '/main/home',
						icon: 'wap-home-o',
					},
					{
						title: '排行',
						to: '/main/rank',
						icon: 'bar-chart-o',
					},
					{
						title: '搜索',
						to: '/main/search',
						icon: 'search',
					}, {
						title: '书单',
						to: '/main/bookshelf',
						icon: 'orders-o',
					}
				]
			}
		},
		created() {
			this.onload();
			// localStorage.clear()
		},
		methods: {
			onload() {
				if (localStorage.getItem('token') != '') {
					this.isTo = '/main/my';
				} else {
					this.isTo = '/main/login';
				}
			},
		}
	}
</script>

<style lang="less" scoped>
</style>
