<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <view class="m50 text-center fs-14 fc-9">暂无数据</view> -->
			<dx-tabs :tabs="navbar" v-model="status" @change="ajax" selectedColor="#57C734" sliderBgColor="#57C734" size="30"></dx-tabs>
			<view class="coupon-list p10">
				<view class="list_item mb10 bg-f" v-for="v in data.lists.data">
					<view class="item_left">
						<view class="price fs-26 h-50 fw-bold"><span class="fs-14">￥</span>{{v.amount}}</view>
						<view class="condition fs-12 fc-9">满<text class="Arial">{{v.full_amount}}</text>元可用</view>
					</view>
					<view class="item_right bd-le plr10">
						<view class="w-b100 coupon-title fs15 lh-20 wrap2">{{ v.name }}</view>
						<view class="w-b100 ir-bottom">
							<view class="time fs-12 fc-9 lh-16 Arial">{{ v.start_at }}至{{ v.end_at }}</view>
						</view>
					</view>
					<view class="status">
						<view class="nav yes" v-if="v.status == 0">可使用</view>
						<view class="nav no" v-if="v.status == 1">已使用</view>
						<view class="nav no" v-if="v.status == 2">已过期</view>
					</view>
				</view>
				<hasMore :parentData="data" source="nodata" message="暂无优惠券"></hasMore>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			dxTabs
		},
		data() {
			return {
				formAction: '/user/couponOrderLists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 0,
				navbar:[
					{value: 0,name: '可用'},
					{value: 1,name: '已用'},
					{value: 2,name: '已过期'},
				]
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
					status:this.status
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			this.ajax();
			
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
		
	}
</script>
<style scoped="">
@import url('index.css');
</style>