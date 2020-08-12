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
			<dx-products-pic :src=" merchant.cover? merchant.cover : '/static/nopropic.png'" :isList="true" myclass="main-bg fc-white" :imgWidth="80" :imgHeight="80">
				<view class="grade flex-baseline">
					<tui-rate :current="5" :disabled="true" active="#FDB508" :score="0" :size="14"></tui-rate>
					<view class="num fs-15 ml5">5分</view>
				</view>
				<view class="flex-middle businessHours mtb5">
					<view class="nav">营业时间：<text class="Arial">{{ merchant.hour_time }}</text></view>
				</view>
				<view class="flex-middle fs-15">
					<dx-icon name="location" size="14" color="#fff"></dx-icon>
				<!-- 	<view class="province plr5">{{ store.province }}</view>
					<view class="city pr5">{{ store.city }}</view> -->
					<view class="address flex1 nowrap w-b100">{{ merchant.address }}</view>
				</view>
				<view class="coupon_num" @click="$refs.coupon.thisDiag = true">{{data.coupons.length}}个优惠</view>
			</dx-products-pic>
		</view>
		<view class="tabs-num" :style="{top: (upx2px(220)+height_)+'px'}">
			<dx-tabs :tabs="tabs" v-model="type" selectedColor="#57C734" sliderBgColor="#57C734" :size="32" :height="88"></dx-tabs>
		</view>
		<view v-if="data.productClass.length">
			<view class="proCon" v-if="type  == 'order'">
				<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:height+'px',top:(upx2px(220+88)+height_)+'px',}">
					<view v-for="(item,key) in data.productClass" :key="key" class="tab-bar-item" :class="[selectClassKey==key ? 'active' : '']"
					 :data-current="key"  @click="changeClassKey(key)">
						<text>{{item.label}}</text>
					</view>
				</scroll-view>
				<scroll-view scroll-y scroll-with-animation class="right-box" :style="{top:(upx2px(220+88)+height_)+'px',}">
					<store-pro :data="data.productClass[selectClassKey].products.data" @callBack="changeCart"></store-pro>
				</scroll-view>
			</view>
		</view>
		<view class="proNodate" :style="{top:(upx2px(248+88)+height_)+'px',}" v-if="data.productClass.length == 0 || type == 'evaluate' || type == 'merchant'">
			暂无数据
		</view>
		<view class="store-footer flex-middle">
			<view class="icon" @click="goto('/pages/user/cart/main',2)">
				<dx-icon name="cart" size="20" color="#fff"></dx-icon>
				<view class="fs-12 fc-white lh-16">购物车</view>
				<view class="num">{{data.cartData.num}}</view>
			</view>
			<dx-price v-model="data.cartData.amount" split :intSize="20" :decimalSize="12"></dx-price>
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
	export default {
		components:{
			dxProductsPic,
			dxTabs,
			storePro,
			tuiRate,
			dxDiag
		},
		data() {
			return {
				formAction: '/merchant/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height_:64,
				top: 0, //标题图标距离顶部距离
				height: 0, //scroll-view高度
				merchant_id:0,
				merchant:{},
				selectClassKey:0,
				type:'order',
				tabs: [{
					name: "下单",
					value:'order',
				}, {
					name: "评价",
					value:'evaluate'
				}, {
					name: "商家",
					value:'merchant'
				}],
				scrollTop: 0 ,//tab标题的滚动条位置
				couponArray:[{
					amount: 50,
					discount: '',
					full_amount: 300,
					type: 3,
					name: '满减活动',
					start_date: '2020-08-01',
					end_date: '2020-08-30',
					status: 0
				},{
					amount: 7,
					discount: '',
					full_amount: 77,
					type: 3,
					name: '七夕优惠',
					start_date: '2020-08-01',
					end_date: '2020-08-30',
					status: 1
				},{
					amount: 20,
					discount: '',
					full_amount: 100,
					type: 3,
					name: '优惠券',
					start_date: '2020-08-01',
					end_date: '2020-08-30',
					status: 0
				}]
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
					this.height = res.windowHeight
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
			draw(item){
				this.checkLogin().then(msg=>{
					if(item.status == 0){
						this.postAjax("/user/couponAdd",{coupon_id:item.id,merchant_id:this.data.detail.id}).then(msg=>{
							if(msg.data.status  == 2){
								this.$refs.coupon.thisDiag = false;
								this.ajax();
							}
						});
					}else{
						this.getError("您已经领取");
					}
				});
			},
			collection(){
				this.data.collect = !this.data.collect;
				this.postAjax("/user/collectionAdd",{merchant_id:this.merchant.id,collect:this.data.collect}).then(msg=>{
					
				});
			},
			changeCart(item){
				this.data.cartData.num = item.cartData.num;
				this.data.cartData.amount = item.cartData.amount;
			},
			changeClassKey(key){
				console.log(0);
				this.selectClassKey = key;
			},
			upx2px(val){
				return uni.upx2px(val);
			},
			ajax() {
				this.getAjaxForApp(this, {merchant_id:this.merchant_id
				
				}).then(msg => {
					this.merchant = msg.detail;
					
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>