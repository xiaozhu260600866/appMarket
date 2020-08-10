<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<!-- <view class="m50 text-center fs-14 fc-9">暂无数据</view> -->
		<view>
			<dx-tabs :tabs="navbar" @change="change" selectedColor="#57C734" sliderBgColor="#57C734" :imgWidth="60" :imgHeight="60"></dx-tabs>
			<view class="fin-pro">
				<dx-products-pic  v-for="(v,key) in finProLists" :src="v.cover">
					<view class="info">
						<view class="row title fs-16 wrap2">{{ v.name }}</view>
						<view class="row fs-13 flex-middle">
							<view class="fc-6 mr10">月销<text class="Arial">{{ v.sale_num_ }}</text></view>
							<view class="main-color">新鲜度<text class="Arial">{{ v.fresh }}</text></view>
						</view>
					</view>
				</dx-products-pic>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxProductsPic from "doxinui/components/products/pic"
	export default {
		components:{dxTabs,dxProductsPic},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				navbar:[{
					name:'价格排序',
					value: 0
				},{
					name:'新鲜度排序',
					value: 1
				},{
					name:'销售选择',
					value: 2
				}],
				finProLists:[{
					cover: '/static/pro02.jpg',
					name: '新鲜芒果',
					sale_num_: 10,
					fresh: 8
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