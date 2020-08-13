<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2">
			<view class="flex-wrap pic_group">
				<view class="pic_row">
					<view class="name">身份证人像面</view>
					<weui-input v-model="ruleform.IDcard_front" type="upload" upurl='article' name="IDcard_front" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">身份证国徽面</view>
					<weui-input v-model="ruleform.IDcard_behind" type="upload" upurl='article' name="IDcard_behind" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">营业执照</view>
					<weui-input v-model="ruleform.business_license" type="upload" upurl='article' name="business_license" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">健康证</view>
					<weui-input v-model="ruleform.health_logo" type="upload" upurl='article' name="health_logo" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
			</view>
			<view class="m20 info-subBtn" @click="goto('/pages/user/setting/main',2)"><dx-button size="lg" block>保存</dx-button></view>
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
@import url('../index.css');
</style>