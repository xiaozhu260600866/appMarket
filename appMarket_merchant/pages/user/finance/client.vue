<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="show">
			<view class="bg-f mb12">
				<view class="client_title">
					<view class="name">新老顾客</view>
					<weui-input v-model="ruleform.searchType" @callback="ajax" name="searchType" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input>
				</view>
				<view class="count">
					<view class="c-item">
						<view class="name">成交顾客数</view>
						<view class="num">{{data.clientCount}}</view>
					</view>
					<view class="c-item">
						<view class="name">新客人数</view>
						<view class="num">{{data.newClientCount}}</view>
					</view>
					<view class="c-item">
						<view class="name">老客人数</view>
						<view class="num">{{ data.oldClientCount }}</view>
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
						<view slot="right" class="fs-16 Arial fc-3 flex1">{{data.weekAddClient}}</view>
					</dx-title>
				</view>
				<echarts :option="options" style="height: 300px;" ></echarts>
			</view>
			<view class="bg-f mb12">
				<view class="client_title">
					<view class="name">复购</view>
					<!-- <weui-input v-model="ruleform.timeQuantum" name="timeQuantum" changeField="value" type="select" dataKey="timeQuantumArr"></weui-input> -->
				</view>
				<echarts :option="options2" style="height: 300px;" ></echarts>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTitle from "doxinui/components/title/title"
	import echarts from '@/components/echarts/echarts.vue'

	console.log(echarts);
	export default {
		components:{
			dxTitle,echarts
		},
		data() {
			return {
				formAction: '/merchant/clientcount',
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
				options:{},
				options2:{},
				show:false,
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
					
						this.options = {
							color: ['#3398DB'],
							title: { text: '新增人数1', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
							tooltip: {},
							xAxis: {
								data: this.data.data.client.name
							},
							yAxis: {},
							series: [{
								name: '人数',
								type: 'bar',
								data: this.data.data.client.value
							}]
						};
						this.options2 = {
							type: 'pie',
							radius: '65%',
							center: ['50%', '50%'],
							selectedMode: 'single',	
						
							series: [{
								name: '人数',
								type: 'pie',
								data: [
									{value:100,name:'复购新客100%'},
									{value:30,name:'复购老客0%'},
								]
							}]
						};
					
					this.show = true;
					console.log(this.options);
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