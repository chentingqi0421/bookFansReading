<template>
	<div class="my">
		<van-nav-bar :fixed="true" title="我的" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
	    <center><van-button square type="primary" @click="click">退出登录</van-button></center>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgData: [{
						path: require("../../assets/images/wx.png")
					},
					{
						path: require("../../assets/images/qq.png")
					},
					{
						path: require("../../assets/images/wb.png")
					},
				],
			};
		},
		methods: {
			// 返回上一级
			goBack() {
				this.$router.go(-1);
			},
			goHome() {
				this.$router.push({
					path: '/main/home'
				});
			},
			click(){
				localStorage.setItem('login',false);
				localStorage.setItem('token','');
				this.$router.push({name:"Login"})
			}
		}
	};
</script>

<style lang="less" scoped>
	center{
		margin-top: 100px;
	}
</style>
