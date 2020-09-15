<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.name" datatype="require" label="优惠券名称" placeholder="输入活动名称，最多12个字" type="text" name="name" myclass="right-input" maxlength="12"></weui-input>
				<weui-input v-model="ruleform.start_date"  datatype="require" label="开始日期" type="date" name="start_date"></weui-input>
				<weui-input v-model="ruleform.end_date"  datatype="require" label="结束日期" type="date" name="end_date" :startDate="ruleform.start_date"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.amount"  datatype="require" label="优惠券面值" placeholder="如：10" type="number" name="amount" myclass="right-input">
					<view slot="right">元</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.condition"   label="使用条件" type="txt" name="condition" myclass="right-input" datatype="require">
					<view slot="middle" class="full_price">
						<weui-input v-model="ruleform.full_amount" datatype="require" label="订单满" placeholder="如：100" type="number" name="full_amount"></weui-input>
					</view>
					<view slot="right">元</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.num" label="总库存"  datatype="require" placeholder="如：50" type="number" name="num" myclass="right-input">
					<view slot="right">张</view>
				</weui-input>
			</view>
			<view class="m20">
				<dx-button type="success" block @click="submit">保存</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/merchant/coupon/edit',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				id:'',
				vaildate:{}
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.ruleform.type = 0;
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							if(msg.data.status == 2){
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
				});
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
				this.ajax();
			}else{
				this.formAction = "/merchant/coupon/create";
			}
			
			
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