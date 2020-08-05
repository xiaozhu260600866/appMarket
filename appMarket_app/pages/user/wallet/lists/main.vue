<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="bg-f wallet-order" v-if="data.show">
			<dx-list-msg v-for="(item,key) in data.lists.data" :name="item.type==0?'充值':'提现'" :nameSize="15" :content="item.type==0?'+'+item.amount:'-'+item.amount"
			 :conSize="15" conColor="#333">
				<view slot="right">
					<view class="right-box text-right fc-9">
						<view class="time Arial fs-13">{{item.created_at}}</view>
						<!-- <view class="num fs-12">{{item.getStatus}}</view> -->
					</view>
				</view>
			</dx-list-msg>
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
				formAction: '/user/come-out-lists?status=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				orderLists:[{
					type: 0,
					amount: 100,
					created_at: '2020-06-20 14:05:13',
					getStatus: '审核中'
				},{
					type: 1,
					amount: 120,
					created_at: '2020-06-19 14:05:13',
					getStatus: '已完成'
				},{
					type: 0,
					amount: 100,
					created_at: '2020-06-20 14:05:13',
					getStatus: '审核中'
				},{
					type: 1,
					amount: 120,
					created_at: '2020-06-19 14:05:13',
					getStatus: '已完成'
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