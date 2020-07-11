<template>
	<view>
		<view class="m30 text-center fs-14 fc-9">
			<!-- <shop-list :data="shopLists"></shop-list> -->
			暂无数据
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
				formAction: '/wapindex',
				userInfo:{},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				top: 0, //标题图标距离顶部距离
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
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
				}
			})
			//this.ajax();
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
			toWechat() {
				console.log("101");
				this.wechatLogin().then(msg=>{
					this.userInfo = msg;
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.setTitle("你好");
				});
			}
			
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>
