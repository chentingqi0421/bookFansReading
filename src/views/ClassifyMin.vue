<template>
	<div class="classify-min">
		<van-nav-bar :fixed="true" :title="title" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
		<div class="book" v-for="(book) in booksData" @click="detail(book)">
			<div class="book-img">
				<img :src="'https://statics.zhuishushenqi.com'+book.cover" alt="">
			</div>
			<div class="book-txt">
				<div class="book-title">{{book.title}}</div>
				<div class="book-dsc">{{book.shortIntro}}</div>
			</div>
		</div>
		<div>
			<center @click="upBooksData">加载更多</center>
		</div>
	</div>
</template>

<script>
	import "../assets/less/classifyMin.less"
	
	export default {
		data() {
			return {
				title: '',
				active: 0,
				classifyData: {
					gender: '',
					type: 'hot',
					major: '',
					minor: '',
					start: 0,
					limit: 10
				},
				booksData: [],
			};
		},
		created() {
			this.classifyData.gender = this.$route.query.gender;
			this.classifyData.major = this.$route.query.major;
			this.title = this.$route.query.major;
			this.getBooksData();
			this.getBooksData();
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
			upBooksData() {
				this.classifyData.limit += 10;
				this.getBooksData();
			},
			getBooksData() {
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/category-info",
						params: {
							gender: this.classifyData.gender,
							type: this.classifyData.type,
							major: this.classifyData.major,
							minor: this.classifyData.minor,
							start: this.classifyData.start,
							limit: this.classifyData.limit
						}
					})
					.then((result) => {
						if (result.status == 200) {
							console.log(result.data.books)
							this.booksData = result.data.books;
						}
					})
					.catch((err) => {});
			},
			detail(book) {
				console.log(book._id)
				this.$router.push({
					path: '/detail',
					query: {
						bookId: book._id,
					}
				})
			},
		},
	};
</script>

<style lang="less" scoped>
</style>
