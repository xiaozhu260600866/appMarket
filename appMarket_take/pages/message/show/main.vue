<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="bg-f ndetail">
			<dx-list-msg :name="v.title" :content="v.content"  v-for="(v,key) in detailLists" :conTop="5">
				<view slot="left">
					<view class="licon"></view>
				</view>
				<view slot="right">
					<view class="time fs-13 Arial fc-6 lh-20">{{ v.create_at }}</view>
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detailLists:[{
					title: '您的账号已审核成功',
					content: '您的账号已审核成功',
					create_at: '06-17 16:51'
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