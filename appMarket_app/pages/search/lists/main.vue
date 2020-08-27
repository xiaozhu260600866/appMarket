<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="Lsearch">
				<view class="flex1 pr15"><weui-input v-model="ruleform.name" placeholder="搜索内容" type="text" name="name" datatype="require"></weui-input></view>
				<dx-button type="success">搜索</dx-button>
			</view>
			<shop-list :data="data.lists.data"></shop-list>
			<store-pro :data="data.isindexLists.data"></store-pro>
		</view>
	</view>
</template>

<script>
	import shopList from "components/shop_list.vue"
	import storePro from "components/store_pro.vue"
	export default {
		components:{shopList,storePro},
		data() {
			return {
				formAction: '/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{}
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
@import url('index.css');
</style>