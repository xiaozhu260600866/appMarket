<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view><!-- v-if="data.show" -->
			<!-- <view class="order-classify mb10 mt5">
				<view :class="['nav-tab',is_head == 1 ? 'selected' :'']" @click="changeHead(1)">我发起的</view>
				<view :class="['nav-tab',is_head == 0 ? 'selected' :'']" @click="changeHead(0)">我参与的</view>
			</view> -->
			<dx-tabs :tabs="tabs" v-model="status"  selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="pro_info block-sec" v-for="(parent,key) in orderLists">
				<view class="order_date fs-14 plr10 bd-be">
					<view class="time">
						<text>下单日期：</text>
						<text class="Arial">{{parent.getOrder.created_at}}</text>
					</view>
					<view class="state fc-3">{{parent.getGroup.getStatus}}</view>
				</view>
				<view @click="gotoOrder(parent)">
					<orderPro :data="parent.getOrder.products"></orderPro>
				</view>
				<view class="order_count fs-14 bd-be plr10">共
					<text class="Arial">1</text>件商品 需付款：
					<text class="price">￥{{ parent.getOrder.amount}}</text>
				</view>
				<view class="flex-between lh-50 plr10 fs-14 bd-be">
					<view class="">成团人数：<text class="Arial">{{ parent.getGroup.group_num }}</text>人</view>
					<view class="">在拼人数：<text class="Arial">{{ parent.getGroup.group_num - parent.getGroup.leftNum }}</text>人</view>
				</view>
				<view class="btn-group ptb8 plr10">
					
					<view class="btn-item">
						<view class="btn-nav" @click="goto('/pages/order/buy/main?order_no='+parent.order_no,1)">订单详情</view>
					</view>
					<view class="btn-item" v-if="parent.status >=3">
						<view class="btn-nav" @click="goto('/pages/order/after-sale/main?order_no='+parent.order_no,1)"
						 v-if="parent.status >=3 && parent.status <10">申请售后</view>
						<view class="btn-nav" @click="goto('/pages/order/after-sale/main?order_no='+parent.order_no,1)"
						 v-if="parent.status >=3 && parent.status >=10">查看售后</view>

					</view>
					<view class="btn-item" v-if="parent.status >=9">
						<view class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)"
						 v-if="parent.status >=9 && parent.suggestStatus == 0">评价</view>
						<view class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)"
						 v-if="parent.status >=9 && parent.suggestStatus == 1">追加评价</view>
						<view class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)"
						 v-if="parent.status >=9 && parent.suggestStatus == 2">评价完成</view>
					</view>
					<view class="btn-item" @click="changeOrder(parent)" v-if="parent.status < 3 ">
						<view class="btn-nav">取消订单</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data" source="order"></hasMore>
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
				formAction: '/shop/user/group-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 12,
				tabs: [
					{value:12,name: "全部"},
					{value:3,name: "待发货"},
					{value:5,name: "待收货"},
					{value:9,name: "待评价"},
					{value:99,name: "已完成"},
				],
				orderLists:[{
					status:3,
					getGroup:{
						getStatus:'待发货',
						group_num: 10,
						leftNum: 5
					},
					getOrder:{
						created_at: '2020-08-01 17:23:23',
						products:[{
							getProduct:{firstCover: '/static/pro02.jpg',name: '新鲜芒果'},
							amount: 10.00,
							num: 1
						}],
						amount:10.00
					}
				},{
					status:3,
					getGroup:{
						getStatus:'待发货',
						group_num: 10,
						leftNum: 5
					},
					getOrder:{
						created_at: '2020-08-01 17:23:23',
						products:[{
							getProduct:{firstCover: '/static/pro02.jpg',name: '新鲜芒果'},
							amount: 10.00,
							num: 1
						}],
						amount:10.00
					}
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
			changeHead(head) {
				this.is_head = head;
				this.data.nextPage = 1;
				this.ajax();
			},
			ajax() {
				this.getAjax(this,{is_head:this.is_head}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>