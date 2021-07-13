<template>
	<div id="app">
		<!-- 路由插座 -->
		<router-view />
	</div>
</template>

<script src="./assets/js/api.js">
</script>
<script>
	export default {
		
	}
</script>

<style lang="less">
	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.clearfix::after {
		content: "";
		display: block;
		clear: both;
	}

	.auto-img {
		width: 100%;
		display: block;
	}

	.one-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	#app {
		padding-top: 46px;
		padding-bottom: 50px;

		/deep/ .van-nav-bar {
			background-color: #b83320;

			.van-icon-arrow-left,
			.van-nav-bar__text,
			.van-nav-bar__title {
				color: #fff;
			}
		}

		.van-nav-bar__title {
			height: 46px;
			line-height: 46px;
			width: 100%;
			max-width: 60%;
			// font-size: 16px;
			letter-spacing: 3px;
		}

		/deep/.van-ellipsis {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
