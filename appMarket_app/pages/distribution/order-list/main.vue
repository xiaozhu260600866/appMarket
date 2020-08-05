<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show" >
			<div class="flex-between lh-40 plr15 main-bg">
				<p class="fs-14 fc-white">分销订单<span class="Arial">({{ data.lists.data.length }})</span></p>
				<p class="fs-14 fc-white">预计：<span class="Arial">+{{ amount }}</span>元</p>
			</div>
			<div class="order-classify bg-f mb8">
				<p :class="['nav-tab',data.query.status == -1 ? 'selected' :'']" @click="changeStatus(-1)">全部</p>
				<p :class="['nav-tab',data.query.status == 6 ? 'selected' :'']" @click="changeStatus(6)">待入账</p>
				<p :class="['nav-tab',data.query.status == 1 ? 'selected' :'']" @click="changeStatus(1)">已完成</p>
			</div>
			<!-- <meiTime ref="meiTime"  :data="[
				{label:'今天',value:'today'},
				{label:'本周',value:'thisweek'},
				{label:'本月',value:'thismonth'}
			]" :query="data.query"></meiTime> -->
			<div class="order-list mb8 bg-f" v-for="(item,key) in data.lists.data" v-if="listsShow" :key="item.id">
				<div class="title plr15 ptb10 bd-be">
					<image class="head mr10" :src="item.getUser.headerPic" />
					<p class="name fs-15">{{item.getUser.userInfo.name ? item.getUser.userInfo.name : item.getUser.nickname}}({{ item.source  }}级)<span v-if="data.query.status == -1">({{ item.getStatus}})</span></p>
					<p class="num fs-15 fc-orange">+<span class="">{{item.amount}}</span></p>
				</div>
				<div class="pro-info">
					<div class="plr5" @click="goto('/pages/product/show/index?id='+product.getProduct.id,1)">
						<orderPro :data="item.products"></orderPro>
					</div>
					<div class="order_count plr15 fs-13" v-if="item.getOrder.shipping == 2">共<span class="Arial">{{item.getOrder.num}}</span>件商品
						实付：￥<span class="Arial fs-16 fc-red">{{ toFixed(parseFloat(item.getOrder.amount) - parseFloat(item.getOrder.payed_amount))}}</span>
					</div>
					<div class="order_count plr15 fs-13" v-else>共<span class="Arial">{{item.getOrder.num}}</span>件商品
						实付：￥<span class="Arial fs-16 fc-red">{{ toFixed((parseFloat(item.getOrder.amount)+  parseFloat(item.getOrder.yunfei))  - parseFloat(item.getOrder.payed_amount))}}</span>
					</div>
					<div class="infob fs-12 fc-9 plr15 ptb10 bd-te">
						<p>订单编号：<span class="Arial">{{item.order_no}}</span></p>
						<p>下单时间：<span class="Arial">{{item.created_at}}</span></p>
					</div>
				</div>
			</div>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</section>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	export default {
		components:{
			orderPro
		},
		computed: {
			amount() {
				let amount = 0;
				if (this.data.show && this.data.lists.data.length) {
					this.data.lists.data.forEach((v) => {
						amount += parseFloat(v.amount);
					});
				}
				return amount;
			}
		},
		data() {
			return {
				formAction: '/shop/dis/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				listsShow: true,
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
			changeStatus(status) {
				this.data.query.status = status;
				this.listsShow = false;
				this.ajax();
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.listsShow = true;
				});
			}
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>