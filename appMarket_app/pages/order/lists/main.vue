<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="tabs" @change="ajax" v-model="status"  selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="pro_info mb10" v-for="(parent,key) in data.lists.data">
				<view class="order_date plr10 bd-be">
					<view class="time fs-14">
						<view class="lh-18">
							<span class="fc-6">下单日期：</span>
							<span class="Arial">{{parent.payed_at}}</span>
						</view>
						<view class="lh-18">
							<span class="fc-6">订单编号：</span>
							<span class="Arial">{{parent.order_no}}</span>
						</view>
					</view>
					<view class="state flex-middle">
						<view class="fc-red fs-13">{{parent.status_message}}</view>
						<view class="pl8" v-if="status == 1 || status == 9 || status == 0">
							<view class="del-icon bg-f3 dxi-icon dxi-icon-del fs-14" @click="delOrder(parent)"></view>
						</view>
					</view>
				</view>
				<view @click="gotoOrder(parent)">
					<view class="bd-be" v-for="(v,index) in parent.products">
						<view class="storeName flex-middle">
							<image class="img" :src="v.getMerchant.cover"></image>
							<view class="name fs-15 fc-3">{{ v.getMerchant.name }}</view>
						</view>
						<orderPro :data="parent.products"></orderPro>
						
						<view class="order_count plr10 fs-13">共<span class="Arial">{{v.num}}</span>件商品
							合计：￥<span class="Arial fs-16 fc-red">{{v.amount}}</span>
						</view>
					</view>
				</view>
				<!-- 
				<view class="order_count plr10 fs-14" >总共<span class="Arial">{{parent.num}}</span>件商品
					实付：￥<span class="Arial fs-16 fc-red">{{parent.amount}}</span>
				</view> -->
				<view class="btn-group ptb8 plr10">
					<!-- 待支付 -->
					<view class="btn-item" v-if="parent.status == 1">
						<view class="btn-nav" @click="changeOrder(parent)">取消订单</view>
						<view class="btn-nav" @click="goto('/pages/shop/order/buy/index?order_no='+parent.order_no,1)">去支付</view>
					</view>
					<!-- 待接单 -->
					<view class="btn-item" v-if="parent.status == 3">
						<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
						<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)">申请售后</view>
					</view>
					<!-- 骑手已接单 -->
					<view class="btn-item" v-if="parent.status == 5">
						<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)">申请售后</view>
						<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
					</view>
					<!-- 6：骑手已取货；7：骑手已送达 -->
					<view class="btn-item" v-if="parent.status == 6 || parent.status == 7">
						<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
						<view class="btn-nav" @click="goto('/pages/shop/order/buy/detail?order_no='+parent.order_no,1)">确认收货</view>
					</view>
					<!-- <view class="btn-item" >
						<view class="btn-nav" @click="goto('/pages/order/map/main?order_no='+parent.order_no,1)" v-if="location">骑手位置</view>
					</view> -->
					<!-- 已完成 -->
					<view class="btn-item" v-if="parent.status == 9">
						<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)">申请售后</view>
						<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
						<view class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)">{{parent.suggestStatus == 0 ? '去评价' : '已评价'}}</view>
					</view>
					<!-- 售后中-->
					<view class="btn-item" v-if="parent.status == 10">
						<view class="btn-nav obtn" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)">售后详情</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			orderPro,
			dxTabs
		},
		data() {
			return {
				formAction: '/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				location:{},
				getSiteName: this.getSiteName(),
				status: 12,
				tabs: [{
					value:12,
					name: "全部"
				}, {
					value:3,
					name: "待发货"
				},{
					value:5,
					name: "待收货"
				},{
					value:9,
					name: "待评价"
				},{
					value:99,
					name: "已完成"
				}],
			}
		},
		methods: {
			gotoOrder(item){
				return this.goto("/pages/order/buy/detail?order_no="+item.order_no,1);
			},
			ajax() {
				
				this.getAjaxForApp(this,{status:this.status}).then(msg => {
					  
				});
			}
		},
		onLoad(options) {
			this.status = options.status;
			let location_x = uni.getStorageSync('location_x');
			if(location_x){
				this.location.location_x = uni.getStorageSync('location_x');
			}
			let location_y = uni.getStorageSync('location_x');
			if(location_y){
				this.location.location_y = uni.getStorageSync('location_y');
			}
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
@import url('index.css')
</style>