<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<!-- <dx-tabs :tabs="tabs" v-model="status" selectedColor="#57C734" sliderBgColor="#57C734"></dx-tabs> -->
			<dx-tabs :tabs="tabs" v-model="status" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#57C734" :bold="true" sliderBgColor="rgba(87, 199, 52,0.2)">
			</dx-tabs>
			<view class="fs-14 text-center ptb50 fc-9">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			dxTabs
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 0,
				tabs:[
					{name:'感冒',value: 0},
					{name:'正常',value: 1},
					{name:'高血压',value: 2},
					{name:'痛风',value: 3},
					{name:'心脏病',value: 4}
				],
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