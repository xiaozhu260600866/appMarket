<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2" v-if="data.show">
			<view class="flex-wrap pic_group">
				<view class="pic_row">
					<view class="name">身份证人像面</view>
					<weui-input v-model="ruleform.idCard" type="upload" upurl='horses' name="idCard" disabled="disabled"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">身份证国徽面</view>
					<weui-input v-model="ruleform.idCard2" type="upload" upurl='horses' name="idCard2" disabled="disabled"></weui-input>
				</view>
			</view>
			<!-- <view class="bg-f mb12">
				<weui-input v-model="ruleform.health_logo" label="健康证" type="upload" upurl='horses' allowUpLoadNum="1" name="health_logo"
				 datatype="require"></weui-input>
			</view> -->
			<!-- <view class="m20" @click="goto('/pages/user/setting/main',2)"><dx-button type="success" block size="lg">保存</dx-button></view> -->
			<view class="m20" @click="goto('/pages/user/setting/main',2)"><dx-button type="success" block size="lg" hollow @click="lgout">退出登录</dx-button></view>
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