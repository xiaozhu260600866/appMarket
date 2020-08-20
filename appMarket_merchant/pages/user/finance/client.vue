<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<view class="client_title">
					<view class="name">新老顾客</view>
					<weui-input v-model="ruleform.searchType" @callback="ajax" name="searchType" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input>
				</view>
				<view class="count">
					<view class="c-item">
						<view class="name">成交顾客数</view>
						<view class="num">{{count.shopping_client}}</view>
					</view>
					<view class="c-item">
						<view class="name">新客人数</view>
						<view class="num">{{count.news_client}}</view>
					</view>
					<view class="c-item">
						<view class="name">老客人数</view>
						<view class="num">{{ count.old_client }}</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12">
				<view class="bd-be">
					<dx-title name="收藏人数" :nameSize="15">
						<view slot="right" class="fs-16 Arial fc-3 flex1">{{data.couponCount}}</view>
					</dx-title>
				</view>
				<view class="bd-be">
					<dx-title name="本周新增" :nameSize="15">
						<view slot="right" class="fs-16 Arial fc-3 flex1">0</view>
					</dx-title>
				</view>
				<view class="ptb50 fs-16 fc-6 text-center">曲线统计图</view>
			</view>
			<!-- <view class="bg-f mb12">
				<view class="client_title">
					<view class="name">复购</view>
					<weui-input v-model="ruleform.timeQuantum" name="timeQuantum" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input>
				</view>
				<view class="ptb50 fs-16 fc-6 text-center">扇形统计图</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import dxTitle from "doxinui/components/title/title"
	let echarts = require('echarts/lib/echarts')
	console.log(echarts);
	export default {
		components:{
			dxTitle
		},
		data() {
			return {
				formAction: '/merchant/count',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					timeQuantum: 1,
					searchType:'thisweek'
				},
				dateShow: false,
				count:{
					shopping_client: 0,
					news_client: 0,
					old_client: 0,
				},
				timeQuantumArr: [{
						label: '本周',
						value: 'thisweek'
					},
					{
						label: '今月',
						value: 'thismonth'
					},
					{
						label: '本季',
						value: 'thisquarter'
					},
					{
						label: '本年',
						value: 'thisyear'
					},
				],
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
					searchType:this.ruleform.searchType
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