<template>
	<div class="detail">
		<van-nav-bar :fixed="true" title="书籍详情" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
		<div class="book-detail clearfix">
			<img :src="bookDetail.cover" alt="" />
			<div class="book-detail-word">
				<h3>{{ bookDetail.title }}</h3>
				<div class="detail-ac">
					<span class="book-author">{{ bookDetail.author }}</span>
					<span class="book-copyright">{{ bookDetail.copyright }}</span>
				</div>
				<div class="tw">
					<span class="book-type">{{ bookDetail.minorCate }}</span>
					<span class="book-wordCount">{{ bookDetail.wordCount }}</span>
				</div>
			</div>
		</div>
		<!-- 读者数据部分 -->
		<ul class="reader-data">
			<li class="score">
				<p>
					<span class="star-score">{{ readerData.score }}</span>
					<van-rate v-model="value" :size="12" color="#ffd21e" void-icon="star" void-color="#eee" :gutter="0" />
				</p>
				<p class="score-count">{{ readerData.tip }}</p>
			</li>
			<li>
				<p>{{ bookDetail.retentionRatio }}%</p>
				<p>读者留存</p>
			</li>
			<li>
				<p>{{ bookDetail.latelyFollower }}</p>
				<p>7日人气</p>
			</li>
			<li>
				<p>{{ bookDetail.totalFollower }}</p>
				<p>累计人气</p>
			</li>
		</ul>
		<!-- 简介部分 -->
		<div class="describe-box">
			<h3>简介</h3>
			<span class="span-classify" v-for="(item, index) in bookDetail.tags" :key="index">{{ item }}</span>
			<p :class="[isActive ? 'active' : '']">
				{{ bookDetail.longIntro }}
				<span class="arrow-down">
					<van-icon name="arrow-down" @click="jian()" />
				</span>
			</p>
		</div>
		<div class="detail-catalog" @click="goList()">
			<span class="catalogue">目录</span>
			<span>1天前更新</span>
			<span>{{ bookDetail.lastChapter }}
				<van-icon name="arrow" />
			</span>
		</div>

		<!-- 热门短评和热门书评 -->
		<div class="hot-short">
			<h5 class="hot-title">热门短评</h5>
			<ul class="hot-content"></ul>
			<div class="all-ping">查看全部短评</div>
		</div>
		<div class="hot-book">
			<h5 class="hot-title">热门书评</h5>
			<ul class="hot-content"></ul>
			<div class="all-ping">全部书评</div>
		</div>

		<!-- 加入购物车 开始阅读 -->
		<van-tabbar v-model="active">
			<van-tabbar-item name="zhui" @click="addBookshelf"><span class="add">+</span>加入书架</van-tabbar-item>
			<van-tabbar-item name="kai" class="startRead" @click="startRead()">开始阅读</van-tabbar-item>
			<van-tabbar-item name="xia"><span class="jian">↓</span>下载</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import "../assets/less/detail.less"

	export default {
		data() {
			return {
				bookName: '',
				value: 5,
				// 读者的数据
				readerData: "",
				// 书籍的详情
				bookDetail: "",
				isActive: false,
				active: "kai",
				shuYuanId: '',
				link: ''
			};
		},
		created() {
			this.startDetail();
			this.bookStart();
			console.log(this.$route.query)
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
			jian() {
				this.isActive = !this.isActive
			},
			// 详情开始
			startDetail() {
				let _id = this.$route.query.bookId;
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-info/" + _id,
					})
					.then((result) => {
						if (result.status === 200) {

							// 评分保留一位小数
							result.data.rating.score = result.data.rating.score.toFixed(1);
							this.readerData = result.data.rating;

							result.data.cover = 'https://statics.zhuishushenqi.com' + result.data.cover

							// 7日人气大于4位数则改为以万为单位
							result.data.latelyFollower = result.data.latelyFollower.toString();
							let latelyLen = result.data.latelyFollower.length;
							if (latelyLen > 4) {
								result.data.latelyFollower =
									result.data.latelyFollower.slice(0, latelyLen - 4) +
									"." +
									result.data.latelyFollower.substr(latelyLen - 4, 1) +
									"万";
							}

							// 总人气大于4位数则改为以万为单位
							result.data.totalFollower = result.data.totalFollower.toString();
							let totalLen = result.data.totalFollower.length;
							if (totalLen > 4) {
								result.data.totalFollower =
									result.data.totalFollower.slice(0, totalLen - 4) +
									"." +
									result.data.totalFollower.substr(totalLen - 4, 1) +
									"万";
							}

							// 多少字数
							result.data.wordCount = result.data.wordCount.toString();
							let wordLen = result.data.wordCount.length;
							if (wordLen > 4) {
								result.data.wordCount =
									result.data.wordCount.slice(0, wordLen - 4) + "万";
							}

							this.bookDetail = result.data;

						}
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			// 书籍源
			bookStart() {
				let _id = this.$route.query.bookId;
				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
					duration: 0,
					loadingType: "spinner",
				});

				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-sources",
						params: {
							view: 'summary',
							book: _id
						}
					})
					.then((result) => {
						this.$toast.clear();
						this.shuYuanId = result.data[0]._id;
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			// 进入章节列表页面
			goList() {
				let shuYuanId = this.shuYuanId;
				this.$router.push({
					name: 'CatalogList',
					query: {
						_id: shuYuanId,
						bookName: this.bookDetail.title
					}
				})
			},

			// 加入书架
			addBookshelf() {
				let bookid = this.$route.query.bookId;
				this.$toast.loading({
					message: '加载中...',
					//防止穿透
					forbidClick: true,
					//显示时间, 如果时间为0，则不会自动关闭
					duration: 0,
					loadingType: 'spinner'
				})
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-chapters/" + this.shuYuanId,
					})
					.then((result) => {
						let link = result.data.chapters[0].link;
						this.axios({
							method: 'get',
							url: 'http://www.linkk.asia:10001/user/addBookshelf',
							params: {
								token: localStorage.getItem('token'),
								bookid,
								shuYuanId: this.shuYuanId,
								link
							}
						}).then(result => {
							this.$toast.clear();
							if (result.data.code == 200) {
								this.$toast('加入书架成功');
							} else {
								this.$toast(result.data.msg);
							}
						}).catch(err => {this.$toast.clear();});
					})
					.catch((err) => {this.$toast.clear();});
			},

			// 开始阅读
			startRead() {
				// 开启加载提示
				this.$toast.loading({
					message: '加载中...',
					//防止穿透
					forbidClick: true,
					//显示时间, 如果时间为0，则不会自动关闭
					duration: 0,
					loadingType: 'spinner'
				})

				let title = this.bookDetail.title;


				if (!localStorage.getItem("read_chapter_" + this.shuYuanId)) {
					localStorage.setItem("read_chapter_" + this.shuYuanId, 0);
				}
				let index = localStorage.getItem("read_chapter_" + this.shuYuanId);
				// 获取书籍列表
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-chapters/" + this.shuYuanId,
					})
					.then((result) => {
						this.$toast.clear();

						let bookName = this.bookDetail.title;
						let shuYuanId = this.shuYuanId;
						let link = result.data.chapters[index].link;
						this.$router.push({
							path: '/reader',
							query: {
								link,
								shuYuanId,
								index,
								title,
								bookName,
								_id: shuYuanId,
							}
						});
					})
					.catch((err) => {
						this.$toast.clear();
					});

			}
		},
	};
</script>

<style lang="less" scoped>
</style>
