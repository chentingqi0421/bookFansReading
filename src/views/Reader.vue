<template>
	<div class="reader" :style="{background: userSet.background}">
		<!-- 整个大页面 -->
		<div class="textCon" @click="setRead($event)" :style="{color: userSet.color}">
			<!-- 提示如何翻页,遮罩层把页面分为3个部分 -->
			<div class="bootPage" @click="removeNewUser" v-if="isNewUser===0">
				<div class="b-item bootPage-left">
					<div class="center">
						<span>点击左侧翻页</span>
					</div>
				</div>
				<div class="b-item bootPage-center">
					<div class="center">
						<span>点击中间,菜单</span>
					</div>
				</div>
				<div class="b-item bootPage-right">
					<div class="center">
						<span>点击右侧翻页</span>
					</div>
				</div>
			</div>
			<!-- 小说内容页面 -->
			<div class="read-box">
				<div class="read-content">

					<section class="read-section" :style="styleObject">
						<div class="read-inner" :style="{fontSize: userSet.fontSize+'px'}" ref="bookInner">
							<h3>{{title}}</h3>
							<p v-for="(item, index) in novelData" :key="index">{{ item }}。</p>
						</div>
					</section>
				</div>
				<p class="read-page">{{pageNum}} / {{pageAllNum}}</p>
			</div>
		</div>

		<!-- 上一章下一章  点击出现的遮罩层  点击当前遮罩层，让改遮罩层隐藏起来-->
		<div class="control-box" v-show="isMenu" @click="yinCang">
			<div class="header">
				<div class="left" @click="goBack">
					<i class="van-icon van-icon-arrow-left" style="font-size: 22px;"></i>
					<span>{{xiaoShuoMing}}</span>
				</div>
				<div class="right">
					<i class="van-icon van-icon-friends" @click="goMy"></i>
					<i class="van-icon van-icon-wap-home" @click="goHome"></i>
					<i class="van-icon van-icon-column"></i>
					<i class="van-icon van-icon-weapp-nav"></i>
				</div>
			</div>
			<div class="footer">
				<div class="footer-box1">
					<div class="footer-box1-item"><span @click.stop="fontSet('reduce')">Aa-</span></div>
					<div class="footer-box1-item"><span @click.stop="fontSet('add')">Aa+</span></div>
				</div>
				<div class="footer-eye">
					<span v-for="(item,index) in pattern" :key="index" @click="selectColor(item)">{{item.item}}</span>
				</div>
				<div class="footer-catalog">
					<span @click="huanZhang('prev')">上一张（章）</span>
					<span @click="toCatalog">目录</span>
					<span @click="huanZhang('next')">下一张（章）</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import "../assets/less/reader.less"

	export default {
		data() {
			return {
				id: '',
				bookName: '',
				xiaoShuoMing: '',
				active: "kai",
				title: "",
				novelData: "",
				zhangList: "",
				// 书源的ID
				shuYuanId: '',
				index: 0,
				// 判断是否为新用户
				isNewUser: 0,
				// 读者模式设置
				pattern: [{
					item: '默认',
					color: '#5c5d58',
					background: '#eee6dd'
				}, {
					item: '夜间',
					color: '#888',
					background: '#000'
				}, {
					item: '护眼',
					color: '#5c5d58',
					background: '#c8e8c8'
				}],
				// 用户设置
				userSet: {
					fontSize: 18,
					fontColor: '#5c5d58',
					background: '#eee6dd',
					readePattern: 0,
				},
				// 页数
				pageAllNum: 1,
				pageNum: 1,
				styleObject: '',
				// 菜单页的显示隐藏
				isMenu: false,
			};
		},
		created() {
			this.id = this.$route.query._id;
			this.bookName = this.$route.query.bookName;
			console.log(this.$route.query);
			this.getNewUser();
			this.startNovel();
			this.startList();
			this.getUserLocalStorage();
		},
		updated() {
			this.setPaging();
		},
		methods: {
			bookMark() {
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-chapters/" + this.shuYuanId,
					})
					.then((result) => {
						console.log(this.index)
						console.log(result.data)
						console.log(result.data.chapters[this.index].link)
						let link = result.data.chapters[this.index].link;
						let order = this.index + 1;
						let shuYuanId = result.data._id;
						this.axios({
								method: "GET",
								url: "http://www.linkk.asia:10001/user/upBookmark",
								params:{
									token:localStorage.getItem('token'),
									link,
									order,
									shuYuanId,
								}
							})
							.then((result) => {
								console.log(result.data);
							})
							.catch((err) => {});
					})
					.catch((err) => {});
			},
			goHome() {
				this.bookMark();
				this.$router.push({
					name: "Home"
				});
			},
			goBack() {
				this.bookMark();
				this.$router.go(-1);
				// upBookmark
			},
			// 进入我的界面
			goMy() {
				this.bookMark();
				this.$router.push({
					name: "My"
				});
			},
			/* 获取是否为新用户，新用户的则需要引导页 */
			getNewUser() {
				let localShelf = JSON.parse(window.localStorage.getItem('isNewUser')) ? JSON.parse(window.localStorage.getItem(
					'isNewUser')) : {};
				if (localShelf.isNewUser) {
					this.isNewUser = localShelf.isNewUser
				} else {
					this.isNewUser = 0;
				}
			},
			/* 取消新用户 */
			removeNewUser() {
				let localShelf = {
					isNewUser: 1
				};
				this.isNewUser = 1;
				window.localStorage.setItem('isNewUser', JSON.stringify(localShelf))
			},

			/* 获取用户设置 */
			getUserLocalStorage() {
				let localShelf = JSON.parse(window.localStorage.getItem('userSet')) ? JSON.parse(window.localStorage.getItem(
					'userSet')) : '';
				if (localShelf == '') {
					return;
				}
				this.userSet.fontSize = localShelf.fontSize;
				this.userSet.background = localShelf.background;
				this.userSet.fontColor = localShelf.color;
				this.userSet.readePattern = localShelf.readePattern;
				this.userSet.pagingPattern = localShelf.pagingPattern;

				let novelBg = JSON.parse(window.localStorage.getItem('novelBg'));
				if (novelBg) {

					this.selectColor(novelBg)
				}
			},
			/* 用户设置字体 */
			setUserLocalStorage() {
				let localShelf = {}
				localShelf = {
					fontSize: this.userSet.fontSize,
					background: this.userSet.background,
					color: this.userSet.fontColor,
					readePattern: this.userSet.readePattern,
					pagingPattern: this.userSet.pagingPattern,
				};
				window.localStorage.setItem('userSet', JSON.stringify(localShelf));
			},

			// 获取bookInner的值
			setPaging() {

				this.$nextTick(function() {
					let scrollW = this.$refs.bookInner.scrollWidth;
					let clientW = this.$refs.bookInner.clientWidth;
					// 
					// 
					this.pageAllNum = Math.floor(scrollW / clientW);

				})

			},
			//字体设置
			fontSet(str) {
				// this.option = true;
				if (str === 'reduce') {
					if (this.userSet.fontSize <= 12) {
						return
					} else {
						this.userSet.fontSize -= 0.8
						// this.setUserLocalStorage()
					}
				}
				if (str === 'add') {
					if (this.userSet.fontSize >= 24) {
						return
					} else {
						this.userSet.fontSize += 0.8
						// this.setUserLocalStorage()
					}
				}

				this.setUserLocalStorage()

			},
			/* 左右滑动 */
			setRead(e) {
				let clWidth = document.documentElement.clientWidth || document.body.clientWidth;
				let currentX = e.pageX;
				let offsetX = clWidth / 3;
				if (currentX < offsetX) { //用户点击左侧三分之一

					this.pageNum--;
					if (this.pageNum <= 0) {


						// 调用上一章函数
						this.huanZhang('prev');

						// 调用获取上一章的bookIner值来计算他的宽度
						this.setPaging()
						this.pageNum = 1;


						this.styleObject = {
							transform: 'translateX(' + (this.pageNum - 1) * -100 + 'vw' + ')',
							transitionDuration: '0s'
						};
					} else {
						this.styleObject = {
							transform: 'translateX(' + (this.pageNum - 1) * -100 + 'vw' + ')',
							transitionDuration: '0.5s'
						};
					}

				} else if (offsetX <= currentX && currentX <= offsetX * 2) { //点击中间三分之一的时候

					this.isMenu = true;
				} else if (currentX > offsetX * 2 && currentX <= clWidth) { //用户点击右侧三分之一

					this.pageNum++;


					if (this.pageNum > this.pageAllNum) {

						// 调用下一章函数
						this.huanZhang('next');

						this.pageNum = 1;
						this.styleObject = {
							transform: 'translateX(' + (this.pageNum - 1) * -100 + 'vw' + ')',
							transitionDuration: '0s'
						};
					} else {
						this.styleObject = {
							transform: 'translateX(' + (this.pageNum - 1) * -100 + 'vw' + ')',
							transitionDuration: '0.5s'
						};
					}
				}
			},

			startNovel() {
				let novelName = this.$route.query.title;
				this.xiaoShuoMing = novelName;

				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
					duration: 0,
					loadingType: "spinner",
				});
				this.index = Number(this.$route.query.index);

				let link = this.$route.query.link;
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/chapters/" + encodeURIComponent(link),
					})
					.then((result) => {
						if (result.status === 200) {
							this.$toast.clear();

							this.novelData = result.data.chapter.cpContent.split("。");
							//   头部标题部分
							this.title = result.data.chapter.title;
						}
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			startList() {

				this.shuYuanId = this.$route.query.shuYuanId;
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/book-chapters/" + this.shuYuanId,
					})
					.then((result) => {

						this.zhangList = result.data.chapters;
						this.lookNovel(this.index);
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},

			huanZhang(huo) {
				document.documentElement.scrollTop = 0;
				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
					duration: 0,
					loadingType: "spinner",
				});

				if (huo == "prev") {
					this.index--;

				} else {
					this.index++;

				}

				if (this.index < 0) {
					this.index = 0;
					this.$toast('已经是第一章了');
					return;
				}

				let link = this.zhangList[this.index].link;
				// let shuYuanId = this.$route.query.shuYuanId;
				localStorage.setItem("read_chapter_" + this.shuYuanId, this.index);
				this.axios({
						method: "GET",
						url: "http://novel.kele8.cn/chapters/" + encodeURIComponent(link),
					})
					.then((result) => {
						this.$toast.clear()

						this.novelData = result.data.chapter.cpContent.split("。");

						//   头部标题部分
						this.title = result.data.chapter.title;

						this.lookNovel(this.index);
					})
					.catch((err) => {
						this.$toast.clear();
					});
			},
			// 记录自己看到第几章小说
			lookNovel(index) {
				// let shuYuanId = this.$route.query.shuYuanId;
				// 设置该书读到第几章
				localStorage.setItem("read_chapter_" + this.shuYuanId, index);
				// 判断该书是否存在于该收藏夹
				if (!localStorage.getItem("weibooks")) {

					return;
				} else {

					let bookCardData = JSON.parse(localStorage.getItem("weibooks"));
					// 循环书架
					for (let i = 0; i < bookCardData.length; i++) {
						// 如果书架存在该书籍  就让当前书旗提升到收藏顶部
						if (bookCardData[i].shuYuanId == this.shuYuanId) {
							let jiechu = bookCardData.splice(i, 1);

							jiechu[0].chapterIndex = index;
							jiechu[0].pageNum = 1;
							bookCardData.push(jiechu[0])
							localStorage.setItem("weibooks", JSON.stringify(bookCardData));
						}
					}
				}

			},

			// 获取小说的页数

			yinCang() {
				this.isMenu = false
			},

			// 选择颜色
			selectColor(item) {

				// let novelBg = item;
				localStorage.setItem('novelBg', JSON.stringify(item))
				this.userSet.background = item.background;
				this.userSet.color = item.color;
			},

			toCatalog() {
				console.log()
				this.$router.push({
					path: '/cataloglist',
					query: {
						_id: this.id,
						bookName: this.bookName
					}
				})
			},

		},
	};
</script>

<style lang="less" scoped>
</style>
