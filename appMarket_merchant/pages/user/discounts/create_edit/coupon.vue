<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.name" label="门店名称" placeholder="输入活动名称，最多12个字" type="text" name="name" myclass="right-input" maxlength="12"></weui-input>
				<weui-input v-model="ruleform.start_date" label="开始日期" type="date" name="start_date"></weui-input>
				<weui-input v-model="ruleform.end_date" label="结束日期" type="date" name="end_date"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.price" label="优惠券面值" placeholder="如：10" type="number" name="price" myclass="right-input">
					<view slot="right">元</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.condition" label="使用条件" type="txt" name="condition" myclass="right-input">
					<view slot="middle" class="full_price">
						<weui-input v-model="ruleform.full_price" label="订单满" placeholder="如：100" type="number" name="full_price"></weui-input>
					</view>
					<view slot="right">元</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.stock" label="总库存" placeholder="如：50" type="number" name="stock" myclass="right-input">
					<view slot="right">张</view>
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
@import url('./index.css')
</style>