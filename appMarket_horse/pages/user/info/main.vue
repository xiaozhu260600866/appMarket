<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.IDcard_front" label="身份证人像面" type="upload" upurl='article' allowUpLoadNum="1" name="IDcard_front"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.IDcard_behind" label="身份证国徽面" type="upload" upurl='article' allowUpLoadNum="1" name="IDcard_behind"
				 datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.health_cert" label="健康证" type="upload" upurl='article' allowUpLoadNum="1" name="health_cert"
				 datatype="require"></weui-input>
			</view>
			<view class="m20 info-subBtn" @click="goto('/pages/user/setting/main',2)"><dx-button block>保存</dx-button></view>
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