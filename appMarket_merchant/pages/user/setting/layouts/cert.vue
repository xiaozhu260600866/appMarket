<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2" v-if="data.show">
			<view class="flex-wrap pic_group">
				<view class="pic_row">
					<view class="name">身份证人像面</view>
					<weui-input v-model="ruleform.idCard" type="upload" upurl='merchant' name="idCard" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">身份证国徽面</view>
					<weui-input v-model="ruleform.idCard2" type="upload" upurl='merchant' name="idCard2" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">营业执照</view>
					<weui-input v-model="ruleform.company_logo" type="upload" upurl='merchant' name="company_logo" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">健康证</view>
					<weui-input v-model="ruleform.health_logo" type="upload" upurl='merchant' name="health_logo" disabled="disabled"
					 datatype="require"></weui-input>
				</view>
			</view>
		<!-- 	<view class="m20 info-subBtn" @click="goto('/pages/user/setting/main',2)"><dx-button size="lg" block>保存</dx-button></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/merchant/index',
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
					this.ruleform = msg.detail;
					this.ruleform.idCard =  this.ruleform.idCard ? this.ruleform.idCard.split(',') :[];
					this.ruleform.idCard2 =  this.ruleform.idCard2 ? this.ruleform.idCard2.split(',') :[];
					this.ruleform.company_logo =  this.ruleform.company_logo ? this.ruleform.company_logo.split(',') :[];
					this.ruleform.health_logo =  this.ruleform.health_logo ? this.ruleform.health_logo.split(',') :[];
				});
			}
		},
		onLoad(options) {
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
@import url('../index.css');
</style>