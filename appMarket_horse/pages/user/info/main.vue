<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form" v-if="data.show">
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.idCard" label="身份证人像面" type="upload" upurl='horses' allowUpLoadNum="1" name="idCard"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.idCard2" label="身份证国徽面" type="upload" upurl='horses' allowUpLoadNum="1" name="idCard2"
				 datatype="require"></weui-input>
			</view>
			<!-- <view class="bg-f mb12">
				<weui-input v-model="ruleform.health_logo" label="健康证" type="upload" upurl='horses' allowUpLoadNum="1" name="health_logo"
				 datatype="require"></weui-input>
			</view> -->
			<view class="m20" @click="goto('/pages/user/setting/main',2)"><dx-button type="success" block size="lg">保存</dx-button></view>
			<view class="m20" @click="goto('/pages/user/setting/main',2)"><dx-button type="success" block size="lg" hollow @click="lgout">退出</dx-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/horse/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{}
			}
		},
		methods: {
			lgout(){
				this.getConfirm("是否确认退出登录",()=>{
					this.postAjax("/horse/lgout").then(msg=>{
						if(msg.data.status == 2){
							uni.removeStorageSync('userInfo');
							this.goto("/pages/user/login/main");
						}
					});
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.ruleform = msg.detail;
					this.ruleform.idCard = this.ruleform.idCard ? this.ruleform.idCard.split(",") :[];
					this.ruleform.idCard2 = this.ruleform.idCard2 ? this.ruleform.idCard2.split(",") :[];
					
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
@import url('index.css')
</style>