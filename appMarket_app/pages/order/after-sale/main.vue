<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12">
			<orderPro :data="productsLists" myclass="block-sec"></orderPro>
			<view class="block-sec">
				<weui-input v-model="ruleform.after_type" label="售后类型" name="after_type" changeField="value" type="select" dataKey="afterArr"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="必填，请您详细填写申请说明" datatype="require"></weui-input>
				<weui-input v-model="ruleform.logo" type="upload" upurl='article' allowUpLoadNum="5" name="logo" datatype="require"></weui-input>
			</view>
			<view id="order-footer">
				<view class="lprice fs-14 pl10"></view>
				<view class="rbtn">
					<view class="btn-nav">撤消售后单</view>
					<view class="btn-nav">售后完成</view>
					<view class="btn-nav inbtn">确认提交</view>
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