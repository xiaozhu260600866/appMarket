<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="tabs" v-model="data.query.status" @change="change" selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="orderLists mb10" v-for="(parent,key) in orderLists">
				<view class="order_date plr10 bd-be fs-15 fc-3">
					<view class="time">
						期望<text class="Arial">{{ parent.send_date }} {{parent.send_time}}</text>到达
					</view>
					<view class="state fs-14">{{parent.status_message}}</view>
				</view>
				<view class="buy_info fs-15">
					<view class="flex-between flex-middle">
						<view class="flex1">
							<view class="name lh-24">{{ parent.getUser.name }}</view>
						</view>
						<view class="flex-middle">
							<view class="icon dxi-icon dxi-icon-location-fill mr12"></view>
							<view class="icon dxi-icon dxi-icon-tel-fill"></view>
						</view>
					</view>
					<view class="address mt5 fc-6">{{ parent.getUser.address }}</view>
				</view>
				<view class="order_info flex-middle" @click="goto('/pages/order/detail/main')">
					<view class="flex1">
						<view class="p">下单时间：<text class="Arial">{{ parent.created_at }}</text></view>
						<view class="p">订单日期：<text class="Arial">{{ parent.order_no }}</text></view>
						<view class="p">订单总额：<text class="price">￥{{ parent.amount }}</text></view>
					</view>
					<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
				</view>
				<view class="btn-group ptb8 plr10">
					<view class="btn-item">
						<view class="btn-nav">打印小票</view>
						<view class="btn-nav inbtn">删除</view>
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
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 12,
				tabs: [{
					value:12,
					name: "全部"
				}, {
					value:3,
					name: "进行中"
				},{
					value:5,
					name: "已完成"
				},{
					value:9,
					name: "已取消"
				},{
					value:99,
					name: "售后退款"
				}],
				orderLists:[{
					status: 1,
					created_at:'2020-06-23 10:15:39',
					order_no: 2018020502622230,
					send_date: '06-25',
					send_time: '10:30-11:30',
					status_message: '待支付',
					amount: 0.02,
					getUser:{
						name:'林生',
						phone: 13380951183,
						address: '广东省江门市蓬江区仓后街送'
					}
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
@import url('index.css')
</style>