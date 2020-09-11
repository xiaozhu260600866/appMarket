<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pro-list">
			<view class="info-header bg-f">
				<view class="ih-item ptb8" @click="goto('/pages/user/integral/count/main')">
					<view class="num lh-20 mb3 main-color fs-18 Arial">{{data.integral}}</view>
					<view class="name fs-13">我的积分</view>
				</view>
				<view class="ih-item ptb8" @click="goto('/pages/user/integral/lists/main')">
					<view class="num lh-20 mb3 main-color iconfont icon-intergral-record fs-20"></view>
					<view class="name fs-13">兑换记录</view>
				</view>
			</view>
			<view class="porducts">
				<view class="pro-div" v-for="item in data.lists.data">
					<view @click="goto('/pages/integral/show/main?id='+item.id)" class="pro-box">
						<view class="cms_cover">
							<image :src="item.firstCover" mode="aspectFill" class="image"/>
						</view>
						<view class="cms_title Aname fs-15 nowrap">{{item.name}}</view>
						<view class="cms_price">
							<view class="saleprice fs-16">{{item.integral}}<span class="fs-12 fc-9 ml3"> 积分</span></view>
						</view>
					</view>
				</view>
				<hasMore :parentData="data"></hasMore>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/integral/lists?type=0',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName()
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>