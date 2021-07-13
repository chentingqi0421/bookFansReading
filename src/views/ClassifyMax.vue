<template>
	<div class="classify-max">
		<van-nav-bar :fixed="true" title="分类" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
		<van-tabs v-model="active">
			<van-tab v-for="(classitem) in classify" :title="classitem.title">
				<div class="book-box clearfix">
					<div class="book-item fl clearfix" :class="[index % 2 == 0 ? 'book-left' : 'book-right']" v-for="(item, index) in BookClassData[classitem.gender]"
					 :key="index" @click="bookChildren({gender:classitem.gender,item})">
						<div class="info fl">
							<div class="info-title">{{ item.name }}</div>
							<div class="info-tags">{{ item.bookCount }} 本</div>
						</div>
						<div class="imgPic fr">
							<!-- {{item.bookCover}}    -->
							<img v-for="(cover,i) in item.bookCover" :key="i" :src="cover" alt="" />
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import "../assets/less/classifyMax.less"
	
	export default {
		data() {
			return {
				active: 0,
				classify: [{
						title: '男生',
						gender: 'male'
					},
					{
						title: '女生',
						gender: 'female'
					},
					{
						title: '出版',
						gender: 'press'
					},
					{
						title: '漫画',
						gender: 'picture'
					}
				],
				BookClassData: {},
			};
		},
		created() {
			this.bookFather();
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
			//   书籍父分类
			bookFather() {
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/categories",
					})
					.then((result) => {
						if (result.status == 200) {

							// 
							for (let key in result.data) {
								// 
								for (let i = 0; i < result.data[key].length; i++) {
									// 
									for (let j = 0; j < result.data[key][i].bookCover.length; j++) {
										result.data[key][i].bookCover[j] = 'https://statics.zhuishushenqi.com' + result.data[key][i].bookCover[j]
									}
								}
							}
							this.BookClassData = result.data;

						}
					})
					.catch((err) => {});
			},
			bookChildren(data) {
				console.log(data);
				this.$router.push({
					path: '/classifymin',
					query: {
						gender: data.gender,
						major: data.item.name
					}
				})
			},

		},
	};
</script>

<style lang="less" scoped>
</style>
