<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12 pb50" v-if="data.show">
			<view class="block-sec">
				<weui-input label="配送方式" v-model="ruleform.shipping" type="txt" name="shipping"></weui-input>
			</view>
			<view id="address" class="block-sec" >
				<view class="add-info flex-middle plr15">
					<view class="licon pr15">
						<span class="iconfont icon-location-c-fill fs-24 main-color"></span>
					</view>
					<view class="info ptb10 flex1">
						<view class="name fs-15">
							<span>{{ruleform.addr_name}}</span>
							<span class="Arial pl10">{{ruleform.addr_phone}}</span>
						</view>
						<view class="add-detail fs-14 fc-6">
							<view class="label">地址：</view>
							<view class="name flex1">{{ ruleform.addr_address }} </view>
						</view>
					</view>
				</view>
			</view>
			
			<orderPro :data="ruleform.products" myclass="block-sec"></orderPro>
			<view id="mode" class="block-sec">
				<weui-input v-model="ruleform.pay_method" name="pay_method" label="付款方式" changeField="value" type="select" dataKey="pay_methods"
				 :disabled="true"></weui-input>
				<weui-input v-model="ruleform.remark" :disabled="true" label="买家留言" type="text" name="remark" placeholder=" "></weui-input>
			</view>
			<view id="calculation" class="block-sec">
				<view class="list-group">
					<view class="txt">配送费</view>
					<view class="fs-16 price">￥{{ruleform.send_price}}</view>
				</view><view class="list-group">
					<view class="txt">超重费用</view>
					<view class="fs-16 price">￥{{ruleform.weigth_price}}</view>
				</view><view class="list-group">
					<view class="txt">优惠券</view>
					<view class="fs-16 price">-￥{{ruleform.coupon}}</view>
				</view>
				<view class="list-group">
					<view class="txt">商品金额</view>
					<view class="fs-16 price">￥{{ruleform.amount}}</view>
				</view>
				
			</view>
			
			<view class="block-sec no">
				<weui-input label="订单编号" v-model="ruleform.order_no" type="txt" name="name"></weui-input>
				<weui-input label="订单日期" v-model="ruleform.created_at" type="txt" name="name"></weui-input>
			</view>
			<view class="block-sec no" v-if="ruleform.express_name">
				<weui-input label="快递公司" v-model="ruleform.express_name" type="txt" name="name"></weui-input>
				<weui-input label="快递单号" v-model="ruleform.express_no" type="txt" name="name"></weui-input>
				<weui-input label="发货时间" v-model="ruleform.express_at" type="txt" name="name"></weui-input>
			</view>
			
			<view id="order-footer">
				<view class="lprice fs-14 pl10"></view>
				<view class="rbtn">
					<!-- 待支付（1）、待发货（3）、待收货（5）、、完成（9，售后状态为1）、完成（售后状态为0）、评价（9，售后状态为0）、售后（10） -->
					<view class="btn-nav" @click="changeOrder()" v-if="ruleform.status == 1">取消订单</view>
					<view class="btn-nav" v-if="ruleform.status == 9 && ruleform.suggestStatus == 0">删除订单</view>
					<view class="btn-nav inbtn" @click="goto('/pages/shop/order/buy/index?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 1">去支付</view>
					<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 3 || ruleform.status == 5">申请售后</view>
					<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 9 && ruleform.suggestStatus == 0">申请售后</view>
					<view class="btn-nav inbtn" @click="canReceipt" v-if="ruleform.status == 5">确认收货</view>
					<view class="btn-nav" v-if="ruleform.status == 9 || ruleform.suggestStatus == 1">已完成</view>
					<view class="btn-nav inbtn" @click="goto('/pages/shop/order/evaluate/index?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 9 && ruleform.suggestStatus == 0">立即评价</view>
					<view class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 10">售后详情</view>
					<view class="btn-nav" v-if="ruleform.status == 0">已取消</view>
					<view class="btn-nav inbtn" @click="goto('/pages/order/map/main?order_no='+ruleform.order_no,1)" v-if="ruleform.status == 5 ||ruleform.status == 6 ||ruleform.status == 7 || location">骑手位置</view>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import orderPro from "@/components/orderPro";
	export default {
		components:{
			orderPro
		},
		data() {
			return {
				formAction: '/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					shipping: '商家配送'
				},
				order:"",
				wallet: 5.00,
				amount: 0.00,
				addressShow:true,
				
				pay_methods: [{
					label: '微信支付',
					value: 1
				},{
					label: '余额支付',
					value: 2
				}],
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {order_no:this.order_no
				
				}).then(msg => {
					this.ruleform = msg.detail;
					this.ruleform.shipping = '商家配送';
					this.ruleform.send_price= 0;
					this.ruleform.weigth_price= 0;
					this.ruleform.coupon= 0;
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
@import url('index.css')
</style>
