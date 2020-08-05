<template>
	<view>
		<view>
			<shop-list :data="shopLists"></shop-list>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>
<script>
import shopList from "components/shop_list.vue"
	export default {
		components:{
			shopList
		},
		data() {
			return {
				formAction: '/user/collection',
				userInfo:{},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				top: 0, //标题图标距离顶部距离
				shopLists:[],
				tabs: [{
					name: "价格最低"
				}, {
					name: "销量最高"
				}, {
					name: "距离最近"
				}],
				silders:[
					{cover:'/static/banner01.jpg'},
					{cover:'/static/banner01.jpg'},
				],
				otherData: {
					city: '江门',
				},
				navGroup:[
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro01.jpg',
						name:'橙'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro02.jpg',
						name:'芒果'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro03.jpg',
						name:'梨'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro01.jpg',
						name:'橙'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro02.jpg',
						name:'芒果'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro03.jpg',
						name:'梨'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro01.jpg',
						name:'橙'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro02.jpg',
						name:'芒果'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro03.jpg',
						name:'梨'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro01.jpg',
						name:'橙'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro02.jpg',
						name:'芒果'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro03.jpg',
						name:'梨'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro01.jpg',
						name:'橙'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro02.jpg',
						name:'芒果'
					},
					{
						url:'/pages/store/lists/main',
						cover:'/static/pro03.jpg',
						name:'梨'
					},
				]
			}
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
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				let tempData = [];
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					if(msg.lists.data.length){
						msg.lists.data.forEach(v=>{
							tempData.push(v.getMerchant);
						});
					}
					this.shopLists = tempData;
				});
			}
			
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>
