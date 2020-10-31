<template>
	<view class="store_show" v-if="data.show">
		<view class="store-header-box main-bg flex-middle fc-white plr15" :style="{height:height_+'px'}">
			<view class="store-header-icon lh-24" :style="{paddingTop:top+'px'}">
				<view class="dxi-icon dxi-icon-left" @click="goto('/pages/index/main',2)"></view>
			</view>
			<view class="store-header flex1 text-center" :style="{paddingTop:top+'px',}">
				{{data.detail.name}}
			</view>
			<view class="store-header-icon text-center" :style="{paddingTop:top+'px',width:40*2+'rpx'}">
				<view :class="['fs-20 dxi-icon lh-20 flex',data.collect == true ? 'dxi-icon-heart-fill':'dxi-icon-heart']" @click="collection"></view>
				<view class="fs-12 lh-16">{{data.collect == true ? '已收藏':'收藏'}}</view>
			</view>
		</view>
		<view class="topInfo" :style="{top:height_+'px',}" style="height: 220upx;">
			<dx-products-pic :src=" merchant.cover? merchant.cover : '/static/nopropic.png'" :isList="true" myclass="main-bg fc-white"
			 :imgWidth="80" :imgHeight="80">
				<view class="grade flex-baseline">
					<tui-rate :current="5" :disabled="true" active="#FDB508" :value="merchant.score" :size="14"></tui-rate>
					<view class="num fs-15 ml5">{{merchant.score}}分</view>
				</view>
				<view class="flex-middle businessHours mtb5">
					<view class="nav">营业时间：<text class="Arial">{{ merchant.hour_time_start }} - {{merchant.hour_time_end}}</text></view>
				</view>
				<view class="flex-middle fs-15">
					<dx-icon name="location" size="14" color="#fff"></dx-icon>
					<!-- 	<view class="province plr5">{{ store.province }}</view>
					<view class="city pr5">{{ store.city }}</view> -->
					<view class="address flex1 nowrap w-b100">{{ merchant.address }}</view>
				</view>
				<!-- <view class="coupon_num" @click="$refs.coupon.thisDiag = true" v-if="data.coupons.length">{{data.coupons.length}}个优惠</view> -->
			</dx-products-pic>
		</view>
		<view class="tabs-num" :style="{top: (upx2px(220)+height_)+'px'}">
			<dx-tabs :tabs="tabs" v-model="type" selectedColor="#57C734" sliderBgColor="#57C734" :size="32" :height="88"></dx-tabs>
		</view>
		<view>
			<view v-if="data.productClass.length">
				<view class="proCon" v-if="type  == 'order'">
					<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:(height-(upx2px(220+88+50)+height_))+'px',top:(upx2px(220+88)+height_)+'px',}">
						<view v-for="(item,key) in data.productClass" :key="key" class="tab-bar-item" :class="[selectClassKey==key ? 'active' : '']"
						 :data-current="key" @click="changeClassKey(key)">
							<text>{{item.label}}</text>
						</view>
					</scroll-view>
					<scroll-view scroll-y scroll-with-animation class="right-box" :style="{height:(height-(upx2px(220+88+50)+height_))+'px',top:(upx2px(220+88)+height_)+'px',}">
						<store-pro :data="data.productClass[selectClassKey].products.data" @callBack="changeCart" :merchant="merchant"></store-pro>
					</scroll-view>
				</view>
			</view>

			<scroll-view scroll-y scroll-with-animation class="evalute" v-if="type == 'coupon'" :style="{height:(height-(upx2px(220+88)+height_))+'px',top:(upx2px(220+88)+height_)+'px'}">
				<view class="coupon-list p10">
					<view class="list_item mb10 bg-f" v-for="v in data.coupons">
						<view class="item_left">
							<view class="price fs-26 h-50 fw-bold"><span class="fs-14">￥</span>{{v.amount}}</view>
							<view class="condition fs-12 fc-9">满<text class="Arial">{{v.full_amount}}</text>元可用</view>
						</view>
						<view class="item_right bd-le plr10">
							<view class="w-b100 coupon-title fs15 lh-20 wrap2">{{ v.name }}</view>
							<view class="w-b100 ir-bottom">
								<view class="time fs-12 fc-9 lh-16 Arial">{{ v.start_date }}至{{ v.end_date }}</view>
							</view>
						</view>
						<view class="status" @click="draw(v)">
							<view class="nav yes" v-if="v.status == 0">立即领取</view>
							<view class="nav no" v-else>已领取</view>
						</view>
					</view>
					<view class="empty" v-if="data.coupons.length == 0">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png"></image>
						<view class="name ptb10 fs-14 fc-6">暂无优惠券</view>
					</view>
				</view>
			</scroll-view>

			<scroll-view scroll-y scroll-with-animation class="evalute" v-if="type == 'evaluate'" :style="{height:(height-(upx2px(220+88)+height_))+'px',top:(upx2px(220+88)+height_)+'px'}">
				<view class="evalute-box">
					<view class="evalute-item p10 bg-f bd-be" v-for="v in data.evaluateLists">
						<view class="u-info">
							<view class="u-info-box">
								<view class="u-img">
									<image class="img" :src="v.user?v.user.headerPic:'https://boss.doxinsoft.com/images/nouser01.png'" />
								</view>
								<view class="u-name pl10">
									<view class="name lh-20 fs-14">{{ v.addr_name }}</view>
									<tui-rate :value="v.merchant_quote" :disabled="true"></tui-rate>
								</view>
								<view class="r-time Arial fs-13 fc-9 pl10">{{ v.evaluate_date }}</view>
							</view>
						</view>
						<view class="u-con pt10 plr15" v-if="v.merchant_evaluate_logo">
							<view class="p">{{ v.merchant_evaluate }}</view>
							<dx-images :data="getLogo(v.merchant_evaluate_logo)"></dx-images>
						</view>
					</view>
					<view class="empty" v-if="data.evaluateLists.length == 0">
						<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png"></image>
						<view class="name ptb10 fs-14 fc-6">暂无评价</view>
					</view>
				</view>
			</scroll-view>

			<scroll-view scroll-y scroll-with-animation class="store-info" v-if="type == 'merchant'" :style="{height:(height-(upx2px(220+88)+height_))+'px',top:(upx2px(220+88)+height_)+'px'}">
				<view class="bg-f mt12">
					<dx-list-cell name="商家电话：" iconName="tel" :iconSize="20" iconColor="#777">
						<view class="info-right" slot="right">
							{{data.detail.phone}}
						</view>
					</dx-list-cell>
					<dx-list-cell name="地址：" iconName="location" :iconSize="20" iconColor="#777">
						<view class="info-right" slot="right">
							{{data.detail.cityString}}
						</view>
					</dx-list-cell>
					<dx-list-cell name="营业时间：" iconName="time2" :iconSize="18" iconColor="#777">
						<view class="info-right" slot="right">
							{{data.detail.hour_time}}
						</view>
					</dx-list-cell>
				</view>
				<view class="bg-f mt12" v-if="data.articleLists.length">
					<dx-list-cell name="店辅公告：" iconName="notice" :iconSize="18" iconColor="#777" arrow>
						<view class="info-right" slot="right" @click="goto('/pages/store/news/lists/main?merchant_id='+data.detail.id,1)">
							<view>{{data.articleLists[0].content}}</view>
						</view>
					</dx-list-cell>
				</view>
				<view class="bg-f mt12 p15" v-if="getAddressLogo(data.detail.address_logo).length">
					<image class="flex w-b100 mb12" :src="v.img" mode="widthFix" v-for="v in getAddressLogo(data.detail.address_logo)"></image>
				</view>
			</scroll-view>
		</view>
		<view class="store-footer flex-between flex-middle" v-if="type  == 'order'">
			<view class="icon" @click="goto('/pages/user/cart/main',2)">
				<dx-icon name="cart" size="24" color="#fff"></dx-icon>
				<!-- <view class="fs-12 fc-white lh-16">购物车</view> -->
				<view class="num">{{data.cartData.num}}</view>
			</view>
			<view class="flex1"><dx-price v-model="data.cartData.amount" split :intSize="24" :decimalSize="15"></dx-price></view>
			<view class="goBuy">去结算</view>
		</view>
		<dx-diag :open="false" title="优惠活动" :titSize="16" titColor="#333" width="94%" ref="coupon">
			<view class="diag-coupon mt15">
				<view class="list_item bg-f2 bdr6 ptb10 mb10" v-for="v in data.coupons">
					<view class="item_left fc-3">
						<view class="price fs-26 fc-red lh-36 h-36"><span class="fs-14">￥</span>{{v.amount}}</view>
						<view class="condition fs-12">满{{v.full_amount}}元可用</view>
					</view>
					<view class="item_right bd-le plr12">
						<view class="w-b100 coupon-title fs-15 lh-20 nowrap fw-bold">{{ v.name }}</view>
						<view class="w-b100 ir-bottom flex-between">
							<view class="time fs-14 fc-9 lh-16">{{ v.start_date }} ~ {{ v.end_date }}</view>
						</view>
					</view>
					<view class="getNav" :class="[v.status == 0 ? 'no' : 'yes']" @click="draw(v)">{{v.status == 0 ? '立即领取':'已领取'}}</view>
				</view>
			</view>
		</dx-diag>
	</view>
