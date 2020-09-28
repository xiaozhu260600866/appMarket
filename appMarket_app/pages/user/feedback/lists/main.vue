<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="tabs" v-model="type" selectedColor="#57C734" sliderBgColor="#57C734" :size="30" :height="88"></dx-tabs>
			<view class="sugges-lists">
				<view class="block-sec item">
					<view class="top">
						<view class="time">
							提交时间：<text class="Arial">2020-09-08 11:34:52</text>
						</view>
						<view class="status flex-middle">
							<text class="main-color">待处理</text>
							<view class="pl8">
								<view class="del-icon bg-f3 dxi-icon dxi-icon-del fs-14" @click="delOrder(parent)"></view>
							</view>
						</view>
					</view>
					<view class="con">
						<view class="content">优惠券已领取，但不能使用</view>
						<dx-images :data="imgLists"></dx-images>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{dxTabs,dxImages},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{name: "待处理",value:0,},
					{name: "已处理",value:1},
				],
				imgLists:[
					{img:"/static/pro01.jpg"},
					{img:"/static/pro02.jpg"},
					{img:"/static/pro03.jpg"},
				]
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