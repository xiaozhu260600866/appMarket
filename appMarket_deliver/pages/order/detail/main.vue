<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12 orderDetail" v-if="data.show">
			<view class="block-sec de-group">
				<view class="row">下单时间：<text class="Arial">{{ order.created_at }}</text></view>
				<view class="row">订单编号：<text class="Arial">{{ order.order_no }}</text></view>
			</view>
			<view class="block-sec de-group">
				<view class="row">配送时间：<text class="Arial">{{order.deliver_date}}</text>到达</view>
			</view>
			<view class="buy_info fs-15 block-sec de-group">
				<view class="flex-between flex-middle">
					<view class="flex1">
						<view class="name lh-24">{{ order.addr_name }}</view>
					</view>
					<view class="flex-middle">
						<view class="icon dxi-icon dxi-icon-location-fill mr12" @click="location(order.location_x,order.location_y,order.addr_address)"></view>
						<view class="icon dxi-icon dxi-icon-tel-fill" @click="phone(order.addr_phone)"></view>
					</view>
				</view>
				<view class="address mt5 fc-6">{{ order.addr_phone }}</view>
			</view>
			<view class="block-sec de-group pro">
				<view class="count">商品<text>({{order.products.length}})</text></view>
				<view class="reamrk mt10">备注：{{ order.remark }}</view>
				<view class="proLists fs-14" v-for="(v,num) in order.products">
					<view class="td name">{{ v.getProduct.name }}</view>
					<view class="td num">X{{ v.num }}</view>
					<view class="td price fc-3">{{ v.price }}</view>
				</view>
			</view>
			<view class="block-sec de-group orderMoney">
				<dx-list-cell name="优惠券抵扣" :padding="0" nameColor="#666">
					<view slot="right" class="Arial right fc-3">￥{{ order.coupon_value }}</view>
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
				formAction: '/horse/order-detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				order_no:'',
				order:{
					
				}
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.order = msg.detail;
				});
			}
		},
		onLoad(options) {
			this.order_no = options.order_no;
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
@import url('./index.css');
@import url('../lists/index.css')
</style>