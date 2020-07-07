<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form" v-if="data.show">
			<view class="bg-f">
				<weui-input v-model="ruleform.header" label="头像" type="txt" name="header" myclass="headerPic" >
					<view slot="right">
						<image :src="ruleform.pic  || 'https://boss.doxinsoft.com/images/nouser01.png'" class="img" @click="uploadHeaderImg"></image>
					</view>
				</weui-input>
				<view @click="goto('/pages/user/info/layouts/nickName',1)">
					<weui-input v-model="ruleform.nickname" label="昵称" type="txt" name="nickname"></weui-input>
				</view>
				<view class="info-sec-title">偏好设置</view>
				<weui-input v-model="ruleform.weight" label="重量偏差" name="weight" changeField="value" type="select" dataKey="weightArr" @callback="submit"></weui-input>
				<weui-input v-model="ruleform.health" label="身体状况" name="health" changeField="value" type="select" dataKey="healthArr" @callback="submit"></weui-input>
				<view class="info-sec-title">安全设置</view>
				<view @click="goto('/pages/user/info/layouts/loginPassword',1)">
					<weui-input v-model="ruleform.loginPassword" label="登录密码" type="txt" name="loginPassword"></weui-input>
				</view>
				<view @click="goto('/pages/user/info/layouts/identity',1)">
					<weui-input v-model="ruleform.payPassword" label="支付密码" type="txt" name="payPassword"></weui-input>
				</view>
				<view class="info-sec-title">安全设置</view>
				<view @click="goto('/pages/user/info/layouts/phone',1)">
					<weui-input v-model="ruleform.phone" label="手机绑定" type="txt" name="phone"></weui-input>
				</view>
				<weui-input v-model="ruleform.wechat" label="微信绑定" type="txt" name="wechat"></weui-input>
				
			</view>
			<view class="login_out" @click="lgout">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
				
				},
				weightArr: [{
					label: '都可以接受',
					value: '都可以接受',
				},{
					label: '只能多',
					value: '只能多',
				},{
					label: '只能少',
					value: '只能少'
				}],
				healthArr: [{
					label: '心脏病',
					value: '心脏病',
				},{
					label: '感冒',
					value: '感冒',
				},{
					label: '正常',
					value: '正常'
				},{
					label: '高血压',
					value: '高血压'
				},{
					label: '痛风',
					value: '痛风'
				}],
			}
		},
		methods: {
			lgout(){
				this.getConfirm("是否确认退出登录",()=>{
					this.postAjax("/user/lgout").then(msg=>{
						if(msg.data.status == 2){
							uni.removeStorageSync('userInfo');
							this.goto("/pages/index/main",2);
						}
					});
				});
			},
			uploadHeaderImg(){
				this.updateHeadImg(res => {
					this.ruleform.pic = res;
					console.log(this.ruleform.pic);
					this.submit();
				});
			},
			submit(){
				this.postAjax("/user/info",this.ruleform).then(msg=>{
					
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.nickname = msg.user.nickname;
					
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