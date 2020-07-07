<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.start_date" label="开始日期" type="date" name="start_date"></weui-input>
				<weui-input v-model="ruleform.end_date" label="结束日期" type="date" name="end_date"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.select_pro" label="商品" type="txt" name="select_pro" arrow @click="goto('/pages/product/lists/main',2)"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.phone" label="优惠力度" placeholder="如：8.8" type="number" name="phone" myclass="right-input">
					<view slot="right">折</view>
				</weui-input>
			</view>
			<view class="plr15 fs-14 ptb10">高级设置（限购）</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.radio" label="限购" type="switch" name="radio" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="每单限购" placeholder="如：1" type="number" name="phone" myclass="right-input">
					<view slot="right">份</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.phone" label="总库存" placeholder="如：50" type="number" name="phone" myclass="right-input">
					<view slot="right">份</view>
				</weui-input>
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
				ruleform:{}
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