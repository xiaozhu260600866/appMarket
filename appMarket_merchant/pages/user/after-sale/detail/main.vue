<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12">
			<view class="block-sec">
				<weui-input v-model="ruleform.after_class" label="申请类型" name="after_class" changeField="value" type="select"
				 dataKey="afterArrClass" disabled="disabled"></weui-input>
				<weui-input v-model="ruleform.after_status" label="收货状态" name="after_status" changeField="value" type="select"
				 dataKey="statusArr" disabled="disabled"></weui-input>
				<weui-input v-model="ruleform.after_type" label="申请原因" name="after_type" changeField="value" type="select" dataKey="afterArr" disabled="disabled"></weui-input>
			</view>
			<view class="block-sec">
				<view class="lh-34 fc-3 fs-13 bd-be plr10">订单号：<text class="Arial">202010060003123</text></view>
				<orderPro :data="productsLists"></orderPro>
			</view>
			<view class="block-sec">
				<view class="plr15 pb10">
					<view class="fs-6 lh-40">退款金额</view>
					<view class="fs-24 lh-30">￥27.8</view>
				</view>
			</view>
			<view class="block-sec">
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="必填，请您详细填写申请说明" datatype="require" disabled="disabled"></weui-input>
				<weui-input v-model="ruleform.logo" type="upload" upurl='article' allowUpLoadNum="5" name="logo" datatype="require"></weui-input>
			</view>
			<view id="order-footer">
				<view class="lprice fs-14 pl20"></view>
				<view class="rbtn">
					<view class="btn-nav nobtn">审核拒绝</view>
					<view class="btn-nav inbtn">审核通过</view>
				</view>
			</view>
			<dx-prompt :open="false" content="是否确认审核通过"></dx-prompt>
			<dx-prompt :open="true" title="拒绝原因">
				<weui-input v-model="ruleform.name" type="text" name="name" datatype="require" placeholder="请填写拒绝原因"></weui-input>
			</dx-prompt>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	import dxPrompt from "doxinui/components/diag/prompt"
	export default {
		components:{orderPro,dxPrompt},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					after_class: 1,
					after_status: 1,
					after_type: 1,
					remark: '菜品已坏了三分之一'
				},
				afterStatus: 0,
				productsLists:[{
					is_info:true,
					attribute:'黄色',
					getProduct:{
						firstCover:'/static/pro01.jpg',
						name:'新鲜甜橙',
					},
					amount: 8.9,
					num: 1
				},{
					is_info:false,
					getProduct:{
						firstCover:'/static/pro02.jpg',
						name:'金煌芒',
					},
					amount: 18.9,
					num: 2
				}],
				afterArrClass: [{
					label: '我要退货退款',
					value: 1
				},
				{
					label: '我要退款（无需退货）',
					value: 2
				}],
				statusArr: [{
					label: '未收到货',
					value: 1
				},
				{
					label: '已忆收到货',
					value: 2
				}],
				afterArr: [{
					label: '拍错/不喜欢/效果不好',
					value: 1
				},
				{
					label: '材质与商品描叙不符',
					value: 2
				},
				{
					label: '大小尺寸与商品描叙不符',
					value: 3
				},
				{
					label: '卖家发错货',
					value: 4
				},
				{
					label: '颜色/款式/描叙不符等等',
					value: 5
				},
				{
					label: '其他',
					value: 6
				}],
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