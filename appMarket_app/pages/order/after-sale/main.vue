<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12">
			<orderPro :data="productsLists" myclass="block-sec"></orderPro>
			<!-- <view class="block-sec">
				<view class="plr15 pb5">
					<view class="fs-6 lh-40">退款金额</view>
					<view class="fs-24 lh-30">￥13.1</view>
				</view>
				<view class="fs-13 fc-9 bg-f7 lh-30 plr15">若退款成功，退款金额将返还给余额；</view>
			</view> -->
			<view class="block-sec">
				<weui-input v-model="ruleform.after_class" label="申请类型" name="after_class" changeField="value" type="select"
				 dataKey="afterArrClass"></weui-input>
				<weui-input v-model="ruleform.after_type" label="申请原因" name="after_type" changeField="value" type="select" dataKey="afterArr"></weui-input>
			</view>
			<view class="block-sec">
				<view class="plr15 pt10 fs-15 fc-3">申请说明</view>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="请您详细填写申请说明" datatype="require"></weui-input>
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
				afterArrClass: [
					{label: '退货退款',value: 1},
					{label: '退款无需退货',value: 2},
				],
				afterArr: [
					{label: '商家产品不新鲜',value: 1},
					{label: '缺斤少量',value: 2},
					{label: '商家与描述不符',value: 3},
					{label: '其它',value: 4},
				],
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