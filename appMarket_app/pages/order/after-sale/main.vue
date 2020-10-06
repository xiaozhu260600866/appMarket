<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12">
			<view class="block-sec">
				<weui-input v-model="ruleform.after_class" label="申请类型" name="after_class" changeField="value" type="select"
				 dataKey="afterArrClass"></weui-input>
				<weui-input v-model="ruleform.after_status" label="申请原因" name="after_status" changeField="value" type="select"
				 dataKey="statusArr"></weui-input>
				<weui-input v-model="ruleform.after_type" label="申请原因" name="after_type" changeField="value" type="select" dataKey="afterArr"></weui-input>
			</view>
			<!-- <orderPro :data="productsLists" myclass="block-sec"></orderPro> -->
			<view class="block-sec">
				<view class="plr15 pb5">
					<view class="fs-6 lh-40">退款金额</view>
					<view class="fs-24 lh-30">￥13.1</view>
				</view>
				<view class="fs-13 fc-9 bg-f7 lh-30 plr15">若退款成功，退款金额将返还给余额；</view>
			</view>
			<view class="block-sec">
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="必填，请您详细填写申请说明" datatype="require"></weui-input>
				<weui-input v-model="ruleform.logo" type="upload" upurl='article' allowUpLoadNum="5" name="logo" datatype="require"></weui-input>
			</view>
			<view id="order-footer">
				<view class="lprice fs-14 pl20">
					<view v-if="afterStatus == 1">审核中</view>
				</view>
				<view class="rbtn">
					<view class="btn-nav" v-if="afterStatus == 1">撤消售后单</view>
					<view class="btn-nav inbtn" v-if="afterStatus == 0">确认提交</view>
					<view class="btn-nav" v-else>售后完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	export default {
		components:{
			orderPro
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
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
@import url('../buy/index.css')
</style>