</template>

<script>
	import dxProductsPic from 'doxinui/components/products/pic'
	import dxTabs from "doxinui/components/tabs/tabs"
	import storePro from '@/components/store_pro'
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxDiag from "doxinui/components/diag/diag"
	import dxImages from "doxinui/components/images/images"
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components: {
			dxProductsPic,
			dxTabs,
			storePro,
			tuiRate,
			dxDiag,
			dxImages,
			dxListCell
		},
		data() {
			return {
				formAction: '/merchant/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height_: 64,
				top: 0, //标题图标距离顶部距离
				height: 0, //scroll-view高度
				merchant_id: 0,
				merchant: {},
				selectClassKey: 0,
				type: 'order',
				tabs: [{
						name: "下单",
						value: 'order',
					},
					{
						name: "优惠券",
						value: 'coupon'
					},
					{
						name: "评价",
						value: 'evaluate'
					},
					{
						name: "商家",
						value: 'merchant'
					},
				],
				scrollTop: 0, //tab标题的滚动条位置
			}
		},
		onLoad: function(options) {
			this.merchant_id = options.merchant_id;
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
					//this.height = res.windowHeight
				}
			})
			uni.getSystemInfo({
				success: (res) => {

					let header = 92;
					// #ifdef H5
					header = 0;
					// #endif
					this.height = res.windowHeight - uni.upx2px(header)
				}
			});
			this.ajax();

		},
		methods: {
			getAddressLogo(cover){
			
				let coverArr = cover ? cover.split(",") : [];
				let coverArr_ = [];
				if(coverArr.length){
					coverArr.forEach(v => {
						coverArr_.push({
							img: this.getSiteName + '/upload/images/merchant/' + v
						});
					});
				}
				
				console.log(coverArr_);
				return coverArr_;
			},
			getLogo(cover) {
				let coverArr = cover.split(",");
				let coverArr_ = [];
				coverArr.forEach(v => {
					coverArr_.push({
						img: this.getSiteName + '/upload/images/order/' + v
					});
				});
				console.log(coverArr_);
				return coverArr_;
			},
			draw(item) {
				this.checkLogin().then(msg => {
					if (item.status == 0) {
						this.postAjax("/user/couponAdd", {
							coupon_id: item.id,
							merchant_id: this.data.detail.id
						}).then(msg => {
							if (msg.data.status == 2) {
								this.$refs.coupon.thisDiag = false;
								this.ajax();
							}
						});
					} else {
						this.getError("您已经领取");
					}
				});
			},
			collection() {
				this.data.collect = !this.data.collect;
				this.postAjax("/user/collectionAdd", {
					merchant_id: this.merchant.id,
					collect: this.data.collect
				}).then(msg => {

				});
			},
			changeCart(item) {
				this.data.cartData.num = item.cartData.num;
				this.data.cartData.amount = item.cartData.amount;
			},
			changeClassKey(key) {
				console.log(0);
				this.selectClassKey = key;
			},
			upx2px(val) {
				return uni.upx2px(val);
			},
			ajax() {
				this.getAjaxForApp(this, {
					merchant_id: this.merchant_id

				}).then(msg => {
					this.merchant = msg.detail;

				});
			}
		}
	}
</script>
<style scoped="">
	@import url('index.css');
	@import url('/pages/user/coupon/lists/index.css');
</style>
