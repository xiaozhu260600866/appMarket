<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pro-list">
			<view class="count-header main-bg">
				<view class="name fs-18 fc-white">我的积分</view>
				<view class="count-num Arial">{{data.integral}}</view>
				<view @click="goto('/pages/user/integral/lists/main',1)" class="record fs-14 fc-white">明细</view>
			</view>
			<view class="list-group block-sec mb0">
				<dx-list-cell arrow name="我的订单" imgSrc="https://boss.doxinsoft.com/images/app/orderlist.png" imgWidth="20" imgHeight="20" imgR="6"
				 @click="goto('/pages/user/integral/order/lists/main?status=3&historyUrl=del',1)"></dx-list-cell>
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
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{
			dxListCell
		},
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