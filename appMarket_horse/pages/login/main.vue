<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="logo">
				<img class="img" :src="login.src">
			</view>
			<view class="mlr30">
				<view class="login-list">
					<weui-input v-model="ruleform.username" placeholder="手机号码" type="number" myclass="plr0" name="username" datatype="require|phone"></weui-input>
					<weui-input v-model="ruleform.password" placeholder="请输入密码" type="password" myclass="plr0" name="password" datatype="require"></weui-input>
				</view>
				<view class="mt30">
					<dx-button type="success" block>登录</dx-button>
				</view>
				<view class="flex-between flex-middle mt15 fc-6 fs-14">
					<view @click="goto('/pages/login/layouts/password',1)">忘记密码</view>
					<view @click="goto('/pages/login/layouts/register',1)">快速注册</view>
				</view>
				<view class="mt15 other-type">
					<dx-divider>其它登录方式</dx-divider>
					<view class="wechat mt10"><text class="dxi-icon dxi-icon-wechat"></text></view>
				</view>
			</view>
			<view class="footer-agreement fc-8">
				<view>登录即同意</view>
				<view class="fc-3" @click="goto('/pages/news/show/main',1)">同城菜场服务条款</view>
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				login:{
					src:'static/banner01.jpg'
				}
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