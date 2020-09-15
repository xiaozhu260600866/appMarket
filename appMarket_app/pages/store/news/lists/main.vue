<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="bg-f newsLists">
			<dx-list-cell :name="v.content" v-for="v in data.articleLists">
				<view class="date Arial fs-12 fc-9" slot="right">{{v.created_at}}</view>
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
				formAction: '/merchant/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				merchant_id:'',
				getSiteName: this.getSiteName()
				
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
					merchant_id:this.merchant_id
				}).then(msg => {
					this.setTitle(msg.detail.name);
				});
			}
		},
		onLoad(options) {
			this.merchant_id = options.merchant_id;
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
@import url('index.css');
</style>