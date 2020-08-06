<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<!-- <view class="order-classify bd-b bg-f">
				<view :class="['nav-tab',status == 3 ? 'selected' :'']" @click="changeStatus(3)">待发货</view>
				<view :class="['nav-tab',status == 5 ? 'selected' :'']" @click="changeStatus(5)">待收货</view>
				<view :class="['nav-tab',status == 9 ? 'selected' :'']" @click="changeStatus(9)">完成</view>
				<view :class="['nav-tab',status == 0 ? 'selected' :'']" @click="changeStatus(0)">已取消</view>
			</view> -->
			<dx-tabs :tabs="navbar" @change="change" selectedColor="#57C734" sliderBgColor="#57C734"></dx-tabs>
			<view class="pro_info block-sec" v-for="(item,key) in data.listsIntegral.data">
				<view class="order_date fs-14 plr10 bd-be">
					<view class="time">
						<span>下单日期：</span>
						<span class="Arial">{{item.created_at}}</span>
					</view>
					<view class="state fs-color">{{item.status_message}}</view>
				</view>
				<view class="order_info p10 pb5" v-if="item.products">
					<view class="pro_img pr10">
						<image class="img" :src="item.products.firstCover" />
					</view>
					<view class="txt fs-14 nowrap">{{ item.products.name }}</view>
				</view>
				<view class="order_count fs-14 bd-be plr10 pb8">
					共<span class="Arial">1</span>件商品 需付：
					<span class="price">{{item.integral}}</span>积分
				</view>
				<view class="btn-group ptb8 plr10">
					<view class="btn-item">
						<view class="btn-nav" :url="'/pages/shop/integral/order/buy/index?order_no='+item.order_no">订单详情</view>
					</view>
					<view class="btn-item" @click="changeOrder(item)" :data-id="item.id" :data-status="0" v-if="item.status!=0">
						<view class="btn-nav">取消订单</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data" source="order"></hasMore>
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
				formAction: '/shop/integral/lists',
				mpType: 'page', //用来分清父和子组件
				// data: this.formatData(this),
				status: 12,
				getSiteName: this.getSiteName(),
				data:{
					listsIntegral:{
						data:[{
							created_at: '2020-07-02 17:22:03',
							status_message: '已完成',
							products:{
								firstCover: '/static/pro02.jpg',
								name:'新鲜芒果'
							},
							integral: '200'
						}]
					}
				},
				navbar:[{
					value: 12,
					name: '全部'
				},{
					value: 3,
					name: '待发货'
				},{
					value: 5,
					name: '待收货'
				},{
					value: 9,
					name: '完成'
				},{
					value: 0,
					name: '已取消'
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.status = options.status;
			//this.ajax();
		},
		methods: {
			changeStatus(status) {
				this.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/integral/change-integral-status", {
						id: item.id,
						status: 0
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this,{ status: this.status }).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>