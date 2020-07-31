<template>
	<view>
		<view v-if="data.show">
			<view class="head-info utop">
				<view class="uinfo" v-if="!user">
					<view class="header-img">
						<image class="img" src="https://boss.doxinsoft.com/images/nouser01.png" />
					</view>
					<view class="login-nav pl20 pr15 lh-28 fc-white fs-14 mlr15 bdr14" @click="goto('/pages/user/login/main',1)">立即登录<span class="iconfont icon-right fs-10 fc-white pl3"></span></view>
				</view>
				<view v-else>
					<view class="uinfo">
						<view class="header-img">
							<image class="img" :src="user.userInfo.pic ? user.userInfo.pic : 'https://boss.doxinsoft.com/images/nouser01.png'" />
						</view>
						<view class="flex-between flex-middle flex1">
							<view class="pl15 fc-white right info">
								<view class="fs-18">{{user.userInfo.name}}</view>
								<view class="fs-16 Arial">{{user.userInfo.phone}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ugorup-box bg-f mb8 head-count">
				<view class="c-item" @click="checkLogin('/pages/user/wallet/index/main',1)">
					<p class="num fs-18 fc-3">{{user ? user.amount:0}}</p>
					<p class="name fs-13 fc-6">余额</p>
				</view>
				<view class="c-item" @click="checkLogin('/pages/user/integral/lists/main',1)">
					<p class="num fs-18 fc-3">{{user? user.integral :0}}</p>
					<p class="name fs-13 fc-6">积分</p>
				</view>
				<view class="c-item" @click="checkLogin('/pages/user/coupon/lists/main',1)">
					<p class="num fs-18 fc-3">0</p>
					<p class="name fs-13 fc-6">优惠券</p>
				</view>
			</view>
			
			<view class="ugorup-box bg-f mb8">
				<view @click="checkLogin('/pages/order/lists/main?status=12',1)">
					<dx-title name="全部订单" nameBold="bold" :nameSize="15" :height="40" arrow>
						<view slot="right">
							<view class="fs-12 fc-6">查看全部</view>
						</view>
					</dx-title>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/order/lists/main?status=1',type: 1,cover:'/static/order-icon01.png',name:'待付款',number:data.order1},
					{url:'/pages/order/lists/main?status=3',type: 1,cover:'/static/order-icon02.png',name:'待发货',number:data.order3},
					{url:'/pages/order/lists/main?status=5',type: 1,cover:'/static/order-icon03.png',name:'待收货',number:data.order5},
					{url:'/pages/order/lists/main?status=9',type: 1,cover:'/static/order-icon04.png',name:'待评价',number:data.order9},
					{url:'/pages/order/lists/main?status=10',type: 1,cover:'/static/order-icon05.png',name:'售后',number:data.order10}
				]" @click="checkAuth" isAuth myclass="bdr12" :num="5" :imgWidth="30" :imgHeight="30" :imgR="0" :nameSize="12" :namePTop="5"></dx-nav-class>
			</view>
			<view class="ugorup-box bg-f mb8">
				<dx-title name="常用工具" nameBold="bold" :nameSize="15" :height="40"></dx-title>
				<dx-nav-class :data="[
					{url:'/pages/user/coupon/lists/main',type: 1,icon:'iconfont icon-user-coupon',name:'优惠券'},
					{url:'/pages/user/distribution/add/lists/main',type: 1,icon:'iconfont icon-user-fxdr',name:'邀请返利'},
					{url:'/pages/user/integral/shop/lists/main',type: 1,icon:'iconfont icon-user-integral',name:'积分商城'},
					{url:'/pages/user/collection/main',type: 1,icon:'iconfont icon-user-collection',name:'我的收藏'},
					{url:'/pages/news/show/main',type: 1,icon:'iconfont icon-user-joinin',name:'加盟'},
					{url:'/pages/user/address/lists/main',type: 1,icon:'iconfont icon-user-address',name:'地址管理'
					},{url:'/pages/user/info/main',type: 1,icon:'iconfont icon-user-info',name:'账户信息'
					}
				  ]" @click="checkAuth" isAuth myclass="bdr12" :num="4" :imgWidth="30" :imgHeight="30" :nameSize="12" :namePTop="5">
					<!-- <button hover-class="none" class="ubutton item bg-f ptb10 bd-0" open-type="contact" >
						<view class="Nav_img">
							<view class="icon iconfont icon-shop-wechat fs-22 lh-35 fc-3"></view>
						</view>
						<view class="txt fs-12 fc-3 pt5 lh-20">在线客服</view>
					</button> -->
				</dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
import dxTitle from "doxinui/components/title/title"
import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{
			dxTitle,
			dxNavClass
		},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				userLogin: true,
				user:{},
				count:{
					amount:9824,
					integral:11,
					couponNum:0
				},
				orderNav:[
					{
						url:'/pages/order/lists/main',
						type: 1,
						cover:'https://boss.doxinsoft.com/images/wap/user-icon1.png',
						name:'待付款'
					},{
						url:'/pages/order/lists/main',
						type: 1,
						cover:'https://boss.doxinsoft.com/images/wap/user-icon2.png',
						name:'待发货'
					},{
						url:'/pages/order/lists/main',
						type: 1,
						cover:'https://boss.doxinsoft.com/images/wap/user-icon3.png',
						name:'待收货'
					},{
						url:'/pages/order/lists/main',
						type: 1,
						cover:'https://boss.doxinsoft.com/images/wap/user-icon4.png',
						name:'待评价'
					},{
						url:'/pages/order/lists/main',
						type: 1,
						cover:'https://boss.doxinsoft.com/images/wap/user-icon5.png',
						name:'售后'
					}
				],
				
			}
		},
		methods: {
			checkAuth(v){
				this.checkLogin().then(msg=>{
					return this.goto(v.url,v.type);
				});
				
			},
			ajax() {
				this.getAjaxForApp(this, {
					
				}).then(msg => {
					this.user = msg.user;
					
				});
			}
		},
		onShow(){
			let user = uni.getStorageSync('userInfo');
			if(!user){
				this.user = {};
			}
			this.onShow(this);
		},
		onLoad(options) {
			
			
			uni.removeStorageSync('order');
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