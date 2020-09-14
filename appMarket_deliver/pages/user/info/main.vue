<template>
	<view>
		<!-- <view class="bg-white"></view> -->
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2" v-if="data.show">
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="txt" name="phone"></weui-input>
				<weui-input v-model="ruleform.cityString" label="地区" type="txt" name="cityString"></weui-input>
				<weui-input v-model="ruleform.address" label="地点" type="location" name="address"></weui-input>
			</view>
			<view class="flex-wrap pic_group bg-f">
				<view class="pic_row">
					<view class="name">身份证人像面</view>
					<weui-input v-model="ruleform.idCard" type="upload" upurl='deliver' name="idCard" disabled="disabled"></weui-input>
				</view>
				<view class="pic_row">
					<view class="name">身份证国徽面</view>
					<weui-input v-model="ruleform.idCard2" type="upload" upurl='deliver' name="idCard2" disabled="disabled"></weui-input>
				</view>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.logo" label="logo" type="upload" upurl='deliver' allowUpLoadNum="1" name="logo"
				 ></weui-input>
			</view>
			<view class="m20" @click="submit"><dx-button type="success" block size="lg">保存</dx-button></view>
			<view class="m20" ><dx-button type="success" block size="lg" hollow @click="lgout">退出登录</dx-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/deliver/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{}
			}
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if (res) {
						this.postAjax("/deliver/info", this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.back();
							}
						});
					}
				});
			},
			lgout(){
				this.getConfirm("是否确认退出登录",()=>{
					this.postAjax("/deliver/lgout").then(msg=>{
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
					this.ruleform.logo = this.ruleform.logo ? this.ruleform.logo.split(",") :[];
					
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