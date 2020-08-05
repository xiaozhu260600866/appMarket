<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view><!-- v-if="data.show" -->
			<view class="scroller">
				<view class="dis-record-list plr15 ptb10 mb8 bg-f" v-for="item in data.lists.data">
					<view class="group fs-15 flex-between">
						<view class="fs-15">提现</view>
						<view class="fs-15 Arial">-{{item.amount}}</view>
					</view>
					<view class="group fc-9 flex-between">
						<view class="fs-12 Arial">{{item.created_at}}</view>
						<view class="fs-12">{{item.getStatus}}</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data" source="nodata" message="暂无提现记录"></hasMore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/dis/come-out-infos',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				data:{
					lists:{
						data:[{
							amount: 100,
							created_at: '2020-08-01 17:36:26',
							getStatus: '审核通过'
						}]
					}
				}
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>