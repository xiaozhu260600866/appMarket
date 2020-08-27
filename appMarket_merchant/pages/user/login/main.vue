<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="zindex2">
			<view class="logo">
				<img class="img" :src="login.src">
			</view>
			<view class="mlr30">
				<view class="login-list">
					<weui-input v-model="ruleform.username" placeholder="手机号码" type="number" myclass="plr0" name="username" datatype="require|phone">
						<view slot="left" class="slot-icon">
							<view class="iconfont icon-login-phone"></view>
						</view>
					</weui-input>
					<weui-input v-model="ruleform.password" placeholder="请输入密码" type="password" myclass="plr0" name="password" datatype="require">
						<view slot="left" class="slot-icon">
							<view class="iconfont icon-login-passwork"></view>
						</view>
					</weui-input>
				</view>
				<view class="mt30">
					<dx-button type="success" size="lg" block @click="submit">登录</dx-button>
				</view>
				<view class="flex-between flex-middle mt15 fc-6 fs-14">
					<view @click="goto('/pages/user/login/layouts/password',1)">忘记密码</view>
					<view @click="goto('/pages/user/login/layouts/register',1)">快速注册</view>
				</view>
				<!-- <view class="mt15 other-type">
					<dx-divider :border="true">其它登录方式</dx-divider>
					<view class="wechat mt10" @click="wechatAuth"><text class="dxi-icon dxi-icon-wechat"></text></view>
				</view> -->
			</view>
			<view class="footer-agreement fc-8">
				<view>登录即同意</view>
				<view class="main-color" @click="goto('/pages/news/show/main',1)">同城菜场服务条款</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxDivider from "doxinui/components/divider/divider"
	export default {
		components:{
			dxDivider
		},
		data() {
			return {
				formAction: '/category',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				login:{
					src:'https://appmarket.doxinsoft.com/images/wap/logo.png'
				}
			}
		},
		
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax("/merchant/login",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								 uni.setStorageSync('userInfo',msg.data.user);
								 uni.setStorageSync('openid',msg.data.user.clientid);
								 this.$store.state.mutations.userInfo=msg.data.user;
								 this.$store.state.mutations.openid=msg.data.user.clientid;
								 setTimeout(()=>{
									  this.goto("/pages/index/main",2);
								 },1000);
								
							}
						});
					}
				});
				
			},
			wechatAuth(){
				this.wechatLogin().then(msg=>{
					
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
			this.ruleform.clientid = info.clientid
			//#endif
			//#ifdef H5
			this.ruleform.clientid = '671e8d9c8ec68bc782a581a9fdbf1798'
			//#endif
			console.log(this.ruleform);
			//this.getError(uni.getStorageSync('openid') + '1');
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