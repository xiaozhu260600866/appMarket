<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="evaluate">
				<view class="evGroup" v-if="ruleform.getHorse">
					<dx-list-cell :name="ruleform.getHorse.name" :imgSrc="ruleform.getHorse.getUser.headerPic" imgWidth="36" imgHeight="36" imgR="18" noborder></dx-list-cell>
					<dx-list-cell name="评价" iconSize="18" iconColor="#ff721f" padding="0 30rpx">
					　　<view slot="right">
							<tui-rate v-model="ruleform.horse_quote" :hollow="true" :disabled="ruleform.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<weui-input v-model="ruleform.house_evaluate" placeholder="请输入评价内容" type="textarea" name="house_evaluate" 
					 :disabled="ruleform.suggestStatus == 1 ? true :false"></weui-input>
				</view>
				<view class="evGroup" v-if="ruleform.getMerchant">
					<dx-list-cell :name="ruleform.getMerchant.name" :imgSrc="ruleform.getMerchant.getUser.headerPic" imgWidth="36" imgHeight="36" imgR="18" noborder></dx-list-cell>
					<dx-list-cell name="评价" iconSize="18" iconColor="#ff721f" padding="0 30rpx">
					　　<view slot="right">
							<tui-rate v-model="ruleform.merchant_quote" :hollow="true" :disabled="ruleform.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<weui-input v-model="ruleform.merchant_evaluate" placeholder="请输入评价内容" type="textarea" name="merchant_evaluate" 
					 :disabled="ruleform.suggestStatus == 1 ? true :false"></weui-input>
					<weui-input v-model="ruleform.merchant_evaluate_logo" type="upload" upurl='order' allowUpLoadNum="5" name="merchant_evaluate_logo" datatype="require"
					 :disabled="ruleform.suggestStatus == 1 ? true :false"></weui-input>
				</view>
				<view class="m20" @click="submit()" v-if="ruleform.suggestStatus == 0">
					<dx-button type="primary" btnBg="#57C734" btnBd="#57c734" size="lg" block>提交</dx-button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components: {
			tuiRate,
			dxListCell
		},
		data() {
			return {
				formAction: '/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				order_no:''
				
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						console.log(this.ruleform);
						if(this.ruleform.getHorse && this.ruleform.horse_quote == 0){
							this.getError("请评价骑手");
							return false;
						}
						if(this.ruleform.merchant_quote == 0){
							this.getError("请评价商家");
							return false;
						}
						this.postAjax("/order/evaluate",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.back();
							}
						});
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
					order_no:this.order_no
				}).then(msg => {
					this.ruleform = msg.detail;
					this.ruleform.merchant_evaluate_logo = this.ruleform.merchant_evaluate_logo ? this.ruleform.merchant_evaluate_logo.split(','):[]
				});
			}
		},
		onLoad(options) {
			this.order_no = options.order_no;
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