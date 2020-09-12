<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="navbar" v-model="status" @change="ajax" selectedColor="#57C734" sliderBgColor="#57C734"></dx-tabs>
			<view class="pro_info block-sec" v-for="(item,key) in data.listsIntegral.data">
				<view class="order_date fs-14 plr10 bd-be">
					<view class="time">
						<span>下单日期：</span>
						<span class="Arial">{{item.created_at}}</span>
					</view>
					<view class="state flex-middle">
						<view class="fc-6 fs-13">{{item.status_message}}</view>
						<view class="pl8" v-if="item.status == 1 || item.status == 9 || item.status == 0">
							<view class="del-icon bg-f3 dxi-icon dxi-icon-del fs-14" @click="delOrder(item)"></view>
						</view>
					</view>
				</view>
				<view class="order_info p10 pb5" v-if="item.products">
					<view class="pro_img">
						<image class="img" :src="item.products.firstCover" />
					</view>
					<view class="txt fs-14 nowrap">{{ item.products.name }}</view>
				</view>
				<view class="order_count fs-14 bd-be plr10 pb8">
					<span class="price">{{item.integral}}</span>积分
				</view>
				<view class="btn-group ptb8 plr10">
					<view class="btn-item">
						<view class="btn-nav" @click="goto('/pages/integral/order/buy/main?order_no='+item.order_no,1)">订单详情</view>
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
		components: {
			dxTabs
		},
		data() {
			return {
				formAction: '/integral/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				status: 12,
				getSiteName: this.getSiteName(),
				navbar: [{
						value: 12,
						name: '全部'
					},
					{
						value: 3,
						name: '待发货'
					},
					{
						value: 5,
						name: '待收货'
					},
					{
						value: 9,
						name: '已完成'
					},
					// {value: 0,name: '已取消'},
				],
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
			this.status = options.status;
			this.ajax();
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
								tablename: 'integral_orders'
							}).then(msg => {
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			changeStatus(status) {
				this.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/integral/change-integral-status", {
						id: item.id,
						status: 0
					}).then(msg => {
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
					status: this.status
				}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
	@import url('index.css');
</style>
