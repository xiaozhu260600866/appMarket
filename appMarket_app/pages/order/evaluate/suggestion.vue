<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f">
				<weui-input v-model="ruleform.suggestionContent" placeholder="输入您的意见或建议" type="textarea" name="replyContent" datatype="require"></weui-input>
			</view>
			<view class="m20" @click="goto('/pages/order/lists/main',1)"><dx-button type="success" size="lg" block>提交</dx-button></view>
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
		
	}
</script>

<style scoped="">
@import url('index.css');
</style>