<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="market_info">
				<dx-products-pic :src="market.cover? market.cover : '/static/nopropic.png'" :isList="true" myclass="main-bg fc-white"
				 :imgWidth="110" :imgHeight="110">
					<view class="flex-between flex-middle">
						<view class="grade flex-baseline flex1">
							<tui-rate :current="5" :disabled="true" active="#FDB508" :score="0" :size="14"></tui-rate>
							<view class="num fs-15 ml5">5分</view>
						</view>
						<view class="juli Arial fs-14">{{market.juli}}km</view>
					</view>
					<view class="flex-middle businessHours mtb5">
						<view class="nav">营业时间：<text class="Arial">{{ market.hour_time }}</text></view>
					</view>
					<view class="time flex-middle fs-14">
						<view class="pr15"><text class="Arial pr3">{{market.amount}}</text>元起送</view>
						<view><text class="Arial pr3">{{market.sendTime}}</text>分钟</view>
					</view>
					<view class="flex-middle fs-15">
						<dx-icon name="location" size="14" color="#fff"></dx-icon>
						<view class="address flex1 nowrap w-b100 pl3">{{ market.address }}</view>
					</view>
				</dx-products-pic>
			</view>
			<view>
				<dx-tabs-scroll :tabs="tabs" height="52" borderColor="#57C734" curSize="17" curColor="#57C734" curBold="bold" nameSize="15"></dx-tabs-scroll>
				<shop-list :data="data.lists.data"></shop-list>
			</view>
		</view>
	</view>
</template>

<script>
import shopList from "components/shop_list.vue"
import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
import dxProductsPic from 'doxinui/components/products/pic'
import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	export default {
		components:{
			shopList,
			dxTabsScroll,
			dxProductsPic,
			tuiRate
		},
		data() {
			return {
				formAction: '/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				product_class:1,
				tabs: [{
					name: "价格最低"
				}, {
					name: "销量最高"
				}, {
					name: "距离最近"
				}],
				market:{
					cover:'/static/banner01.jpg',
					hour_time:'9:00-19:00',
					address:'环市街道贯溪市场',
					juli:0.3,
					amount: 19,
					sendTime:0
				}
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