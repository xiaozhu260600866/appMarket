<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb20">
			<view class="icome-group" v-for="(v,index) in icomeLists">
				<view class="flex-middle fc-6 plr15 ptb10">
					<view class="flex1 fs-14 Arial">
						<view>{{ v.time }}</view><!-- 如果time等于今日日期，则显示为今日，否则显示日期 -->
						<view class="fc-3">￥{{ v.amount }}</view>
					</view>
					<view v-if="index == 0">
						<text class="iconfont icon-date fs-17" @click="dateShow = true"></text>
					</view>
				</view>
				<view class="bg-f wallet-order">
					<dx-list-msg v-for="(item,key) in v.orderLists" :name="item.created_at" :nameSize="15" nameColor="#666" :content="item.store_name" :conSize="15" conColor="#333">
						<view slot="right">
							<view class="price fs-16">+{{item.amount}}</view>
						</view>
					</dx-list-msg>
				</view>
			</view>
			<dx-date :insert="true" :start-date="'1900-01-01'" :end-date="'2099-12-30'" @change="change" v-if="dateShow == true"></dx-date>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxDate from '@/components/date/uni-calendar.vue'
	export default {
		components:{
			dxListMsg,
			dxDate
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dateShow:false,
				icomeLists:[{
					time: '今日',
					amount: 20.00,
					orderLists:[{
						store_name:'东风生鲜',
						amount: 20.00,
						created_at: '2020-06-20'
					}]
				},{
					time: '2020-08-10',
					amount: 14.20,
					orderLists:[{
						store_name:'北郊海鲜配送',
						amount: 1.60,
						created_at: '2020-08-10'
					},{
						store_name:'顺达生鲜',
						amount: 6.70,
						created_at: '2020-08-10'
					},{
						store_name:'简记商行',
						amount: 2.40,
						created_at: '2020-08-10'
					},{
						store_name:'东风生鲜',
						amount: 3.50,
						created_at: '2020-08-10'
					}]
				},{
					time: '2020-08-09',
					amount: 5.30,
					orderLists:[{
						store_name:'顺达生鲜',
						amount: 3.30,
						created_at: '2020-08-10'
					},{
						store_name:'简记商行',
						amount: 2.00,
						created_at: '2020-08-10'
					}]
				}]
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