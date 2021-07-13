<template>
	<div class="ranking">
		<van-nav-bar :fixed="true" title="排行" right-text="书城" left-text="返回" left-arrow @click-left="goBack" @click-right="goHome"></van-nav-bar>

		<div class="tab-box">
			<van-tabs v-model="activeName" @change="showGirl">
				<van-tab title="男频" name="a">
					<div class="container-box">
						<div class="left-nav" ref="boyLeftNav">
							<ul>
								<li class="ranking-list-item" v-for="(item, index) in rankCataData.male" :key="index" @click="cPaiList(item._id)"
								 :class="[item._id == tabListID.male ? 'active' : '']">
									<span class="ranking-list-item-text">{{
                    item.shortTitle
                  }}</span>
								</li>
							</ul>
						</div>

						<div class="ranking-container" ref="boyCon">
							<div class="ranking-container-ul">
								<div class="ranking-container-list" v-for="(item, index) in rankConData.male" :key="index" @click="goDetail(item._id)">
									<img :src="item.cover" alt="" />
									<div class="ranking-detail">
										<h4>{{ index + 1 }}.{{ item.title }}</h4>
										<p class="ranking-describe">
											{{ item.shortIntro }}
										</p>
										<p class="sku">
											<span class="book-author"> {{ item.author }} </span>
											<span class="book-class">{{ item.minorCate }}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="女频" name="b">
					<div class="container-box">
						<div class="left-nav">
							<ul>
								<li class="ranking-list-item" v-for="(item, index) in rankCataData.female" :key="index" @click="cPaiList(item._id)"
								 :class="[item._id == tabListID.female ? 'active' : '']">
									<span class="ranking-list-item-text">{{
                    item.shortTitle
                  }}</span>
								</li>
							</ul>
						</div>

						<div class="ranking-container" ref="girlCon">
							<div class="ranking-container-ul">
								<div class="ranking-container-list" v-for="(item, index) in rankConData.female" :key="index" @click="goDetail(item._id)">
									<img :src="item.cover" alt="" />
									<div class="ranking-detail">
										<h4>{{ index + 1 }}.{{ item.title }}</h4>
										<p class="ranking-describe">
											{{ item.shortIntro }}
										</p>
										<p class="sku">
											<span class="book-author"> {{ item.author }} </span>
											<span class="book-class">{{ item.minorCate }}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="出版" name="c">
					<div class="container-box">
						<div class="left-nav" ref="pressLeftNav">
							<ul>
								<li class="ranking-list-item" v-for="(item, index) in rankCataData.epub" :key="index" @click="cPaiList(item._id)"
								 :class="[item._id == tabListID.epub ? 'active' : '']">
									<span class="ranking-list-item-text">{{
                    item.shortTitle
                  }}</span>
								</li>
							</ul>
						</div>

						<div class="ranking-container" ref="pressCon">
							<div class="ranking-container-ul">
								<div class="ranking-container-list" v-for="(item, index) in rankConData.epub" :key="index" @click="goDetail(item._id)">
									<img :src="item.cover" alt="" />
									<div class="ranking-detail">
										<h4>{{ index + 1 }}.{{ item.title }}</h4>
										<p class="ranking-describe">
											{{ item.shortIntro }}
										</p>
										<p class="sku">
											<span class="book-author"> {{ item.author }} </span>
											<span class="book-class">{{ item.minorCate }}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>

	</div>
</template>

