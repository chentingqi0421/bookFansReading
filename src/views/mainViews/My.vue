<template>
	<div class="my">
		<van-nav-bar :fixed="true" title="我的" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
		<div class="my-wrap">
			<van-cell-group>
				<van-cell>
					<template #title>
						<div>
							<div class="head-info">
								<div class="head-portrai">
									<!-- <img src="../../assets/images/head_portrait.jpg" alt /> -->
								</div>
								<div class="username">测试号</div>
							</div>
							<div class="wealth-info">
								<div class="wealth-boxs" v-for="(item,index) in wealth" :key="index">
									<div class="box">{{item.count}}</div>
									<div class="box">{{item.title}}</div>
								</div>
							</div>
						</div>
					</template>
				</van-cell>

				<van-cell is-link>
					<template #title>
						<div class="title">
							<span class="fa fa-bell-o"></span>
							<span class="custom-title">消息通知</span>
						</div>
					</template>
				</van-cell>
			</van-cell-group>

			<van-cell-group>
				<van-cell is-link>
					<template #title>
						<div class="title">
							<span class="fa fa-id-card-o"></span>
							<span class="custom-title">个人资料</span>
						</div>
					</template>
				</van-cell>

				<van-cell is-link>
					<template #title>
						<div class="title">
							<span class="fa fa-print"></span>
							<span class="custom-title">发票管理</span>
						</div>
					</template>
				</van-cell>

				<van-cell is-link>
					<template #title>
						<div class="title">
							<span class="fa fa-shield"></span>
							<span class="custom-title">安全中心</span>
						</div>
					</template>
				</van-cell>

				<van-cell is-link>
					<template #title>
						<div class="title">
							<span class="fa fa-question-circle-o"></span>
							<span class="custom-title">帮助反馈</span>
						</div>
					</template>
				</van-cell>

				<van-cell is-link @click="exitLogin">
					<template #title>
						<div class="title">
							<span class="fa fa-sign-out"></span>
							<span class="custom-title">退出登录</span>
						</div>
					</template>
				</van-cell>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	import "../../assets/static/font-awesome/css/font-awesome.css";
	import {
		utils
	} from "../../assets/js/utils";

	export default {
		data() {
			return {
				wealth: [{
						title: "余额",
						count: "0.00",
					},
					{
						title: "优惠券",
						count: 0,
					},
					{
						title: "积分",
						count: 0,
					},
				],
			};
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			goHome() {
				this.$router.push({
					path: '/main/home'
				});
			},
			exitLogin() {
				localStorage.setItem('login', false);
				localStorage.setItem('token', '');
				this.$router.push({
					name: "Login"
				});
				// this.axios({
				// 		method: "POST",
				// 		url: "/logout",
				// 		data,
				// 	})
				// 	.then((result) => {
				// 		if (result.data.code == "F001") {
				// 			this.$router.push({
				// 				name: "Login"
				// 			});
				// 		}
				// 	})
				// 	.catch((error) => {
				// 		console.log(error);
				// 	});
			},
		},
	};
</script>

<style lang="less" scoped>
	.my {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100% - 50px);
		background-color: #f4f4f4;
		background-size: 100% auto;
	}

	.my-wrap {
		position: absolute;
		top: 60px;
		left: 10px;
		right: 10px;

		.van-cell-group {
			margin: 0 0 46px;
			border-radius: 10px;

			&::after {
				border-radius: 15px;
			}

			.van-cell {
				border-radius: 10px;
				min-height: 50px;
				background-color: transparent;

				.title {
					span {
						margin-right: 15px;
					}
				}

				.head-info {
					.head-portrai {
						float: left;
						width: 50px;
						height: 50px;
						border-radius: 50%;
						overflow: hidden;
						background-color: violet;

						img {
							width: 100%;
							height: 100%;
							background-color: violet;
						}
					}

					.username {
						float: left;
						height: 50px;
						width: 50px;
						line-height: 50px;
						text-align: center;
					}

					&::after {
						content: "";
						display: block;
						clear: both;
					}
				}

				.wealth-info {
					margin: 20px 0;
					display: flex;
					justify-content: space-around;

					.wealth-boxs {
						flex: 1;

						.box {
							height: 30px;
							line-height: 30px;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
