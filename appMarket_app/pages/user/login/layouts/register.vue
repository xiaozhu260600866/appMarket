<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2">
			<view class="bg-f">
				<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone" ></weui-input>
				<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone" action="/sendSms.html"></weui-input>
				<weui-input v-model="ruleform.password" label="密码" datatype="require"  type="password" name="password"></weui-input>
				<weui-input v-model="ruleform.password_confirm" label="确认密码" datatype="require"  type="password" name="password_confirm"></weui-input>
				<weui-input v-model="ruleform.share_code" label="邀请码"   type="number" name="share_code"></weui-input>
			</view>
			<view class="agreement mlr20 mt15 flex-middle fs-13 fc-6">
				<checkbox-group @change="checkboxChange"><checkbox :value="1"/></checkbox-group>
				<view>我已阅读并同意</view>
				<view class="main-color" @click="goto('/pages/news/show/main?id=236',1)">《同城菜场服务协议》</view>
			</view>
			<view class="m20 info-subBtn"><dx-button block size="lg" @click="submit">完成</dx-button></view>
			<view class="m20 info-login" @click="goto('/pages/user/login/main')"><dx-button type="success" block size="lg" plain>立即登录</dx-button></view>
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
				ruleform:{},
				vaildate:{}
			}
		},
		methods: {
			checkboxChange(e){
				let value =  e.mp.detail.value.length;
				this.ruleform.agress = value;
			},
			submit(){
				
				this.vaildForm(this,res=>{
					if(res){
						if(this.ruleform.password != this.ruleform.password_confirm){
							return this.getError("确认密码与密码不一致");
						}
						if (this.ruleform.code != wx.getStorageSync('smsCode')) {
							this.getError("验证码不正确");
							return false;
						}
						if(!this.ruleform.agress){
							this.getError("您还没有同意");
							return false;
						}
						
						;
						this.postAjax("/user/register",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.goto("/pages/user/login/main");
							}
						});
					}
				});
				
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			//#ifdef APP-PLUS
				var info = plus.push.getClientInfo();
				console.log(info);
				this.ruleform.clientid =  info.clientid
			//#endif
			//#ifdef H5
				this.ruleform.clientid = 'c40d1f7e7f75fba524a380adb906ff20'
			//#endif
			//var info = plus.push.getClientInfo();
			//this.ruleform.clientid =  info.clientid
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
@import url('../index.css')
</style>