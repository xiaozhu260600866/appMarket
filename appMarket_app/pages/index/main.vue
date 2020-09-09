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
			<dx-title name="今日特价" :nameSize="14" nameBold="bold" arrow :noborder="true" @click="goto('/pages/special/main',1)">
				<view slot="left">
					<view class="iconfont icon-index-star-c fc-red fs-18 mr10"></view>
				</view>
				<view slot="right">
					<view class="fs-13 fc-9">更多</view>
				</view>
			</dx-title>
			<dx-products-scroll @click="toProduct" :data="data.isindexLists.data" :itemWidth="120" bgColor="transparent" :itemLRMargin="5" imgHeight="200rpx" imgR="12rpx"></dx-products-scroll>
		</view>
		<view class="iad-img">
			<image src="../../static/Iad02.jpg" mode="widthFix" class="img"></image>
		</view>
		<!-- 附近的市场 -->
		<view class="markt-group" v-for="v in data.market">
			<view class="markt-ad" @click="goto('/pages/store/lists/main?market_id='+v.id,1)">
				<image class="flex img" :src="v.getPic" mode="widthFix"></image>
				<view class="info plr15 pt10">
					<view class="name flex-middle">
						<view class="fs-17 fw-bold lh-24">{{ v.name }}</view>
						<view class="ml10 lh-24"><tui-rate current="5" :disabled="true" score="5" active="#Ff721f" :size="14"></tui-rate></view>
						<view class="fs-12 pl5 lh-24">5分</view>
					</view>
					<view class="address fs-13 mtb3"><text class="dxi-icon dxi-icon-location-fill fs-13 pr5"></text>{{ v.address }}</view>
					<view class="remark fs-12">起送<text class="Arial pr10">￥{{v.deliver_price}}</text>
						<filterKm v-model="v.juli" v-if="v.juli"></filterKm>
					</view> 
				</view>
			</view>
			<view v-if="v.product.data.length">
				<dx-products-scroll  @click="toProductI" :data="v.product.data" bgColor="transparent" myclass="p0 markt-pro" :itemWidth="100"imgHeight="180rpx" :itemLRMargin="3"></dx-products-scroll>
			</view>
		</view>
		<!-- 市场列表 -->
		<view class="iad-img">
			<image src="../../static/Iad01.png" mode="widthFix" class="img"></image>
		</view>
		<view>
			<dx-tabs-scroll :tabs="tabs" @change="listsShow=false;ajax()" v-model="type" height="52" borderColor="#57C734" curSize="17" curColor="#57C734" curBold="bold" nameSize="15"></dx-tabs-scroll>
			<shop-list :data="data.lists.data" v-if="listsShow"></shop-list>
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
import filterKm from '@/components/filterKm';
	export default {
		components:{
			dxNavClass,
			dxProductsScroll,
			shopList,
			dxTabsScroll,
			dxTitle,
			tuiRate,
			filterKm
		},
		data() {
			return {
				formAction: '/wapindex',
				userInfo:{},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				top: 0, //标题图标距离顶部距离
				type:'recommend',
				listsShow:false,
				otherData:{
					city:"江门市"
				},
				tabs: [{
					name: "推荐",
					value:'recommend',
				},  {
					name: "距离最近",
					value:'space'
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShow(){
			 if(uni.getStorageSync('city')){
				 this.otherData.city = uni.getStorageSync('city');
			 }
			this.onShow(this);
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			// const bgAudioMannager = uni.getBackgroundAudioManager();
			// bgAudioMannager.stop();  
			// bgAudioMannager.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';  
			// bgAudioMannager.play(); 
			if(!uni.getStorageSync('city')){
				uni.setStorageSync('city','江门市');
			}
			if(uni.getStorageSync('city')){
				this.otherData.city = uni.getStorageSync('city');
			}
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
			
		
			this.getMyAddress(this, msg=>{
				this.ajax();
			});
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
			toProductI(item){
				console.log(item);
				return this.toProduct(item);
				
			},
			ajax() {
				this.getAjaxForApp(this, {
					search:this.type
				}).then(msg => {
					this.listsShow = true;
					if(this.data.isindexLists.data.length){
						this.data.isindexLists.data.forEach(v=>{
							this.$set(v,"pic",v.firstCover)
						});
						console.log(this.data.isindexLists);
					}
					if(this.data.market.length){
						this.data.market.forEach(market=>{
							if(market.product.data.length){
								market.product.data.forEach(v=>{
									this.$set(v,"pic",v.firstCover)
								});
							}
							
						});
						console.log(this.data.market);
					}
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
