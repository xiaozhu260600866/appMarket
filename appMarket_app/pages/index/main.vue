<template>
	<view v-if="data.show">
		<page :parentData="data" :formAction="formAction"></page>
		<!-- 头部 -->
		<view class="top-city fc-3 flex-between main-bg wap-top-fixed" :style="{paddingTop:top+'px',}">
			<view class="left-city fs-16 fc-white" @click="goto('/pages/search/searchCity/main',1)">
				{{ otherData.city }}<span class="dxi-icon dxi-icon-down fs-12 pl10"></span>
			</view>
			<view class="right-search fs-12 fc-9 pl15 pr25 lh-30 bdr15 bg-f" @click="goto('/pages/search/products/main',1)">
				<span class="iconfont icon-search fs-14 fc-9 pr10"></span>搜索产品
			</view>
		</view>
		<!-- 滚动图片 -->
		<view class="ibanner bg-f">
			<view class="main-bg banner-bg">
				<view class="main-bg banner-bg-left"></view>
				<view class="main-bg banner-bg-right"></view>
			</view>
			<myswiper :data="data.silders.data"></myswiper>
		</view>
		<!-- 导航 -->
		<dx-nav-class :data="data.location.data" num="5" pageNum="10" :imgWidth="44" :imgHeight="44" :namePTop="0" :isturnpage="false" @click="navGo"></dx-nav-class>
		<!-- 今日特价 -->
		<view class="iSale bg-f m12 bdr6">
			<dx-title name="今日特价" arrow :noborder="true">
				<view slot="left">
					<view class="iconfont icon-index-star-c fc-red fs-18 mr10"></view>
				</view>
				<view slot="right">
					<view class="fs-13 fc-9">更多</view>
				</view>
			</dx-title>
			<dx-products-scroll :data="saleLists" :itemWidth="120" bgColor="transparent" :itemLRMargin="5" imgHeight="172rpx" imgR="12rpx"></dx-products-scroll>
		</view>
		<view class="iad-img">
			<image src="../../static/Iad02.jpg" mode="widthFix" class="img"></image>
		</view>
		<!-- 附近的市场 -->
		<view class="markt-group" v-for="v in marktGroup">
			<view class="markt-ad">
				<image class="flex img" :src="v.adCover" mode="widthFix"></image>
				<view class="info plr15 pt10">
					<view class="name flex-middle">
						<view class="fs-17 fw-bold lh-24">{{ v.markt.name }}</view>
						<view class="ml10 lh-24"><tui-rate :current="v.markt.current" :disabled="true" :score="'0.'+v.markt.score" :size="14"></tui-rate></view>
						<view class="fs-12 pl5 lh-24">{{ v.markt.current }}.{{ v.markt.score }}分</view>
					</view>
					<view class="address fs-13 mtb3"><text class="dxi-icon dxi-icon-location-fill fs-13 pr5"></text>{{ v.markt.address }}</view>
					<view class="remark fs-12">起送<text class="Arial pr10">￥{{ v.markt.send_price }}</text><text class="Arial">{{ v.markt.location }}</text>km</view>
				</view>
			</view>
			<view @click="goto('/pages/product/show/main',1)">
				<dx-products-scroll :data="v.productsLists" bgColor="transparent" myclass="p0 markt-pro" :itemWidth="100" :itemLRMargin="3"></dx-products-scroll>
			</view>
		</view>
		<!-- 市场列表 -->
		<view class="iad-img">
			<image src="../../static/Iad01.png" mode="widthFix" class="img"></image>
		</view>
		<view>
			<dx-tabs-scroll :tabs="tabs" height="52" borderColor="#57C734" curSize="17" curColor="#57C734" curBold="bold" nameSize="15"></dx-tabs-scroll>
			<shop-list :data="data.lists.data"></shop-list>
		</view>
	</view>
</template>

