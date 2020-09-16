<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <dx-tabs :tabs="tabs" @change="search" v-model="status"  selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs> -->
			<dx-tabs-scroll :tabs="tabs" @change="search" v-model="status" height="52" borderColor="#57C734" curColor="#57C734" nameSize="15" :height="46"></dx-tabs-scroll>
			<view class="pro_info mb10" v-for="(parent,key) in data.lists.data" v-if="listsShow">
				<view class="box">
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
							<view class="fc-red fs-13" v-if="status == 9 && status == 99">{{parent.status_message}}</view>
							<view class="pl8" v-if="status == 1 || status == 9 || status == 0 || status == 99">
								<view class="del-icon bg-f3 dxi-icon dxi-icon-del fs-14" @click="delOrder(parent)"></view>
							</view>
						</view>
					</view>
					<view @click="gotoOrder(parent)" v-if="parent.getMerchant && parent.status!=1">
						<view class="storeName flex-middle">
							<image class="img" :src="parent.getMerchant.cover"></image>
							<view class="name fs-15 fc-3">{{ parent.getMerchant.name }}</view>
						</view>
						<orderPro :data="parent.products"></orderPro>
						<view class="order_count plr10 fs-13" v-if="parent.quick_price !='0.00'">
							加急费：￥<span class="Arial fs-16 fc-red">{{parent.quick_price}}</span>
						</view>
						<view class="order_count plr10 fs-13">共<span class="Arial">{{parent.num}}</span>件商品
							合计：￥<span class="Arial fs-16 fc-red">{{parseFloat(parent.amount) + parseFloat(parent.quick_price)}}</span>
						</view>
						
					</view>
					<view @click="gotoOrder(parent)" v-if="parent.status==1">
						<orderPro :data="parent.products"></orderPro>
						<view class="order_count plr10 fs-13" v-if="parent.quick_price !='0.00'">
							加急费：￥<span class="Arial fs-16 fc-red">{{parent.quick_price}}</span>
						</view>
						<view class="order_count plr10 fs-13">共<span class="Arial">{{parent.num}}</span>件商品
							合计：￥<span class="Arial fs-16 fc-red">{{parseFloat(parent.amount) + parseFloat(parent.quick_price)}}</span>
						</view>
					</view>
					<view class="btn-group ptb8 plr10">
						<!-- 待支付 -->
						<view class="btn-item" v-if="parent.status == 1">
							<!-- <view class="btn-nav" @click="delOrder(parent)">取消订单</view> -->
							<view class="btn-nav" @click="goto('/pages/order/pay_center/main?order_no='+parent.order_no,1)">去支付</view>
						</view>
						<!-- 待接单 -->
						<view class="btn-item" v-if="parent.status == 3">
							<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
						</view>
						<!-- 骑手已接单 -->
						<view class="btn-item" v-if="parent.status == 5">
							<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
						</view>
						<!-- 6：骑手已取货；7：骑手已送达 -->
						<view class="btn-item" v-if="parent.status == 6 || parent.status == 7">
							<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
							<view class="btn-nav" @click="goto('/pages/order/buy/detail?order_no='+parent.order_no,1)">确认收货</view>
						</view>
						<!-- <view class="btn-item" >
							<view class="btn-nav" @click="goto('/pages/order/map/main?order_no='+parent.order_no,1)" v-if="location">骑手位置</view>
						</view> -->
						<!-- 已完成 -->
						<view class="btn-item" v-if="parent.status == 9">
						
							<view class="btn-nav" @click="gotoOrder(parent)">订单详情</view>
							<view class="btn-nav" @click="goto('/pages/order/evaluate/main?order_no='+parent.order_no,1)">{{parent.suggestStatus == 0 ? '去评价' : '已评价'}}</view>
						</view>
						<!-- 售后中-->
					</view>
				</view>
				<view class="complete-icon" v-if="status == 9 || status == 99"><image class="img" src="https://appmarket.doxinsoft.com/images/wap/complete-icon.png"></image></view>
			</view>
			<hasMore :parentData="data" source='nodata'></hasMore>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	export default {
		components:{orderPro,dxTabsScroll},
		data() {
			return {
				formAction: '/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				location:{},
				getSiteName: this.getSiteName(),
				status: 12,
				listsShow:false,
				tabs: [{
					value:12,
					name: "全部"
				}, 
				{
					value:1,
					name: "待付款"
				},
				{
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
				},
				{
					value:0,
					name: "已取消"
				}],
			}
		},
		methods: {
			delOrder(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'orders'
							}).then(msg => {
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			gotoOrder(item){
				return this.goto("/pages/order/buy/detail?order_no="+item.order_no,1);
			},
			search(){
				this.listsShow = false;
				if(this.status == 99){
					this.getAjaxForApp(this,{status:9}).then(msg => {
						  this.listsShow = true;  
					});
						
				}else if(this.status == 9){
					this.getAjaxForApp(this,{status:9,suggestStatus:0}).then(msg => {
						   this.listsShow = true; 
					});
				}else{
					this.getAjaxForApp(this,{status:this.status}).then(msg => {
						   this.listsShow = true; 
					});
				}
			},
			ajax() {
				this.listsShow = false;
				this.getAjaxForApp(this,{status:this.status}).then(msg => {
					 this.listsShow = true; 
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