<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- <view class="m50 text-center fs-14 fc-9">暂无数据</view> -->
		<div class="coupon-list p10">
			<div class="list_item mb10 bg-f" v-for="v in couponLists">
				<div class="item_left fc-white">
					<p class="price fs-36 fc-white h-50 mt20 fw-bold"><span class="fs-14">￥</span>{{v.amount}}</p>
					<p class="condition fs-12" v-if="v.type == 0">满{{v.full_amount}}元可用</p>
					<p class="condition fs-12" v-else>限指定商品可用</p>
				</div>
				<div class="item_right bd-e p10">
					<p class="w-b100 coupon-title fs15 lh-20 wrap2">{{ v.name }}</p>
					<div class="w-b100 ir-bottom flex-between">
						<p class="time fs-12 fc-9 lh-16">{{ v.start_date }} ~ {{ v.end_date }}</p>
						<a class="state fs-12 ptb3" @click="draw(v)" v-if="v.status==0">立即领取</a>
						<a class="state gouser fs-12 ptb3" v-if="v.status == 3" @click="goto('/pages/shop/index/index',2)">去使用</a>
						<a class="state yesuser fs-12 ptb3" v-if="v.status == 2">已使用</a>
					</div>
				</div>
				<div class="completed" v-if="v.status == 3">
					<image class="img" src="https://boss.doxinsoft.com/images/wap/yes-state.png" />
				</div>
			</div>
			<hasMore :parentData="data" source="nodata" message="暂无优惠券"></hasMore>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				couponLists:[{
					amount: 5.00,
					type: 0,
					full_amount: 50,
					name: '满50元减5元券',
					start_date: '2020-08-01',
					end_date: '2020-08-30',
					status: 0
				},{
					amount: 5.00,
					type: 1,
					full_amount: '',
					name: '5元优惠券',
					start_date: '2020-08-01',
					end_date: '2020-08-30',
					status: 3
				}]
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			//this.ajax();
			
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