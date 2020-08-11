<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.start_date"  datatype="require" label="开始日期" type="date" name="start_date"></weui-input>
					<weui-input v-model="ruleform.end_date"  datatype="require" label="结束日期" type="date" name="end_date" :startDate="ruleform.start_date"></weui-input>
				
			</view>
			<view class="bg-f mb12" @click="goto('/pages/product/lists/main?type=select&coupon_id='+id,1)">
				<weui-input v-model="ruleform.product_name" label="商品" type="txt" name="product_name" arrow ></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.discount" datatype="require" label="优惠力度" placeholder="如：8.8" type="number" name="discount" myclass="right-input">
					<view slot="right">折</view>
				</weui-input>
			</view>
			<view class="plr15 fs-14 ptb10">高级设置（限购）</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.limit_buy"  label="限购" type="switch" name="limit_buy" datatype="require"></weui-input>
				<weui-input v-model="ruleform.buy_num" datatype="require" label="每单限购" placeholder="如：1" type="number" name="buy_num" myclass="right-input" v-if="ruleform.limit_buy">
					<view slot="right">份</view>
				</weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.num" datatype="require"  label="总库存" placeholder="如：50" type="number" name="num" myclass="right-input">
					<view slot="right">份</view>
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
				vaildate:{}
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						if(!this.ruleform.product_name){
							this.getError("请选择商品");
							return false;
						}
						this.ruleform.type = 1;
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
					if(this.ruleform.product_name){
						for (let key in msg.detail) {
							if(key !='product_str' && key !='product_id'){
								this.ruleform[key] = msg.detail[key];
							}
						}
					}else{
						this.ruleform = msg.detail;
					}
					
				});
			}
		},
		onLoad(options) {
			if(options.product_name){
				this.ruleform.product_name = options.product_name;
				this.ruleform.product_str = options.product_str;
			}
			if(options.id){
				this.id = options.id;
				this.ajax();
			}else{
				this.formAction = "/merchant/coupon/create";
			}
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