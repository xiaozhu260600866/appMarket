<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- 该页面的标题，根据文章标题而定 -->
		<div class="content bg-f">
			<!-- <p class="fs-18 fc-3 lh-24 p15">{{ data.detail.title }}</p> -->
			<div class="plr15" v-if="newsShow == true">
				<p class="fs-18 ptb10 lh-24">{{ detail.title }}</p>
				<p class="fs-13 fc-9">{{detail.storeName}}　{{ detail.getTime }} </p>
			</div>
			<div class="con p15 fs-15 fc-3">
				<u-parse :content="detail.content" />
			</div>
		</div>
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
				newsShow: false,
				detail:{
					title:'新鲜菜品直接送达家门口',
					storeName: '东风生鲜',
					getTime: '2020-06-10',
					content:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
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