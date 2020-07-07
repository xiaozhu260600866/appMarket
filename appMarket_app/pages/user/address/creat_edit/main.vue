<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="text" name="phone" datatype="require|phone"></weui-input>
				<dx-address v-model="ruleform.address" datatype="require" ref="address"></dx-address>
				<weui-input v-model="ruleform.default" label="默认" type="switch" name="default"></weui-input>
			</view>
		</view>
		<view @click="submit">
			<dxftButton type="success" btnBg="#57C734" btnBd="#57C734"><text class="dxi-icon dxi-icon-add pr10"></text>添加地址</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxftButton
		},
		data() {
			return {
				formAction: '/user/address/edit',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				id:'',
				vaildate:{},
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								let order = uni.getStorageSync('order');
								if (order) {
									let address_id = msg.data.id;
									this.goto("/pages/order/buy/main?address_id=" + address_id);
								}else{
									this.back();
								}
							}
							
						});
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {id:this.id
					
				}).then(msg => {
					this.ruleform = msg.detail;
				});
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
				this.formAction = "/user/address/edit";
				this.ajax();
			}else{
				this.formAction = "/user/address/create";
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
@import url('index.css')
</style>