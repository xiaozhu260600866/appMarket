<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="flex-middle fc-6 plr15 ptb12">
				<view class="flex1 fs-15 Arial">
					<view>今日分析</view><!-- 当选择日期时这里显示为日期 -->
				</view>
				<view>
					<text class="iconfont icon-date fs-17" @click="dateShow = true"></text>
				</view>
			</view>
			<view class="bg-f mb12">
				<view class="ptb50 fs-16 fc-6 text-center">曲线统计图</view>
			</view>
			<view class="bg-f mb12">
				<view class="plr15 ptb10 fs-15 fc-3">订单分析</view>
				<view class="count">
					<view class="c-item">
						<view class="name">完成订单</view>
						<view class="num">{{count.success_order}}</view>
					</view>
					<view class="c-item">
						<view class="name">取消订单</view>
						<view class="num">{{count.cancle_order}}</view>
					</view>
					<view class="c-item">
						<view class="name">客单均价</view>
						<view class="num">{{ count.average_price }}</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12" @click="goto('/pages/user/wallet/lists/main',1)">
				<dx-title name="今日支出" :nameSize="15" arrow>
					<view slot="right" class="fs-16 Arial fc-3">0</view>
				</dx-title>
			</view>
			<dx-date :insert="true" :start-date="'1900-01-01'" :end-date="'2099-12-30'" @change="change" v-if="dateShow"></dx-date>
		</view>
	</view>
</template>

<script>
	import dxDate from '@/components/date/uni-calendar.vue'
	import dxTitle from "doxinui/components/title/title"
	export default {
		components:{
			dxDate,dxTitle
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dateShow: false,
				count:{
					success_order: 0,
					cancle_order: 0,
					average_price: 0,
				}
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
			//this.ajax();
			
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