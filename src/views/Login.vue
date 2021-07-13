<template>
	<div class="login">
		<van-nav-bar :fixed="true" title="登录" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>

		<div class="login-box">
			<div class="login-form">
				<div class="title">欢迎回来!</div>
				<div class="en-title">Please login to your accounts</div>

				<div class="login-form-box">

					<van-form>
						<van-field label="手机号" placeholder="手机号" v-model="userLoginInfo.phone" left-icon="phone-o" maxlength="11" />
						<van-field :type="isPassword ? 'password' : 'text'" label="密码" placeholder="密码" v-model="userLoginInfo.password"
						 left-icon="lock" :right-icon="isPassword ? 'closed-eye' : 'eye-o'" @click-right-icon="viewPassword" />
						<div class="clearfix forgot">
							<span class="fr" @click="goPage('Forgot')">忘记密码?</span>
						</div>
						<div class="login-btn">
							<van-button round block native-type="submit" color="#B83320" @click="login">登&nbsp;&nbsp;录</van-button>
						</div>
						<div class="login-btn">
							<van-button round block type="default" @click="openRegister">注&nbsp;&nbsp;册</van-button>
						</div>
					</van-form>

				</div>

			</div>
		</div>

		<van-popup class="popup-box" closeable v-model="isRegister" position="bottom" round>
			<div class="popup-item">
				<div class="register-text">注册</div>
				<van-form>
					<van-field label="手机号" placeholder="11位手机号" v-model="userRegisterInfo.phone" left-icon="phone-o" maxlength="11" />
					<van-field label="昵称" placeholder="1-10位昵称" v-model="userRegisterInfo.nickName" left-icon="manager-o" />
					<van-field label="邮箱" placeholder="电子邮箱地址" v-model="userRegisterInfo.email" left-icon="envelop-o" />
					<van-field :type="isPassword ? 'password' : 'text'" label="密码" placeholder="6-16位密码且以字母开头" v-model="userRegisterInfo.password"
					 left-icon="phone-o" :right-icon="isPassword ? 'closed-eye' : 'eye-o'" @click-right-icon="viewPassword" />
					<div class="login-btn">
						<van-button round block color="#B83320" native-type="submit" @click="register">注&nbsp;&nbsp;册</van-button>
					</div>
				</van-form>
			</div>
		</van-popup>

	</div>
</template>

<script>
	import "../assets/less/login.less"

	import {
		validForm
	} from '../assets/js/validForm'

	import {
		utils
	} from '../assets/js/utils'

	export default {
		data() {
			return {
				userLoginInfo: {
					phone: '',
					password: ''
				},

				userRegisterInfo: {
					phone: '',
					nickName: '',
					password: '',
					email: ''
				},

				isPassword: true,
				isRegister: false
			};
		},
		created() {
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

			// 跳转忘记密码
			goPage(name) {
				this.$router.push({
					name
				});
			},

			//查看密码
			viewPassword() {
				this.isPassword = !this.isPassword;
			},

			//弹出注册面板
			openRegister() {
				this.isRegister = true;
			},

			//注册
			register() {
				//获取用户注册信息
				let userInfo = this.userRegisterInfo;
				//验证注册表单
				let o = {
					phone: {
						value: userInfo.phone,
						reg: /^1[3-9]\d{9}$/,
						errorMsg: '手机号格式不正确'
					},
					nickName: {
						value: userInfo.nickName,
						reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
						errorMsg: '昵称格式不正确'
					},
					email: {
						value: userInfo.email,
						reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
						errorMsg: '邮箱格式不正确'
					},
					password: {
						value: userInfo.password,
						reg: /^[A-Za-z]\w{5,15}$/,
						errorMsg: '密码格式不正确'
					}
				};

				if (!validForm.valid(o)) {
					//验证不通过
					return;
				}

				// //开启加载提示
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
					loadingType: 'spinner'
				})

				let data = {
					account: userInfo.phone,
					password: userInfo.password,
					username: userInfo.nickName,
					email: userInfo.email
				};
				data = utils.queryString(data);
				// //发起请求
				this.axios({
					method: 'post',
					url: 'http://www.linkk.asia:10001/register',
					data
				}).then(result => {
					//关闭加载提示
					this.$toast.clear();
					//如果注册成功
					if (result.data.code == 200) {
						this.isRegister = false;
						//清空注册表单的数据
						// location.reload();
						// for (let key in userInfo) {
						// 	userInfo[key] = '';
						// }
					} else {
						//如果注册失败,则提示
						this.$notify({
							type: 'warning',
							message: result.data.msg
						})
					}
				}).catch(err => {
					this.$toast.clear();
				})
			},

			//登录
			login() {
				let userInfo = this.userLoginInfo;

				let o = {
					phone: {
						value: userInfo.phone,
						reg: /^1[3-9]\d{9}$/,
						errorMsg: '手机格式不正确'
					},
					password: {
						value: userInfo.password,
						reg: /^[A-Za-z]\w{5,15}$/,
						errorMsg: '密码格式不正确'
					}
				};

				//验证表单
				if (!validForm.valid(o)) {
					return;
				}

				//验证通过
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
					loadingType: 'spinner'
				})

				//复制userInfo
				// let info = Object.assign({}, userInfo);
				// info.appkey = this.appkey;

				//参数序列化
				let data = {
					account: userInfo.phone,
					password: userInfo.password,
				};
				data = utils.queryString(data);

				this.axios({
					method: 'POST',
					url: 'http://www.linkk.asia:10001/login',
					data
				}).then(result => {
					this.$toast.clear();
					if (result.data.code == 200) {
						this.token = result.data.token;
						localStorage.setItem('token', result.data.token);
						this.$router.push({
							name: 'My'
						});
					} else {
						this.$notify({
							type: 'warning',
							message: result.data.msg
						})
					}
				}).catch(err => {
					this.$toast.clear();
				})

			}
		}
	};
</script>

<style lang="less" scoped>
	.divider {
		margin-top: 180px;
	}

	.register {
		text-align: center;

		img {
			margin: 15px;
		}
	}
</style>
