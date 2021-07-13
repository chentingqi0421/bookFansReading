<template>
	<div class="home">
		<van-nav-bar :fixed="true" title="我的书架" right-text="书城" left-text="返回" @click-left="goBack" @click-right="goHome"
		 left-arrow></van-nav-bar>

		<ul class="fav-books">
			<li class="book-card-item" @click="clickBookCard(item)" v-for="item in bookShelf" :key=item._id>
				<img class="book-card-img" :src="'https://statics.zhuishushenqi.com'+item.cover" alt />
				<div class="book-detail">
					<h5>{{item.title}}</h5>
					<span class="book-auto">{{item.author}} | </span>
					<span class="book-class">{{item.majorCate}}</span>
					<p>{{item.longIntro}}</p>
					<span class="book-num">{{item.wordCount}} 万 | </span>
					<span class="book-old">
						<span class="keep">{{item.retentionRatio}}%</span>
						留存率</span>
				</div>
				<span class="delete" @click.stop="removeBook(item._id)">
					<van-icon name="delete" />
				</span>
			</li>
			<li @click="goHome">
				<span class="book-add"></span>
				<div class="book-detail book-add-title">添加你喜欢的小说</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		utils
	} from '../../assets/js/utils'

	export default {
		name: "home",
		data() {
			return {
				bookShelf: [],
				bookList:[],
				bookData:[],
			}
		},
		created() {
			this.startData()
			this.onload();
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

			startData() {
				// 找不到
				// if (!localStorage.getItem("weibooks")) {

				// 	return;
				// }
				// this.bookShelf = JSON.parse(localStorage.getItem("weibooks")).reverse()

			},
			// 开始阅读
			clickBookCard(item) {
				let title = item.title;
			    for(let i=0;i<this.bookList.length;i++){
					if(item._id == this.bookList[i].bookid){
						let data = {
							bookName:title,
							title: title,
							index:this.bookList[i].chapter - 1,
							_id:this.bookList[i].shuyuanid,
							shuYuanId: this.bookList[i].shuyuanid,
							link:this.bookList[i].link
						}
						this.$router.push({
							name:'Reader',
							query:data
						})
						break;
					}
				}
			},
			// 删除一个书
			removeBook(bookid) {
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
					loadingType: 'spinner'
				})
				this.axios({
					method: 'get',
					url: 'http://www.linkk.asia:10001/user/delBookshelf',
					params: {
						token: localStorage.getItem('token'),
						bookid
					}
				}).then(result => {
					this.$toast.clear();
					location.reload();
					console.log(result)
				}).catch(err => {
					this.$toast.clear();
				})
			},

			//初始化
			onload() {
				let data = {
					token: localStorage.getItem('token')
				};
				data = utils.queryString(data);
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
					loadingType: 'spinner'
				})
				this.axios({
					method: 'post',
					url: 'http://www.linkk.asia:10001/user/getBookshelf',
					data
				}).then(result => {
					this.bookList = result.data.newslist;
					this.getbookList(result.data.newslist);
				}).catch(err => {
					this.$toast.clear();
				})
			},

			getbookList(bookids) {
				bookids.map(e => {
					this.axios({
						method: 'get',
						url: 'http://novel.kele8.cn/book-info/' + e.bookid,
					}).then(result => {
						result.data.wordCount = (result.data.wordCount / 10000).toFixed(2);
						this.bookShelf.push(result.data);
					}).catch(err => {
						this.$toast.clear();
					})
				})
				this.$toast.clear();
			},

		}
	};
</script>

<style lang="less" scoped>
	.home {
		background-color: #f5f2ed;

		.fav-books {
			li {
				height: 98px;
				padding: 15px 0 15px 15px;
				border-bottom: 1px solid #e7e7e7;
				background-color: #f5f2ed;
				position: relative;

				.book-card-img {
					width: 70px;
					float: left;
					margin-right: 15px;
					box-shadow: 0 2px 1px 2px rgba(0, 0, 0, .15);
					border-radius: 2px;
				}

				.book-detail {
					float: left;
					height: 98px;
					width: calc(~"100% - 85px");
				}

				span {
					color: #999;
				}

				.keep {
					color: red;
				}

				.book-add-title {
					line-height: 100px;
					font-size: 16px;
				}

				h5 {
					font-size: 14px;
					margin: 5px 0;
				}

				p {
					color: #999;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 10px;
					margin: 5px 0;
				}

				.book-add {
					float: left;
					width: 70px;
					height: 100px;
					background-color: #e7e7e7;
					margin-right: 15px;
					position: relative;

					&::before {
						position: absolute;
						content: "";
						display: block;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 30px;
						height: 2px;
						background-color: #999;
					}

					&::after {
						position: absolute;
						content: "";
						display: block;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 2px;
						height: 30px;
						background-color: #999;
					}
				}

				.delete {
					position: absolute;
					top: 20px;
					right: 20px;
					font-size: 20px;
				}
			}
		}
	}
</style>
