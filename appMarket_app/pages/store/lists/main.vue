<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<shop-list :data="data.lists.data"></shop-list>
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
				formAction: '/merchant.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				product_class:1,
				shopLists:[{
					cover:'/static/banner01.jpg',
					title:'蔬菜CC店',
					status:'营业中',
					grade:4,
					amount:0,
					distance:3.5,
					hour: 0,
					minute: 35,
					businessHours: '08:10-18:00'
				},{
					cover:'/static/banner01.jpg',
					title:'蔬菜CC店',
					status:'营业中',
					grade:4,
					amount:0,
					distance:3.5,
					hour: 0,
					minute: 35,
					businessHours: '08:10-18:00'
				},{
					cover:'/static/banner01.jpg',
					title:'蔬菜CC店',
					status:'营业中',
					grade:4,
					amount:0,
					distance:3.5,
					hour: 0,
					minute: 35,
					businessHours: '08:10-18:00'
				},{
					cover:'/static/banner01.jpg',
					title:'蔬菜CC店',
					status:'营业中',
					grade:4,
					amount:0,
					distance:3.5,
					hour: 0,
					minute: 35,
					businessHours: '08:10-18:00'
				},{
					cover:'/static/banner01.jpg',
					title:'蔬菜CC店',
					status:'营业中',
					grade:4,
					amount:0,
					distance:3.5,
					hour: 0,
					minute: 35,
					businessHours: '08:10-18:00'
				}],
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {product_class:this.product_class
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			this.product_class = options.product_class;
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