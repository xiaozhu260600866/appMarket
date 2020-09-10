<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="show_banner">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</view>
			<view class="pro-info bg-f mb8">
				<view class="pro-name fs-16 plr15 ptb5">{{data.product.name}}</view>
				<view class="pro-price fs-18 plr15 pb10"><span class="Arial">{{data.product.integral}}</span><span class="fs-14 fc-9 pl5">积分</span></view>
				<!-- <view class="alert-danger" v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</view>
			<view class="alert-success" v-else>当前积分为{{data.integral}}分，可以兑换此商品哦！</view> -->
			</view>
			<view class="pro-title plr15 bd-b bg-f">
				<text class="fs-16">商品详情</text>
			</view>
			<view class="pro-content p15 mb50">
				<view class="pro-con-main">
					<uParse :content="data.product.content" />
				</view>
			</view>
			<view id="footer-btn">
				<!-- <button class="f-dx-btn dx-btn-red" v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</button>
				<button @click="toBuy" class="f-dx-btn dx-btn-red" v-else>立即兑换</button> -->
				<dx-button type="info" block v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</dx-button>
				<dx-button type="success" block @click="toBuy" v-else>立即兑换</dx-button>
			</view>


		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formAction: '/integral/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				id:''
				
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
			this.id = options.id;
			this.ajax();
		},
		methods: {
			toBuy() {
				this.postAjax(this.formAction, {
					id: this.data.product.id,
					num: 1,
					is_info: 0
				}).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/integral/order/buy/main?order_no=" + msg.data.order_no);
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this,{id:this.id}).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {
			uParse
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>