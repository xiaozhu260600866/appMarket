<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <dx-date :insert="true" :start-date="'1900-01-01'" :end-date="'2099-12-30'" @change="change"></dx-date> -->
			<dx-tabs :tabs="tabs" v-model="status"  @change="ajax" selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="news_order Iorder" v-if="status == 4">
				<!-- 新任务状态 -->
				<view class="Iorder_item" v-for="(item,index) in data.lists.data" >
					<view class="time-info">
						<view class="left">
							<view class="lh-20">预计<text class="Arial plr2">{{ item.deliver_date }} {{ item.order_time }}</text>送达</view>
							<view class="lh-20">订单编号：<text class="Arial">{{item.order_no}}</text></view>
						</view>
						<view class="right price">￥{{ item.amount }}</view>
					</view>
					<view>
						
						<view class="pro fw-bold plr15 pt10"><text v-for="(v,num) in item.products" v-if="v.getProduct">{{ v.getProduct.name }}{{ v.num }}斤,</text></view>
						<view class="info">
							<view class="flex-between flex-middle">
								<view class="flex1">
									<view class="name lh-24">{{ item.addr_name }}<text class="Arial pl10">{{ item.addr_phone }}</text></view>
									<view class="address fs-16">{{ item.addr_address }}</view>
								</view>
							</view>
						</view>
						<view class="ptb10 text-center">
							<dx-button round size="medium" type="success" myclass="plr70" @click="order(item,5)">抢单</dx-button>
						</view>
					</view>
				</view>
			</view>
			<view class="pick_order Iorder" v-if="status == 5">
				<!-- 待取货状态 -->
				<view class="Iorder_item" v-for="(item,index) in  data.lists.data" >
					<view class="top">
						<view>
								<view class="left" v-if="item.waitData && item.waitData.waitTime">顾客已等<text class="Arial">{{item.waitData.waitTime}}</text>小时<text class="Arial">{{item.waitData.waitMinute}}</text>分钟</view>
							<view class="left fs-14">(<text class="Arial plr2">{{ item.deliver_date }} </text>送达)</view>
						</view>
						<view class="right price">￥{{ item.amount }}</view>
					</view>
						{{item.order_no}}
					<view class="pro fw-bold plr15 pt10"><text v-for="(v,num) in item.products" v-if="v.getProduct">{{ v.getProduct.name }}{{ v.num }}斤,</text></view>
					<view class="info">
						<view class="flex-between flex-middle">
							<view class="flex1">
								<view class="name lh-24">{{ item.addr_name }}<text class="Arial pl10">{{ item.addr_phone }}</text></view>
								<view class="address fs-16">{{ item.addr_address}}</view>
							</view>
						</view>
					</view>
					<!-- 待取货 -->
					 <view class="store"  v-if="item.horse_take == 0">
						<view class="">距离商家<text class="Arial">{{spaceMerchant(item)}}</text></view>
						<view class="icon iconfont icon-location-c-fill" @click="toMerchant(item)"></view>
					</view>
					<!-- 已取货 -->
					 <view class="store" v-if="item.horse_take == 1">
						<view class="">距离用户<text class="Arial">{{spaceUser(item)}}</text></view>
						<view class="icon iconfont icon-location-c-fill" @click="toUser(item)"></view>
					</view>
					<view class="ptb10 text-center">
						<dx-button round size="medium" type="success" myclass="plr70" @click="horseTake(item,1)" v-if="item.horse_take == 0">取货出发</dx-button>
						<dx-button round size="medium" type="success" myclass="plr70" @click="order(item,6)" v-if="item.horse_take == 1">出发配送</dx-button>
					</view>
				</view>
			</view>
			<view class="pick_order Iorder" v-if="status == 6">
				<!-- 待送达状态 -->
				<view class="Iorder_item" v-for="(item,index) in data.lists.data" >
					<view class="top">
						<view>
						<view class="left" v-if="item.waitData && item.waitData.waitTime">顾客已等<text class="Arial">{{item.waitData.waitTime}}</text>小时<text class="Arial">{{item.waitData.waitMinute}}</text>分钟</view>
							<view class="left fs-14">(<text class="Arial plr2">{{ item.order_date }} {{ item.order_time }}</text>送达)</view>
						</view>
						<view class="right price">￥{{ item.amount }}</view>
					</view>
					<view class="pro fw-bold plr15 pt10"><text v-for="(v,num) in item.products" v-if="v.getProduct">{{ v.getProduct.name }}{{ v.num }}斤,</text></view>
					<view class="info">
						<view class="flex-between flex-middle">
							<view class="flex1">
								<view class="name lh-24">{{ item.addr_name }}<text class="Arial pl10">{{ item.addr_phone }}</text></view>
								<view class="address fs-16">{{ item.addr_address}}</view>
							</view>
							<!-- <view class="icon-grop">
								<view class="icon iconfont icon-location-c-fill"></view>
							</view> -->
						</view>
					</view>
					<view class="store">
						<view class="">距离用户<text class="Arial">{{spaceUser(item)}}</text></view>
						<view class="icon iconfont icon-location-c-fill" @click="toUser(item)"></view>
					</view>
					<view class="ptb10 text-center">
						<dx-button round size="medium" type="success" myclass="plr70" @click="order(item,9)">用户已收货</dx-button>
					</view>
				</view>
			</view>
			<mi-map v-if="mapShow" ref="miMap"></mi-map>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
