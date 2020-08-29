<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <dx-date :insert="true" :start-date="'1900-01-01'" :end-date="'2099-12-30'" @change="change"></dx-date> -->
			<dx-tabs :tabs="tabs" v-model="status"  @change="ajax" selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="news_order Iorder">
				<!-- 新任务状态 -->
				<view class="Iorder_item" v-for="(item,index) in data.lists.data" >
					<view class="time-info">
						<view class="left">预计<text class="Arial plr2">{{ item.deliver_date }} {{ item.order_time }}</text>送达</view>
						<view class="right price">￥{{ item.amount }}</view>
					</view>
					<view class="pro fw-bold plr15 pt10"><text v-for="(v,num) in item.products">{{ v.getProduct.name }}{{ v.num }}斤,</text></view>
					<view class="info">
						<view class="flex-between flex-middle">
							<view class="flex1">
								<view class="name lh-24">{{ item.addr_name }}<text class="Arial pl10">{{ item.addr_phone }}</text></view>
								<view class="address fs-16">{{ item.addr_address }}</view>
							</view>
						</view>
						<view class="flex-between flex-middle">
							<view class="flex1">
								<view class="name lh-24">{{ item.getMerchant.name }}<text class="Arial pl10">{{ item.getMerchant.phone }}</text></view>
								<view class="address fs-16">{{ item.getMerchant.address }}</view>
							</view>
						</view>
					</view>
					<view class="ptb10 text-center">
						<dx-button round size="medium" type="success" myclass="plr70" @click="order(item,5)" v-if="status == 4">商家取货</dx-button>
						<dx-button round size="medium" type="success" myclass="plr70" @click="order(item,9)" v-if="status == 5">操作完成</dx-button>
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
				formAction: '/deliver/order-lists',
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
			this.getMyAddress(this, msg=>{
				this.ajax();
			});
		},
		methods: {
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
			
			order(item,status){
				this.getConfirm("是否确认操作",msg=>{
					this.postAjax("/deliver/order-change",{status:status,id:item.id}).then(msg=>{
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
									name: "待取货("+msg.status4Num+')'
								}, {
									value:5,
									name: "已取货("+msg.status5Num+')'
								},{
									value:9,
									name: "完成("+msg.status9Num+')'
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
