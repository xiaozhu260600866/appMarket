<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.start_date" label="开始日期" type="date" name="start_date"></weui-input>
				<weui-input v-model="ruleform.end_date" label="结束日期" type="date" name="end_date"></weui-input>
			</view>
			<view class="bg-f mb12 full-group p15">
				<view class="row">
					<view class="sort">1、</view>
					<view class="right">
						<view class="letter">满</view>
						<weui-input v-model="ruleform.full_price" placeholder=" " type="number" name="full_price"></weui-input>
						<view class="letter">减</view>
						<weui-input v-model="ruleform.minus_price" placeholder=" " type="number" name="minus_price"></weui-input>
					</view>
				</view>
				<view class="row">
					<view class="sort">2、</view>
					<view class="right">
						<view class="letter">满</view>
						<weui-input v-model="ruleform.full_price" placeholder=" " type="number" name="full_price"></weui-input>
						<view class="letter">减</view>
						<weui-input v-model="ruleform.minus_price" placeholder=" " type="number" name="minus_price"></weui-input>
					</view>
				</view>
				<view class="text-right"><dx-button size="small" myclass="mt20">新增</dx-button></view>
			</view>
			<view class="m20">
				<dx-button type="success" block>保存</dx-button>
			</view>
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