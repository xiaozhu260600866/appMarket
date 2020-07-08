<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="tabs" v-model="status" @change="ajax()" selectedColor="#57C734" sliderBgColor="#57C734" :height="92"
			 :padding="0"></dx-tabs>
			<view class="Iorder">
				<view class="Iorder-list">
					<view class="Iorder-item" v-for="(item,index) in data.lists.data">
						<view class="top plr10">
							<view>
								<view class="time lh-18">下单时间：<text class="Arial">{{ item.payed_at }}</text></view>
								<view class="order_no lh-18">订单编号：<text class="Arial">{{ item.order_no }}</text></view>
							</view>
							<view class="status main-color">{{item.status_message}}</view>
						</view>
						<view class="info">
							<view class="flex-between flex-middle">
								<view class="flex1">
									<view class="name lh-24">{{ item.user.name }}<text class="Arial pl10">{{ item.user.phone }}</text></view>
									<view class="msg fs-13 fc-6 lh-16">第<text class="Arial">1</text>次下单　收藏用户</view>
								</view>
								<view class="icon dxi-icon dxi-icon-tel-fill"></view>
							</view>
							<view class="address mt5 fs-16">{{ item.addr_address }}</view>
						</view>
						<view class="pro">
							<view class="count">商品<text>({{item.products.length}})</text></view>
							<view class="reamrk mt10">备注：{{ item.remark }}</view>
							<view class="proLists fs-14" v-for="(v,num) in item.products">
								<view class="td name">{{ v.getProduct.name }}</view>
								<view class="td num">X{{ v.num }}</view>
								<view class="td price fc-3">{{ v.price }}</view>
							</view>
						</view>
						<view class="count flex-between p15 pt5">
							<view class="txt">本单预计收入</view>
							<view class="price">￥{{ item.amount }}</view>
						</view>
						<view class="print">
							<dx-button round btnBd="#fff" @click="printf(item)">打印小票</dx-button>
							<dx-button round type="success" btnBd="#fff" @click="order(item)" v-if="status == 3">接单</dx-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<printf ref="printf"></printf>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import printf from "@/components/printf.vue"
	export default {
		components: {
			dxTabs,
			printf
		},
		data() {
			return {
				formAction: '/merchant/order-lists',
				userInfo: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 3,
				tabs: [{
					value: 3,
					name: "新订单"
				}, {
					value: 4,
					name: "待处理"
				}, {
					value: 0,
					name: "取消订单"
				}, {
					value: 13,
					name: "已退款"
				}],
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
			return this.shareSource(this, '商城');
		},
		onShow() {
			this.onShow(this);
		},
		onLoad(options) {
			//#ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			console.log(info);
			//#endif
			//#ifdef H5
			
			//#endif
			
			this.ajax();
		},
		methods: {
			printf(item){
				this.$refs.printf.openDefault(item);
			},
			order(item) {
				this.getConfirm("是不确认此操作", () => {
					this.postAjax("/merchant/order-change", item).then(msg => {
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
				console.log(item);
			},

			ajax() {
				this.getAjaxForApp(this, {
					status: this.status

				}).then(msg => {
					this.setTitle("你好");
				});
			}

		}
	}
</script>
<style scoped="">
	@import url('index.css')
</style>
