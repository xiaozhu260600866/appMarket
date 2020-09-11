<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="Lsearch">
				<view class="flex1 pr15"><weui-input v-model="ruleform.name" placeholder="搜索内容" type="text" name="name" datatype="require"></weui-input></view>
				<dx-button type="success" @click="ajax">搜索</dx-button>
			</view>
			
			 <shop-list :data="merchantLists.data"></shop-list>
			<store-pro :data="lists.data" :canBuy="false"></store-pro>
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
				formAction: '/product/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:{data:[]},
				merchantLists:{data:[]},
				ruleform:{name:''}
			}
		},
		methods: {
			ajax() {
				console.log( this.ruleform.name);
				this.postAjax(this.formAction, {
					name:this.ruleform.name
				}).then(msg => {
					this.lists = msg.data.lists;
					this.merchantLists = msg.data.merchantLists;
					this.data.show = true;
				});
			}
		},
		onLoad(options) {
			console.log( options.name);
			this.ruleform.name = options.name;
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