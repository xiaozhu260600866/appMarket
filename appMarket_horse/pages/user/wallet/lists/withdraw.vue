<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="flex-middle fc-6 plr15 ptb12">
				<view class="flex1 fs-14 Arial">
					<view>今日收入</view><!-- 当选择日期时这里显示为日期 -->
					<view class="fc-3">￥{{ amount }}</view>
				</view>
				<view>
					<text class="iconfont icon-date fs-17" @click="dataShow = true"></text>
				</view>
			</view>
			<view class="bg-f wallet-order">
				<dx-list-msg v-for="(item,key) in orderLists" :name="item.created_at" :nameSize="15" nameColor="#666" :content="item.store_name" :conSize="15" conColor="#333">
					<view slot="right">
						<view class="price fs-16">-{{item.amount}}</view>
						<view class="status fs-13 fc-6">{{item.status}}</view>
					</view>
				</dx-list-msg>
			</view>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components:{
			dxListMsg
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				amount: 20.00,
				orderLists:[{
					store_name:'提现',
					amount: 100,
					created_at: '2020-06-20',
					status: '审核中'
				},{
					store_name:'提现',
					amount: 120,
					created_at: '2020-06-19',
					status: '已通过'
				},{
					store_name:'提现',
					amount: 100,
					created_at: '2020-06-20',
					status: '已通过'
				},{
					store_name:'提现',
					amount: 120,
					created_at: '2020-06-19',
					status: '已通过'
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