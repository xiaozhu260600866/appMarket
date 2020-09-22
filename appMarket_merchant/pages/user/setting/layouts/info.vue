<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.market_id" label="市场" name="market_id" changeField="value" type="select" dataKey="marketArr"></weui-input>
				<weui-input v-model="ruleform.name" label="店铺名称" type="text" name="name" maxlength="30" datatype="require"></weui-input>
				<weui-input v-model="ruleform.logo" label="店铺照片" type="upload" upurl='merchant' allowUpLoadNum="1" name="logo" datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" placeholder="请输入店铺介绍" type="textarea" name="remark" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.phone" label="联系方式" type="number" name="phone" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12 address">
				<weui-input v-model="ruleform.address" label="店铺地址" type="location" name="address"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.hour_time_start" label="营业开始时间" type="time" name="hour_time_start"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.hour_time_end" label="营业结束时间" type="time" name="hour_time_end"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.order_amount" label="起订金额" type="number" name="order_amount"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.appointment" label="接受预定" type="switch" name="appointment" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.auto_order" label="自动接单" type="switch" name="auto_order" datatype="require"></weui-input>
			</view>
			<view class="m20 info-subBtn" @click="submit"><dx-button block>保存</dx-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/merchant/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				marketArr:[{
					value: 1,
					label: '北郊市场'
				},{
					value: 2,
					label: '永利商场'
				},{
					value: 3,
					label: '贯溪综合市场'
				}]
			}
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if (res) {
						this.postAjax("/merchant/info", this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								if(this.ruleform.auto_order){
									uni.setStorageSync('auto_order', 1);
								}else{
									uni.removeStorageSync('auto_order');
								}
								this.back();
							}
						});
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.ruleform = msg.detail;
					this.ruleform.logo =  this.ruleform.logo ? this.ruleform.logo.split(',') :[];
					
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
@import url('../index.css')
</style>