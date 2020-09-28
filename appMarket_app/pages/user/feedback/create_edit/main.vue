<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="sugges-write">
			<view class="group">
				<view class="g_title">反馈内容</view>
				<weui-input v-model="ruleform.remark" type="textarea" myclass="remark" name="remark" datatype="require" placeholder="请填写反馈内容"></weui-input>
			</view>
			<view class="group">
				<view class="g_title">图片上传</view>
				<weui-input v-model="ruleform.pic" type="upload" myclass="pic" upurl='article' allowUpLoadNum="5" name="pic" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.phone" label="手机号码" type="text" name="phone"></weui-input>
			</view>
			<view class="tips">温馨提示：请详细描述系统出现的异常问题，并上传相关截图，以方便我们快速解决问题哦~</view>
			<dxftButton type="success" size="lg">确认</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
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
@import url('index.css');
</style>