<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- 该页面的标题，根据文章标题而定 -->
		<view class="content bg-f p15">
			<!-- <p class="fs-18 fc-3 lh-24 p15">{{ data.detail.title }}</p> -->
			<view class="con fs-15 fc-3">
				<u-parse :content="detail.content" />
			</view>
			<view class="date fs-12 Arial fc-9 pt15">{{detail.create_at}}</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse,
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail:{
					content:'今天开业大优惠，所有产品5折起，满送满减优惠同时进行，欢迎大家前来选购',
					create_at:'2020-08-20 07:00'
				}
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