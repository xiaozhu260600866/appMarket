<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mdetail" v-if="data.show">
			<view class="md-item block-sec" v-for="(v,key) in data.lists.data">
				<view class="top">
					<view class="fs-16 fc-0 fw-bold">{{ v.title }}</view>
					<view class="Arial fs-14 fc-6">{{ v.created_at }}</view>
				</view>
				<dx-products-pic :src="v.getOrder.products[0].getProduct.firstCover" :imgWidth="90" :imgHeight="90">
					<view class="right-box">
						<view class="row fs-15 lh-20">{{ v.content }}</view>
						<view class="row"><dx-button type="danger" size="mini" hollow>查看订单详情</dx-button></view>
					</view>
				</dx-products-pic>
			</view>
		</view>
	</view>
</template>

<script>
	import dxProductsPic from "doxinui/components/products/pic"
	export default {
		components:{
			dxProductsPic
		},
		data() {
			return {
				formAction: '/user/system-message?type=2',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detailArray:[{
					title: '订单接收提醒',
					message: '您已接收新的订单，请尽快备货！',
					create_at: '08-13 12:51',
					products:{
						firstCover: '/static/pro02.jpg'
					}
				},{
					title: '订单发出提醒',
					message: '骑手已取单，点击查看详情！',
					create_at: '08-13 13:20',
					products:{
						firstCover: '/static/pro02.jpg'
					}
				},{
					title: '订单收货提醒',
					message: '客户已收货，点击查看详情！',
					create_at: '08-13 15:30',
					products:{
						firstCover: '/static/pro02.jpg'
					}
				}],
				
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
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