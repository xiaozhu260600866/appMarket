<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50">
			<view class="tui-header-box" :style="{height:height_+'px',background:'rgba(255,255,255,'+opcity+')'}">
				<view class="tui-header" :style="{marginTop:top+'px', opacity:opcity}">
					商品详情
				</view>
				<view class="tui-header-icon" :style="{marginTop:top+'px'}">
					<view class="dxi-icon dxi-icon-left tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
					 @click="goto('/pages/index/main',2)"></view>
				</view>
			</view>
			<myswiper :data="silders" :lrPadding="0" :tbPadding="0" :bdR="0"></myswiper>
			<view class="pro_infor bg-f">
				<view class="flex-between">
					<view class="pro_name fs-16 pt10 plr15 flex1">{{proDetail.name}}</view>
					<button class="share-btn flex fc-9 pl15 pr8 mt10" hover-class="none" open-type="share">
						<view class="dxi-icon dxi-icon-share1 fs-12"></view>
						<view class="txt fs-12">分享</view>
					</button>
				</view>
				<view class="cms_price mlr15 mt10">
					<view><dx-price v-model="proDetail.price" split></dx-price></view>
					<view class="dw fs-14 fc-red pl2" v-if="proDetail.unit">/{{proDetail.unit}}</view>
					<view class="cprice fs-14 pl8" v-if="proDetail.new_price">￥{{proDetail.new_price}}</view>
				</view>
				<view class="other-info plr15 ptb8">
					<view class="info-item fs-12 fc-9">起送：<span class="Arial">￥{{ proDetail.amount }}</span></view>
					<view class="info-item fs-12 fc-9">已售<span class="Arial">{{proDetail.self_num_}}</span></view>
				</view>
				<view class="buy-num plr15 ptb10 flex-between bd-te">
					<view class="fs-15 lh-30 fc-3">选购数量</view>
					<tui-numberbox :value="num"></tui-numberbox>
				</view>
			</view>
			<view class="pro_type bg-f mtb12">
				<dx-list-msg name="新鲜度" content="新鲜库越高，菜品越新鲜" :nameSize="15">
					<view slot="right">
						<view class="fs-15 Arial main-color">{{proDetail.fresh}}</view>
					</view>
				</dx-list-msg>
				<dx-list-msg name="适用人群" :nameSize="15">
					<view slot="right">
						<view class="fs-14 fc-3">{{proDetail.apply}}</view>
					</view>
				</dx-list-msg>
			</view>
			<dx-tabs :tabs="tabs" @change="change" selectedColor="#57C734" sliderBgColor="#57C734" :nameSize="17" :height="100"></dx-tabs>
			<view class="pro-content" v-if="currentTab == 0">
				<view class="pro-con-main bg-f p10">
					<u-parse :content="proDetail.content"/>
				</view>
				<view class="data-con">
					<view class="fs-12 fc-9 p20 text-center">暂无详情</view>
				</view>
			</view>
			<view class="evalute" v-if="currentTab == 1">
				<view class="evalute-item p10 bg-f bd-be" v-for="v in suggestLists">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img">
								<image class="img" :src="v.headimgurl" />
							</view>
							<view class="u-name pl10">
								<view class="name lh-20 fs-14">{{ v.nickname }}</view>
								<tui-rate :value="v.quote" :disabled="true"></tui-rate>
							</view>
							<view class="r-time Arial fs-13 fc-9 pl10">{{ getforMatDate(v.created_at) }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15">
						<view class="p">{{ v.suggestContent }}</view>
						<dx-images :data="v.getSuggestLogo"></dx-images>
					</view>
				
				</view>
				<view class="data-con">
					<view class="fs-12 fc-9 p20 text-center">暂无评价</view>
				</view>
			</view>
			<view id="show_footer">
				<view class="left plr8">
					<button class="btn-item share" hover-class="none" @click="goto('/pages/index/main',2)">
						<view class="iconfont icon-pro-shop"></view>
						<view class="txt">首页</view>
					</button>
					<button class="btn-item share" hover-class="none" open-type="contact">
						<view class="iconfont icon-pro-service-o"></view>
						<view class="txt">客服</view>
					</button>
					<button class="btn-item cart" hover-class="none" @click="goto('/pages/user/cart/main',2)">
						<view class="iconfont icon-pro-cart"></view>
						<view class="txt">购物车</view>
						<block v-if="cartNum >= 1">
							<view class="sum">{{ cartNum }}</view>
						</block>
					</button>
				</view>
				<view class="right flex1 w-b100 pr5">
					<view class="r-nav">
						<view class="r-item r-item-yellow"><span class="r-opacity">加入购物车</span></view>
					</view>
					<view class="r-nav" @click="goto('/pages/order/buy/main',1)">
						<view class="r-item r-item-red"><span class="r-opacity">立即购买</span></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxTabs from "doxinui/components/tabs/tabs"
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{
			tuiNumberbox,
			dxListMsg,
			dxTabs,
			uParse,
			tuiRate,
			dxImages
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height_:64,
				top: 0, //标题图标距离顶部距离
				opcity: 0,
				iconOpcity: 0.5,
				proShow: true,
				cartNum: 2,
				silders:[
					{cover:'/static/pro01.jpg'},
					{cover:'/static/pro02.jpg'},
				],
				proDetail:{
					name:'丝瓜',
					price:1.00,
					unit: '斤',
					new_price: 4.00,
					amount: 45,
					self_num_: 336,
					fresh: 9,
					apply: '全部',
					content:'产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情'
				},
				currentTab: 0,
				tabs: [{
					value: 0,
					name: "商品详情"
				}, {
					value: 1,
					name: "评价"
				}],
				suggestLists:[{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:4,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
					]
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:5,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
					]
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:3,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
				}]
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			},
			change(e) {
				this.currentTab = e.index
			},
			getforMatDate(created_at){
				let date2=created_at.replace(new RegExp(/-/gm) ,"/");
				let date1 = new Date(date2);
				return this.dateToString(date1);
			},
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
					this.width = obj.left || res.windowWidth;
					this.height_ = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
					this.width_ = res.windowWidth
					this.height = res.windowHeight
				}
			})
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
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
		
	}
</script>
<style scoped="">
@import url('index.css')
</style>