<script>
// import './index.css'
import dxNavClass from "doxinui/components/nav-class/nav-class"
import dxProductsScroll from "doxinui/components/products/scroll"
import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
import shopList from "components/shop_list.vue"
import dxTitle from "doxinui/components/title/title"
import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	export default {
		components:{
			dxNavClass,
			dxProductsScroll,
			shopList,
			dxTabsScroll,
			dxTitle,
			tuiRate
		},
		data() {
			return {
				formAction: '/wapindex',
				userInfo:{},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				top: 0, //标题图标距离顶部距离
				otherData:{
					city:"江门市"
				},
				saleLists: [{
					pic:'/static/pro01.jpg',
					name:'新鲜甜橙',
					price:8.90,
					factory: 9.9,
					self_num_:169
				},{
					pic:'/static/pro02.jpg',
					name:'金煌芒',
					price:7.80,
					factory: 8.80,
					self_num_:169
				},{
					pic:'/static/pro03.jpg',
					name:'库乐勒香梨',
					price:6.80,
					factory: 7.80,
					self_num_:169
				},{
					pic:'/static/pro01.jpg',
					name:'新鲜甜橙',
					price:8.90,
					factory: 9.9,
					self_num_:169
				},{
					pic:'/static/pro02.jpg',
					name:'金煌芒',
					price:7.80,
					factory: 8.80,
					self_num_:169
				},{
					pic:'/static/pro03.jpg',
					name:'库乐勒香梨',
					price:6.80,
					factory: 7.80,
					self_num_:169
				}],
				tabs: [{
					name: "价格最低"
				}, {
					name: "销量最高"
				}, {
					name: "距离最近"
				}],
				marktGroup:[{
					adCover: '/static/market-ad.jpg',
					markt:{
						name: '贯溪市场',
						address: '江门市蓬江区杜阮镇贯溪村',
						send_price: 30,
						location: 3.25,
						current: 4,
						score: 35
					},
					productsLists: [{
						pic:'/static/pro01.jpg',
						name:'新鲜甜橙',
						price:8.90,
						factory: 9.9,
						self_num_:169
					},{
						pic:'/static/pro02.jpg',
						name:'金煌芒',
						price:7.80,
						factory: 8.80,
						self_num_:169
					},{
						pic:'/static/pro03.jpg',
						name:'库乐勒香梨',
						price:6.80,
						factory: 7.80,
						self_num_:169
					},{
						pic:'/static/pro01.jpg',
						name:'新鲜甜橙',
						price:8.90,
						factory: 9.9,
						self_num_:169
					},{
						pic:'/static/pro02.jpg',
						name:'金煌芒',
						price:7.80,
						factory: 8.80,
						self_num_:169
					},{
						pic:'/static/pro03.jpg',
						name:'库乐勒香1',
						price:6.80,
						factory: 7.80,
						self_num_:169
					}],
				},{
					adCover: '/static/market-ad.jpg',
					markt:{
						name: '北郊市场',
						address: '江门市蓬江区建设二路北郊',
						send_price: 20,
						location: 0.35,
						current: 4,
						score: 25
					},
					productsLists: [{
						pic:'/static/pro01.jpg',
						name:'新鲜甜橙',
						price:8.90,
						factory: 9.9,
						self_num_:169
					},{
						pic:'/static/pro02.jpg',
						name:'金煌芒',
						price:7.80,
						factory: 8.80,
						self_num_:169
					},{
						pic:'/static/pro03.jpg',
						name:'库乐勒香梨',
						price:6.80,
						factory: 7.80,
						self_num_:169
					},{
						pic:'/static/pro01.jpg',
						name:'新鲜甜橙',
						price:8.90,
						factory: 9.9,
						self_num_:169
					},{
						pic:'/static/pro02.jpg',
						name:'金煌芒',
						price:7.80,
						factory: 8.80,
						self_num_:169
					},{
						pic:'/static/pro03.jpg',
						name:'库乐勒香梨',
						price:6.80,
						factory: 7.80,
						self_num_:169
					}],
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShow(){
			this.onShow(this);
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
			//#ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			console.log(info);
			//#endif
			//#ifdef H5
			
			//#endif
			
		
			this.ajax();
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
			},
			navGo(v){
				this.goto(v.url,v.type);
			}
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>
