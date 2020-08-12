<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-date :insert="true" :lunar="false" :start-date="'1900-01-01'" :end-date="'2099-12-30'" @change="change" v-if="dataShow"></dx-date>
			<view class="order-count main-bg fc-white">
				<view class="c-item">
					<view class="num fs-24">{{count.order}}<text class="fs-14">单</text></view>
					<view class="name fs-13">累计完成订单</view>
				</view>
				<view class="c-item">
					<view class="num fs-24">{{ count.cancel }}<text class="fs-14">单</text></view>
					<view class="name fs-13">累计取消订单</view>
				</view>
			</view>
			<dx-tabs :tabs="tabs" v-model="data.query.status" @change="change" selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="p15 flex-between flex-middle fc-6 pb0">
				<view class="ldate Arial fs-15">2020-06-27</view><!-- 有选择才显示日期 -->
				<view class="iconfont icon-date fs-17" @click="dataShow = true"></view>
			</view>
			<view class="orderLists mb10" v-for="(parent,key) in orderLists" @click="goto('/pages/order/detail/main',1)">
				<view class="order_date plr10 bd-be fs-15 fc-3">
					<view class="fs-14 flex1">
						<view class="time lh-20">下单时间：<text class="Arial">{{ parent.created_at }}</text></view>
						<view class="order_no lh-20">订单编号：<text class="Arial">{{ parent.order_no }}</text></view>
					</view>
					<view class="fs-14 text-right">
						<view class="price lh-20">￥{{parent.amount}}</view>
						<view class="state lh-20 fs-13">{{parent.status_message}}</view>
					</view>
				</view>
				<view class="pro fw-bold plr15 pt10 fs-15"><text v-for="(v,num) in parent.products.lists">{{ v.name }}{{ v.num }}斤,</text></view>
				<view class="buy_info fs-15">
					<view class="flex-between flex-middle">
						<view class="flex1">
							<view class="name lh-24">{{ parent.getUser.name }}<text class="Arial pl10">{{ parent.getUser.phone }}</text></view>
							<view class="address mt5 fc-6">{{ parent.getUser.address }}</view>
						</view>
						<view class="icon-grop">
							<view class="icon dxi-icon dxi-icon-location-fill"></view>
							<view class="icon dxi-icon dxi-icon-tel-fill"></view>
						</view>
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
	import dxDate from '@/components/date/uni-calendar.vue'
	export default {
		components:{
			orderPro,
			dxTabs,
			dxDate
		},
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 1,
				dataShow: false,
				count:{
					order: 3,
					cancel: 0,
				},
				tabs: [{
					value:1,
					name: "历史订单"
				}, {
					value:2,
					name: "今日完成单"
				},{
					value:3,
					name: "今日取消单"
				}],
				orderLists:[{
					status: 1,
					created_at:'2020-06-23 10:15:39',
					order_no: 2018020502622230,
					send_date: '06-25',
					send_time: '10:30-11:30',
					status_message: '已完成',
					amount: 0.02,
					getUser:{
						name:'林生',
						phone: 13380951183,
						address: '广东省江门市蓬江区仓后街送'
					},
					products:{
						count: 2,
						remark: '请尽快配送',
						lists:[{
							name: '楂',
							num: 1,
							price: 0.01
						},{
							name: '芒果',
							num: 1,
							price: 0.01
						}]
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