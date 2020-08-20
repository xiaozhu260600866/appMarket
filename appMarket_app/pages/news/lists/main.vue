<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="bg-f newsLists">
			<dx-list-cell :name="v.content" v-for="v in newsLists" @click="goto('/pages/news/show/main',1)">
				<view class="date Arial fs-12 fc-9" slot="right">{{v.create_at}}</view>
			</dx-list-cell>
		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{dxListCell},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				newsLists:[
					{content: '今天开业大优惠，所有产品5折起，满送满减优惠同时进行，欢迎大家前来选购',create_at:'2020-08-20 07:00'},
					{content: '今天开业大优惠，所有产品5折起，满送满减优惠同时进行，欢迎大家前来选购',create_at:'2020-08-20 07:00'},
					{content: '今天开业大优惠，所有产品5折起，满送满减优惠同时进行，欢迎大家前来选购',create_at:'2020-08-20 07:00'},
					{content: '今天开业大优惠，所有产品5折起，满送满减优惠同时进行，欢迎大家前来选购',create_at:'2020-08-20 07:00'},
				]
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
@import url('index.css');
</style>