import dxTabs from "doxinui/components/tabs/tabs"
import dxDate from '@/components/date/uni-calendar.vue'
import miMap from '@/components/mi-map/mi-map.vue'
	export default {
		components:{
			dxTabs,dxDate,miMap
		},
		data() {
			return {
				formAction: '/horse/order-lists',
				userInfo:{},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				status:4,
				mapShow:false,
				getSiteName: this.getSiteName(),
				tabs: [],
			}
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
		onLoad(options) {
			this.ajax();
			this.getMyAddress(this, msg=>{
				this.ajax();
			});
		},
		onShow(){
			this.onShow(this);
		},
		methods: {
			spaceUser(order){
			   let location_x = uni.getStorageSync('location_x');
			   let location_y = uni.getStorageSync('location_y');
			   let res = this.space(location_x,location_y,order.location_x,order.location_y);
			   order.space = res + '千米';
			   return res + '千米';
			},
			spaceMerchant(order){
			   let location_x = uni.getStorageSync('location_x');
			   let location_y = uni.getStorageSync('location_y');
			   let res = this.space(location_x,location_y,order.getMerchant.location_x,order.getMerchant.location_y);
			   order.getMerchant.space = res + '千米';
			   return res + '千米';
			},
			toMerchant(item){
				let merchant = item.getMerchant;
				this.mapShow = true;
				this.$nextTick(msg=>{
					this.$refs.miMap.ajax(item,item.getMerchant.name,item.getMerchant.location_x,item.getMerchant.location_y);
				});
			},
			toUser(item){
				this.mapShow = true;
				this.$nextTick(msg=>{
					this.$refs.miMap.ajax(item,item.addr_name,item.location_x,item.location_y);
				});
			},
			horseTake(item,horse_take){
				this.getConfirm("是否确认操作",msg=>{
					this.postAjax("/horse/order-take",{horse_take:horse_take,id:item.id}).then(msg=>{
						if(msg.data.status == 2){
							this.ajax();
						}
					});
				});
			},
			order(item,status){
				this.getConfirm("是否确认操作",msg=>{
					this.postAjax("/horse/order-change",{status:status,id:item.id}).then(msg=>{
						if(msg.data.status == 2){
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
					status:this.status
				}).then(msg => {
					    this.tabs =[];
						this.tabs.push(
								{
									value:4,
									name: "新任务("+msg.status4Num+')'
								}, {
									value:5,
									name: "待取货("+msg.status5Num+')'
								},{
									value:6,
									name: "待送达("+msg.status6Num+')'
								}
							
						);

				});
			}
			
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>
