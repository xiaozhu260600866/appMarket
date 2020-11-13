<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="pro_info mb10" v-for="(parent,key) in data.lists.data">
				<div class="order_date fs-14 plr10 bd-be">
					<div class="time fs-12">
						<p class="lh-18">
							<span class="fc-6">下单日期：</span>
							<span class="Arial">{{parent.created_at}}</span>
						</p>
						<p class="lh-18">
							<span class="fc-6">订单编号：</span>
							<span class="Arial">{{parent.order_no}}</span>
						</p>
					</div>
					<p class="state fc-orange">{{parent.status_message}}</p>
				</div>
				<div @click="goto('/pages/shop/order/buy/detail?order_no='+parent.order_no,1)">
					<div class="order_info ptb5 plr10" v-for="(son,key2) in parent.products" v-if="son.getProduct">
						<div class="pro_img pr10">
							<image class="img" :src="son.getProduct.firstCover" />
						</div>
						<div class="pro_right">
							<div class="flex-between mb10">
								<div class="flex1">
									<div class="name lh-20 fs-15 nowrap">{{son.getProduct.name}}</div>
									<view class="nowrap fs-12 mt5" v-if="son.is_info">{{son.attribute}}</view>
								</div>
								<div class="text-right">
									<view class="price fs-12 pl10 fc-3 lh-22">￥{{son.amount}}</view>
									<p class="num fs-12 fc-6 mt5">x <span class="Arial">{{son.num}}</span></p>
								</div>
							</div>
							<p class="fs-13 text-right lh-20">小计：{{son.amount * son.num}}</p>
						</div>
					</div>
				</div>
					
				<div class="order_count fs-14 bd-be plr10">共
					<span class="Arial">1</span>件商品 需付款：
					<span class="price">￥{{parent.amount}}</span>
				</div>
				<div class="btn-group ptb8 plr10">
					
					<div class="btn-item" v-if="parent.status >=3">
						<div class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status <10">申请售后</div>
						<div class="btn-nav" @click='cancel(parent)'>撤消售后单</div>
						<div class="btn-nav obtn" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status >=10">售后详情</div>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="order"></hasMore>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	import "../lists/index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			cancel(row){
				this.cancelAfterOrder(row,res=>{
					this.ajax();
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
