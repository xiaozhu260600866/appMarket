<template>
	<view>
		<view>
			<view class="head-info utop">
				<view class="uinfo">
					<view class="header-img">
						<image class="img" :src="userInfo.headerPic" />
					</view>
					<view class="flex-between flex-middle flex1">
						<view class="pl15 fc-white right info" @click="goto('/pages/user/setting/layouts/info',1)">
							<view class="fs-18">{{ userInfo.name}}</view>
							<view class="fs-14 Arail">ID:{{ userInfo.id }}</view>
							<view class="fs-12">查看店铺详情</view>
						</view>
						<view class="status"><weui-input v-model="ruleform.sendType" name="sendType" changeField="value" type="select" dataKey="sendTypeArr"></weui-input></view>
					</view>
				</view>
			</view>
			
			<view class="ugorup-box bg-f mb8 Ucount">
				<view @click="goto('/pages/user/finance/business',1)">
					<dx-title name="营业分折" nameBold="bold" :nameSize="15" :height="40" arrow>
						<view slot="right">
							<view class="fs-12 fc-6">更多</view>
						</view>
					</dx-title>
				</view>
				<view class="head-count">
					<view class="c-item">
						<p class="name fs-13 fc-6">今日营业额</p>
						<p class="num fs-18 fc-3">{{count.amount}}</p>
						<p class="name fs-13 fc-6">昨日<text class="Arial fs-14">0</text></p>
					</view>
					<view class="c-item">
						<p class="name fs-13 fc-6">今日订单</p>
						<p class="num fs-18 fc-3">{{count.integral}}</p>
						<p class="name fs-13 fc-6">昨日<text class="Arial fs-14">0</text></p>
					</view>
					<view class="c-item">
						<p class="name fs-13 fc-6">客单价</p>
						<p class="num fs-18 fc-3">{{ count.couponNum }}</p>
						<p class="name fs-13 fc-6">昨日<text class="Arial fs-14">0.00</text></p>
					</view>
				</view>
			</view>
			
			<view class="ugorup-box bg-f mb8">
				<dx-title name="常用工具" nameBold="bold" :nameSize="15" :height="40"></dx-title>
				<dx-nav-class :data="[
					{url:'/pages/product/lists/main',type: 1,icon:'iconfont icon-user-products',name:'商品'},
					{url:'/pages/user/evaluate/main',type: 1,icon:'iconfont icon-user-evaluate',name:'评价'},
					{url:'/pages/user/wallet/index/main',type: 1,icon:'iconfont icon-user-wallet',name:'钱包'},
					{url:'/pages/order/lists/main',type: 1,icon:'iconfont icon-user-order',name:'订单'},
					{url:'/pages/user/finance/products',type: 1,icon:'iconfont icon-user-finance-pro',name:'菜品分析'},
					{url:'/pages/user/finance/client',type: 1,icon:'iconfont icon-user-finance-client',name:'顾客分析'},
					{url:'/pages/user/discounts/lists/main',type: 1,icon:'iconfont icon-user-coupon',name:'优惠活动'},
					{url:'/pages/news/lists/main',type: 1,icon:'iconfont icon-user-news',name:'店铺公告'}
				]" @click="checkAuth" myclass="bdr12" num="4" :imgWidth="30" :imgHeight="30" :nameSize="12" :namePTop="5"></dx-nav-class>
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
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					sendType: 1
				},
				userLogin: true,
				count:{
					amount:9824,
					integral:11,
					couponNum:0
				},
				userInfo:{
					headerPic:'/static/icon.png',
					name:'东信科技-梅',
					id:2576
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
				applyArray:[
					{
						url:'/pages/product/lists/main',
						type: 2,
						icon:'iconfont icon-user-products',
						name:'商品'
					},{
						url:'/pages/user/evaluate/main',
						type: 1,
						icon:'iconfont icon-user-evaluate',
						name:'评价'
					},{
						url:'/pages/user/wallet/index/main',
						type: 1,
						icon:'iconfont icon-user-wallet',
						name:'钱包'
					},{
						url:'/pages/order/lists/main',
						type: 1,
						icon:'iconfont icon-user-order',
						name:'订单'
					},{
						url:'/pages/user/finance/products',
						type: 1,
						icon:'iconfont icon-user-finance-pro',
						name:'菜品分析'
					},{
						url:'/pages/user/finance/client',
						type: 1,
						icon:'iconfont icon-user-finance-client',
						name:'顾客分析'
					},{
						url:'/pages/user/discounts/lists/main',
						type: 1,
						icon:'iconfont icon-user-coupon',
						name:'优惠活动'
					},{
						url:'/pages/news/lists/main',
						type: 1,
						icon:'iconfont icon-user-news',
						name:'店铺公告'
					}
				],
				sendTypeArr: [{
					label: '营业中',
					value: '1',
				},{
					label: '预定中',
					value: '2',
				},{
					label: '休',
					value: '3'
				}],
			}
		},
		methods: {
			checkAuth(v){
				return this.goto(v.url,v.type);
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			// uni.getSystemInfo({
			// 	success:res=> {
			// 		this.getError(res.screenHeight+'');
			// 		console.log(res.screenHeight);
			// 	}
			// });
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