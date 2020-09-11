<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="market_info" v-if="data.market">
				<dx-products-pic :src="data.market? data.market.getPic : '/static/nopropic.png'" :isList="true" myclass="main-bg fc-white"
				 :imgWidth="110" :imgHeight="110">
					<view class="flex-between flex-middle">
						<view class="grade flex-baseline flex1">
							<tui-rate :current="5" :disabled="true" active="#FDB508" :score="0" :size="14"></tui-rate>
							<view class="num fs-15 ml5">5分</view>
						</view>
						<view class="juli Arial fs-14">{{data.market.space}}km</view>
					</view>
					<view class="flex-middle businessHours mtb5">
						<view class="nav">营业时间：<text class="Arial">{{ data.market.hour_time }}</text></view>
					</view>
					<view class="time flex-middle fs-14">
						<view class="pr15"><text class="Arial pr3">{{data.market.deliver_price}}</text>元起送</view>
						<view><text class="Arial pr3">{{data.market.sendTime}}</text>分钟</view>
					</view>
					<view class="flex-middle fs-15">
						<dx-icon name="location" size="14" color="#fff"></dx-icon>
						<view class="address flex1 nowrap w-b100 pl3">{{ data.market.address }}</view>
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
				formAction: '/merchant.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				market_id:1,
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
				let location_x = uni.getStorageSync('location_x');
				let location_y = uni.getStorageSync('location_y');
			
				this.getAjaxForApp(this, {market_id:this.market_id
				     	
				}).then(msg => {
					if(msg.market){
						this.setTitle(msg.market.name);
					}else{
						this.setTitle(msg.productClass.name);
					}
					
					let res = this.space(location_x,location_y,msg.market.location_x,msg.market.location_y);
					this.$set(this.data.market,"space",res);
					console.log(this.data.market);
				});
			}
		},
		onLoad(options) {
			this.market_id = options.market_id;
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