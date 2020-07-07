<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.title" placeholder="请输入文章标题" type="text" name="title" datatype="require" maxlength="50"></weui-input>
				<weui-input v-model="ruleform.cover" type="upload" upurl='article' allowUpLoadNum="1" name="cover"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.remark" placeholder="请输入文章内容" type="textarea" name="remark" datatype="require"></weui-input>
			</view>
			<view class="m20" @click="goto('/pages/news/lists/main',1)">
				<dx-button type="success" block>保存</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{}
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