<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="integral-list plr15 ptb10 mb8 bg-f" v-for="(item,key) in integralLists">
			<div class="item">
				<div class="group">
					<p class="fs-15">{{item.source}}</p>
					<p class="Arial fs-12 fc-9">{{item.created_at}}</p>
				</div>
				<p class="Arial fc-red fs-18">{{item.type == 0 ? '+' :'-'}}{{item.integral}}</p>
			</div>
		</div>
		<hasMore :parentData="data"></hasMore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/user/integral-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				integralLists:[{
					source: '购物积分',
					created_at:'2020-07-31 16:27:30',
					type: 0,
					integral: 1
				},{
					source: '兑换商品',
					created_at:'2020-07-25 11:23:13',
					type: 2,
					integral: 1999
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			//this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
		}
	}
</script>
<style scoped="">
@import url("index.css");
</style>