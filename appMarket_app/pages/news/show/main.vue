<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- 该页面的标题，根据文章标题而定 -->
		<view class="content bg-f p15" v-if="data.show">
			<!-- <p class="fs-18 fc-3 lh-24 p15">{{ data.detail.title }}</p> -->
			<view class="con fs-15 fc-3">
				<u-parse :content="data.detail.content" />
			</view>
			<view class="date fs-12 Arial fc-9 pt15">{{data.detail.created_at}}</view>
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
				formAction: '/newShow.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				id:'',
				getSiteName: this.getSiteName(),
				
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
					id:this.id
				}).then(msg => {
					this.setTitle(msg.detail.title)
				});
			}
		},
		onLoad(options) {
			this.id =options.id;
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