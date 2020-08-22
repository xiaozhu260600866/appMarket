<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="show">
			<view class="flex-middle fc-6 plr15 ptb12">
				<view class="flex1 fs-15 Arial">
					<view>今日分析</view><!-- 当选择日期时这里显示为日期 -->
				</view>
				<view>
					<text class="iconfont icon-date fs-17" @click="open"></text>
				</view>
			</view>
			<view class="bg-f mb12">
				<echarts :option="options" style="height: 300px;" ></echarts>
			</view>
			<view class="bg-f mb12">
				<view class="plr15 ptb10 fs-15 fc-3">订单分析</view>
				<view class="count">
					<view class="c-item">
						<view class="name">完成订单</view>
						<view class="num">{{data.orderCount}}</view>
					</view>
					<view class="c-item">
						<view class="name">取消订单</view>
						<view class="num">{{data.cancelOrderCount}}</view>
					</view>
					<view class="c-item">
						<view class="name">客单均价</view>
						<view class="num">{{ data.orderAvg }}</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12" @click="goto('/pages/user/wallet/lists/main',1)">
				<dx-title name="今日支出" :nameSize="15" arrow>
					<view slot="right" class="fs-16 Arial fc-3">{{data.outCount}}</view>
				</dx-title>
			</view>
			<dx-date :insert="false" :start-date="'1900-01-01'" ref="calendar" :end-date="'2099-12-30'"  @confirm="confirm"></dx-date>
		</view>
	</view>
</template>

<script>
	import dxDate from '@/components/date/uni-calendar.vue'
	import dxTitle from "doxinui/components/title/title"
	import echarts from '@/components/echarts/echarts.vue'
	export default {
		components:{
			dxDate,dxTitle,echarts
		},
		data() {
			return {
				formAction: '/merchant/count',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				searchData:this.dateToString(new Date()),
				show: false,
				options:{},
				count:{
					success_order: 0,
					cancle_order: 0,
					average_price: 0,
				}
			}
		},
		methods: {
			open(){
			      this.$refs.calendar.open();
			},
			confirm(e){
				this.searchData = e.fulldate;
				this.ajax();
			},
			ajax() {
				this.getAjaxForApp(this, {searchData:this.searchData
				
				}).then(msg => {
					this.options = {
						color: ['#3398DB'],
						title: { text: '订单金额', textStyle: { fontSize: 15 }, left: 'center', top: "20px" },
						tooltip: {},
						xAxis: {
							data: this.data.data.order.name
						},
						yAxis: {},
						series: [{
							name: '人数',
							type: 'bar',
							data: this.data.data.order.value
						}]
					};
					this.show = true;
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