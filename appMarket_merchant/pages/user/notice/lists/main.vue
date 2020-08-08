<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="notice bg-f">
			<dx-list-msg :name="v.type== 0?v.title:'您的订单：'+v.title" content="点击查看" v-for="(v,key) in noticeLists" :conTop="5"
			 @click="goto(v.type==0 ? '/pages/user/notice/show/main' :'/pages/order/detail/main' ,1)">
				<view slot="left">
					<view class="licon" :class="v.type==0?'systemI':'orderI'">
						<text class="iconfont" :class="v.type==0?'icon-notice':'icon-email'"></text>
					</view>
				</view>
				<view slot="right" class="text-center">
					<view class="time fs-13 Arial fc-6 lh-20">{{ v.create_at }}</view>
					<view class="status fs-13 mt5 lh-16 main-color" v-if="v.type==1">支付成功</view>
				</view>
			</dx-list-msg>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components:{
			dxListMsg
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				noticeLists:[{
					type: 0,
					title: '您的账号已审核成功',
					create_at: '2020-06-17'
				},{
					type: 1,
					title: 708022200300031103,
					create_at: '2020-06-17'
				}]
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