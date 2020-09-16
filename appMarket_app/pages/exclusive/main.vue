<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <dx-tabs :tabs="tabs" v-model="status" selectedColor="#57C734" sliderBgColor="#57C734"></dx-tabs> -->
			<dx-tabs :tabs="tabs" v-model="category" @change="ajax" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#57C734" :bold="true" sliderBgColor="rgba(87, 199, 52,0.2)">
			</dx-tabs>
			<store-pro :data="lists.data" :canBuy="false" :imgWidth="100" :imgHeight="100"></store-pro>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
		import storePro from "components/store_pro.vue"
	export default {
		components:{
			dxTabs,storePro
		},
		data() {
			return {
				formAction: '/product/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				category: '正常',
				lists:[],
				tabs:[
					
				],
			}
		},
		methods: {
			ajax() {
				this.postAjax(this.formAction, {
				category:this.category
				}).then(msg => {
					if(this.tabs.length == 0){
						msg.data.tab.forEach(msg=>{
							this.tabs.push(
								{name:msg.label,value:msg.value}
							);
						});
					}
					this.lists = msg.data.lists;
					this.data.show = true;
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
@import url('index.css')
</style>