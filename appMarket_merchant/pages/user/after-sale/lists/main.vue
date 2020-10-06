<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="tabs" v-model="type" selectedColor="#57C734" sliderBgColor="#57C734" :size="30" :height="88"></dx-tabs>
			<view class="after-lists">
				<view class="block-sec item">
					<view class="top">
						<view class="time">
							提交时间：<text class="Arial">2020-09-08 11:34:52</text>
						</view>
						<view class="status flex-middle">
							<text class="main-color">待审核</text>
						</view>
					</view>
					<view class="con">
						<orderPro :data="productsLists" myclass="plr0"></orderPro>
						<view class="text-right fs-14 fc-3 pt8">共退款￥<text class="price fs-16">27.8</text></view>
					</view>
					<view class="reason">
						<view class="label pr10 fc-6">拒绝原因</view>
						<view class="value flex1">经查实出现破损原因是客户不小心导致</view>
					</view>
					<view class="Bbtn">
						<dx-button round size="mini" @click="goto('/pages/user/after-sale/detail/main',1)">查看详情</dx-button>
						<!-- <dx-button round type="danger" size="mini">审核拒绝</dx-button>
						<dx-button round type="success" size="mini">审核通过</dx-button> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import orderPro from "@/components/orderPro";
	export default {
		components:{dxTabs,orderPro},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{name: "待审核",value:0,},
					{name: "审核通过",value:1},
					{name: "审核拒绝",value:2},
				],
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