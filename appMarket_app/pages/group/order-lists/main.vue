<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="order-classify mb10 mt5">
				<p :class="['nav-tab',is_head == 1 ? 'selected' :'']" @click="changeHead(1)">我发起的 </p>
				<p :class="['nav-tab',is_head == 0 ? 'selected' :'']" @click="changeHead(0)">我参与的</p>
			</div>
			<div class="pro_info mb10" v-for="(parent,key) in data.lists.data">
				<div class="order_date fs-14 plr10 bd-be">
					<p class="time">
						<span>下单日期：</span>
						<span class="Arial">{{parent.getOrder.created_at}}</span>
					</p>
					<p class="state fc-3">{{parent.getGroup.getStatus}}</p>
				</div>
				<!-- <div class="order_info ptb5 plr10" v-for="(son,key2) in parent.getOrder.products">
					<div class="pro_img pr10">
						<image class="img" :src="son.getProduct.firstCover" />
					</div>
					<div class="txt fs-14 nowrap">{{son.getProduct.name}}
						<p class="nowrap fs-12" v-if="son.is_info">{{son.attribute}}</p>
					</div>
				</div> -->
				<div @click="gotoOrder(parent)">
					<orderPro :data="parent.getOrder.products"></orderPro>
				</div>
				<div class="order_count fs-14 bd-be plr10">共
					<span class="Arial">1</span>件商品 需付款：
					<span class="price">￥{{ parent.getOrder.amount}}</span>
				</div>
				<div class="flex-between lh-50 plr10 fs-14 bd-be">
					<div class="">成团人数：<span class="Arial">{{ parent.getGroup.group_num }}</span>人</div>
					<div class="">在拼人数：<span class="Arial">{{ parent.getGroup.group_num - parent.getGroup.leftNum }}</span>人</div>
				</div>
				<div class="btn-group ptb8 plr10">
					
					<div class="btn-item">
						<div class="btn-nav" @click="goto('/pages/shop/order/buy/index?order_no='+parent.order_no,1)">订单详情</div>
						<div class="btn-nav" @click="goto('/pages/shop/group/group/index?order_no='+parent.order_no,1)">邀请好友</div>
					</div>
					<div class="btn-item" v-if="parent.status >=3">
						<div class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status <10">申请售后</div>
						<div class="btn-nav" @click="goto('/pages/shop/order/after-sale/index?order_no='+parent.order_no,1)" v-if="parent.status >=3 && parent.status >=10">查看售后</div>

					</div>
					<div class="btn-item" v-if="parent.status >=9">
						<div class="btn-nav" @click="goto('/pages/shop/order/evaluate/index?order_no='+parent.order_no,1)" v-if="parent.status >=9 && parent.suggestStatus == 0">评价</div>
						<div class="btn-nav" @click="goto('/pages/shop/order/evaluate/index?order_no='+parent.order_no,1)" v-if="parent.status >=9 && parent.suggestStatus == 1">追加评价</div>
						<div class="btn-nav" @click="goto('/pages/shop/order/evaluate/index?order_no='+parent.order_no,1)" v-if="parent.status >=9 && parent.suggestStatus == 2">评价完成</div>
					</div>
					<div class="btn-item" @click="changeOrder(parent)" v-if="parent.status < 3 ">
						<p class="btn-nav">取消订单</p>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="order"></hasMore>
		</section>
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
				formAction: '/shop/user/group-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				is_head: 1,
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
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