<script>
	import "../../assets/less/rank.less";
	import BScroll from "better-scroll";

	export default {
		data() {
			return {
				activeName: "a",

				// 排名分类
				rankCataData: "",
				// 排名详情
				rankConData: {
					male: '',
					female: '',
					epub: '',
				},
				// 排名列表的id，对应高亮
				tabListID: {
					male: "",
					female: "",
					epub: "",
				},
			};
		},
		created() {
			this.paiClass();
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
			//   获取排名分类列表
			paiClass() {
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/rank-category",
					})
					.then((result) => {
						if (result.status === 200) {
							// 
							this.rankCataData = result.data;

							for (let key in this.rankCataData) {
								// 
								this.tabListID[key] = this.rankCataData[key][0]._id;
								// 
								this.rankDetail(this.rankCataData[key][0]._id, key)
							}
						}
					})
					.catch((err) => {

					});
			},

			// 初始化排名的详情
			rankDetail(_id, key) {
				// 
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/rank/" + _id,
					})
					.then((result) => {
						// 
						if (result.status == 200) {
							for (let i = 0; i < result.data.ranking.books.length; i++) {
								result.data.ranking.books[i].cover = 'https://statics.zhuishushenqi.com' + result.data.ranking.books[i].cover
							}
							// 使排行列表 和 排行详情内容可以滑动
							this.showGirl('a')
							this.rankConData[key] = result.data.ranking.books;

						}
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			// 切换男频、女频、出版，使列表可以滑动
			showGirl(name) {
				this.$nextTick(() => {
					if (name === 'a') {

						if (!this.rankingList) {
							this.rankingList = new BScroll(this.$refs.boyLeftNav, {
								click: true,
							});
						} else {
							this.rankingList.refresh(); //刷新自身,重新计算内部元素的高度
						}

						if (!this.boyConScroll) {
							this.boyConScroll = new BScroll(this.$refs.boyCon, {
								click: true,
							});
						} else {
							this.boyConScroll.refresh(); //刷新自身,重新计算内部元素的高度
						}
					}

					if (name === "b") {
						if (!this.girlConScroll) {
							this.girlConScroll = new BScroll(this.$refs.girlCon, {
								click: true,
							});
						} else {
							this.girlConScroll.refresh(); // 刷新自身，重新计算内部元素的高度
						}
					}
					if (name === "c") {
						if (!this.pressConScroll) {

							this.pressConScroll = new BScroll(this.$refs.pressCon, {
								click: true,
							});
						} else {
							this.pressConScroll.refresh(); //刷新自身,重新计算内部元素的高度
						}
					}
				});
			},

			/* 改变榜单列表 */
			cPaiList(ind) {
				// 禁止排行榜列表重复点击
				for (let key in this.tabListID) {
					if (this.tabListID[key] == ind) {

						return;
					}
				}

				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/rank/" + ind + "",
					})
					.then((result) => {
						if (result.status === 200) {

							let containerData = result.data.ranking.books;

							for (let i = 0; i < containerData.length; i++) {
								containerData[i].cover =
									"https://statics.zhuishushenqi.com" + containerData[i].cover;
							}
							// 循环排名详情，改变tabListID和rankConData(排名详情的内容)
							for (let key in this.rankConData) {
								// 
								if (result.data.ranking.gender == key) {
									this.rankConData[key] = result.data.ranking.books;
									this.tabListID[key] = ind;

									this.showGirl(key)
								}
							}
							// 判断点击的是男频还是女频还是出版，来改变滑动的距离
							if (result.data.ranking.gender === 'male') {
								this.showGirl('a')
							} else if (result.data.ranking.gender === 'female') {
								this.showGirl('b')
							} else {
								this.showGirl('c')
							}

						}
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			// 点击进入详情页面
			goDetail(bookId) {

				this.$router.push({
					name: "Detail",
					query: {
						bookId
					}
				});
			},
		},
		beforeDestory() {
			// BScroll不属于Vue，他是一个有副作用的DOM操作，所以当前组件被卸载时请回收该实例
			if (this.rankingList) {
				this.rankingList.destory();
			}
			if (this.boyConScroll) {
				this.boyConScroll.destory();
			}
			if (this.girlConScroll) {
				this.girlConScroll.destory();
			}
			if (this.pressLeftNavList) {
				this.pressConScroll.destory();
			}
		},

	};
</script>

<style lang="less" scoped>
</style>
