<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<view class="client_title">
					<view class="name">新老顾客</view>
					<weui-input v-model="ruleform.timeQuantum" name="timeQuantum" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input>
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
						<view slot="right" class="fs-16 Arial fc-3">0</view>
					</dx-title>
				</view>
				<view class="bd-be">
					<dx-title name="本周新增" :nameSize="15">
						<view slot="right" class="fs-16 Arial fc-3">0</view>
					</dx-title>
				</view>
				<view class="ptb50 fs-16 fc-6 text-center">曲线统计图</view>
			</view>
			<view class="bg-f mb12">
				<view class="client_title">
					<view class="name">复购</view>
					<weui-input v-model="ruleform.timeQuantum" name="timeQuantum" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input>
				</view>
				<view class="ptb50 fs-16 fc-6 text-center">扇形统计图</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTitle from "doxinui/components/title/title"
	export default {
		components:{
			dxTitle
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					timeQuantum: 1,
				},
				dateShow: false,
				count:{
					shopping_client: 0,
					news_client: 0,
					old_client: 0,
				},
				timeQuantumArr: [{
						label: '本周',
						value: 1
					},
					{
						label: '本月',
						value: 2
					},
					{
						label: '本季',
						value: 3
					},
					{
						label: '本年',
						value: 4
					},
				],
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