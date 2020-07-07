<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12 orderDetail">
			<view class="block-sec de-group">
				<view class="row">下单时间：<text class="Arial">{{ order.created_at }}</text></view>
				<view class="row">订单编号：<text class="Arial">{{ order.order_no }}</text></view>
			</view>
			<view class="block-sec de-group">
				<view class="row">配送时间：<text class="Arial">{{ order.send_date }} {{order.send_time}}</text>到达</view>
			</view>
			<view class="buy_info fs-15 block-sec de-group">
				<view class="flex-between flex-middle">
					<view class="flex1">
						<view class="name lh-24">{{ order.getUser.name }}</view>
					</view>
					<view class="flex-middle">
						<view class="icon dxi-icon dxi-icon-location-fill mr12"></view>
						<view class="icon dxi-icon dxi-icon-tel-fill"></view>
					</view>
				</view>
				<view class="address mt5 fc-6">{{ order.getUser.address }}</view>
			</view>
			<view class="block-sec de-group pro">
				<view class="count">商品<text>({{order.products.count}})</text></view>
				<view class="reamrk mt10">备注：{{ order.products.remark }}</view>
				<view class="proLists fs-14" v-for="(v,num) in order.products.lists">
					<view class="td name">{{ v.name }}</view>
					<view class="td num">X{{ v.num }}</view>
					<view class="td price fc-3">{{ v.price }}</view>
				</view>
			</view>
			<view class="block-sec de-group orderMoney">
				<dx-list-cell name="优惠券抵扣" :padding="0" nameColor="#666">
					<view slot="right" class="Arial right fc-3">￥{{ order.coupon }}</view>
				</dx-list-cell>
				<dx-list-cell name="配送费" :padding="0" nameColor="#666">
					<view slot="right" class="Arial right fc-3">￥{{ order.send_price }}</view>
				</dx-list-cell>
				<dx-list-cell name="实际支付" :padding="0" noborder>
					<view slot="right" class="right price fs-17">￥{{ order.amount }}</view>
				</dx-list-cell>
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				order:{
					no: 214,
					status: '已接单',
					created_at:'2020-06-23 10:15:39',
					order_no: 2018020502622230,
					send_date: '06-25',
					send_time: '10:30-11:30',
					coupon: 0,
					send_price: 3.00,
					send_type: '微信',
					amount: 3.02,
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
				}
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
@import url('./index.css');
@import url('../lists/index.css')
</style>