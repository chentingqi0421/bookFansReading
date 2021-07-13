<template>
	<div class="search">
		<van-nav-bar :fixed="true" title="搜索" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>

		<!-- 小说搜索部分 -->
		<div class="nav">
			<div class="nav-s">
				<van-search v-model="value" show-action placeholder="请输入小说名" shape="round" autofocus="true" @search="onSearch"
				 @input=confirmSearch()>
					<template #action>
						<div @click="onSearch">搜索</div>
					</template>
				</van-search>
			</div>
		</div>

		<!-- 搜索热词部分 -->
		<div class="content">
			<div class="hot">
				<div class="hot-head clearfix">
					<div class="hot-title fl">搜索热词</div>
					<div class="hot-more fr" @click="randomArr">
						<span>换一批</span>
						<span>
							<van-icon name="replay" />
						</span>
					</div>
				</div>
				<ul class="hot-label clearfix">
					<li v-for="(item, index) in hotwords" @click="sHot(item.word)" :key="index">
						{{ item.word }}
					</li>
				</ul>
			</div>
		</div>

		<!-- 搜索历史 -->
		<div class="history-box">
			<div class="history-head clearfix">
				<div class="history-title fl">搜索历史</div>
				<div class="history-right fr clearfix">
					<div class="fl history-text" @click="removeRecord">删除历史</div>
					<div class="fr history-icon">
						<van-icon name="delete" />
					</div>
				</div>
			</div>
			<ul class="history-label clearfix">
				<li v-for="(item, index) in searchHistory" :key="index">
					{{ item.title }}
				</li>
			</ul>
		</div>

		<!-- 小说列表部分 -->
		<ul class="search-list" v-show="iShow">
			<li v-for="(item,index) in searchListData" :key="index" @click="cList(item)">
				<van-icon name="orders-o" />
				{{item.title}}
			</li>
		</ul>
	</div>
</template>

<script>
	import "../../assets/less/search.less";

	export default {
		data() {
			return {
				value: "",
				allSearchData: "",
				hotwords: "",
				// 搜索热词的数量
				length: 8,
				searchListData: [],
				iShow: false,
				searchHistory: []
			};
		},

		created() {
			if (localStorage.getItem('searchHistory') == null) {
				localStorage.setItem('searchHistory', JSON.stringify({
					data: []
				}));
			}
			this.searchWord();
			this.upRecord();
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
			/* 搜索热词 */
			onSearch() {
				this.$router.push({
					name: 'Relevant',
					query: {
						title: this.value,
					}
				});
				var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

				let bool = true;
				for (let i = 0; i < searchHistory.data.length; i++) {
					if (searchHistory.data[i].title == this.value) {
						bool = false;
						break;
					}
				}
				if (bool) {
					searchHistory.data.push({
						title: this.value
					});
					localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
					this.upRecord();
				}
			},
			searchWord() {
				// 
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/search-hotwords",
					})
					.then((result) => {
						// 
						let arrWord = [];
						this.allSearchData = result.data.searchHotWords;
						for (var i = 0; i < this.length; i++) {
							arrWord.push(this.allSearchData[i]);
						}
						this.hotwords = arrWord;
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},
			/* 换一批 */
			randomArr() {
				this.allSearchData.sort(function() {
					return Math.random() - 0.5;
				});
				let arrWord = [];
				for (var i = 0; i < this.length; i++) {
					arrWord.push(this.allSearchData[i]);
				}
				this.hotwords = arrWord;
			},

			/* 搜索内容 */
			confirmSearch() {
				if ((this.value) == '') {
					this.iShow = false;
					return
				}
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/search",
						params: {
							keyword: this.value,
						},
					})
					.then((result) => {
						this.iShow = true;

						let length = result.data.books.length > 10 ? 10 : result.data.books.length;
						this.searchListData = [];
						for (let i = 0; i < length; i++) {
							this.searchListData.push(result.data.books[i])
						}

					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			// 点击列表渲染数据
			cList(item) {

				this.$router.push({
					name: 'Relevant',
					query: {
						title: item.title
					}
				})
			},

			sHot(hotWord) {

				this.value = hotWord;
				this.confirmSearch();
			},

			upRecord() {
				 this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')).data;
			},
			removeRecord() {
				localStorage.setItem('searchHistory', JSON.stringify({
					data: []
				}));
				this.searchHistory = [];
			}

		},
		components: {},
	};
</script>
