<template>
	<div class="catalogList">
		<van-nav-bar :fixed="true" :title="title" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>
		<van-collapse v-model="activeNames" accordion>
			<van-collapse-item v-for="(item,index) in items" :title="item.title" :name="index">
				<van-cell v-for="(cell) in item.data" :title="cell.title" @click="toReader(cell.link,cell.order)" />
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				title: '',
				activeNames: [0],
				type: '',
				indexArr: [],
				items: [],
			};
		},
		created() {
			this.title = this.$route.query.bookName;
			this.id = this.$route.query._id;
			this.onLoad();
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

			onLoad() {
				console.log(this.id)
				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
					duration: 0,
					loadingType: "spinner",
				});
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-chapters/" + this.id,
					})
					.then((result) => {
						this.$toast.clear();
						var num = parseInt(result.data.chapters.length / 100);
						var count = 0;
						this.indexArr.push('第1章~第100章');
						this.items[0] = {};
						this.items[0].data = [];
						this.items[0].min = 1;
						this.items[0].max = 100;
						this.items[0].title = '第1章~第100章';
						for (var i = 1; i < num; i++) {
							count += 100;
							this.items[i] = {};
							this.items[i].data = [];
							this.items[i].min = 1 + count;
							this.items[i].max = 100 * (i + 1);
							this.items[i].title = `第${1+count}章~第${100*(i+1)}章`;
							var str = `第${1+count}章~第${100*(i+1)}章`;
							this.indexArr.push(str);
						}
						this.indexArr.push(`第${101+count}章之后`);
						this.indexArr.map((e, i) => {
							if (i == this.indexArr.length - 1) {
								this.items[i] = {};
								this.items[this.indexArr.length - 1].data = [];
								this.items[this.indexArr.length - 1].min = 101 + count;
								this.items[this.indexArr.length - 1].title = `第${101+count}章之后`;
							}
						})

						result.data.chapters.map((chapter) => {
							this.items.map((item) => {
								if (chapter.order > item.min - 1 && chapter.order <= item.max) {
									item.data.push(chapter);
								}
							})
							if (chapter.order >= (100 + count)) {
								this.items[this.items.length - 1].data.push(chapter);
							}
						})

						this.items = [...this.items];

					})
					.catch((err) => {
						this.$toast.clear();
					});
			},
			toReader(link,order) {
				this.$router.push({
					path:'/reader',
					query:{
						shuYuanId:this.id,
						index:order - 1,
						title:this.bookName,
						link:link,
						_id:this.id,
						bookName:this.bookName
					}
				})
			}

		},
	};
</script>

<style lang="less" scoped>
</style>
