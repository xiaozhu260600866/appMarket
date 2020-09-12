<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="order-count main-bg fc-white">
				<view class="c-item">
					<view class="num fs-24">{{data.orderCount}}<text class="fs-14">单</text></view>
					<view class="name fs-13">累计完成订单</view>
				</view>
				<view class="c-item">
					<view class="num fs-24">{{ data.orderCancelCount }}<text class="fs-14">单</text></view>
					<view class="name fs-13">累计取消订单</view>
				</view>
			</view>
			<dx-tabs :tabs="tabs" v-model="status" @change="tabClick" selectedColor="#57C734" sliderBgColor="#57C734" :height="92" :padding="0"></dx-tabs>
			<view class="selectDate text-right">
				<view class="flex-between flex-middle fc-6">
					<view class="fs-14">选择订单日期 </view>
					<view class="iconfont icon-date fs-17" @click="dataShow = !dataShow"></view>
				</view>
				<view class="flex-between flex-middle bg-f dateGroup" v-if="dataShow">
					<weui-input v-model="ruleform.start_date" type="date" name="start_date"></weui-input>
					<view class="and">—</view>
					<weui-input v-model="ruleform.end_date" type="date" name="end_date" @callback="search_"></weui-input>
				</view>
			</view>
			<view class="orderLists mb10" v-for="(parent,key) in data.lists.data" >
				<view class="order_date plr10 bd-be fs-15 fc-3" @click="goto('/pages/order/detail/main?order_no='+parent.order_no,1)">
					<view class="fs-14 flex1">
						<view class="time lh-20">下单时间：<text class="Arial">{{ parent.created_at }}</text></view>
						<view class="order_no lh-20">订单编号：<text class="Arial">{{ parent.order_no }}</text></view>
					</view>
					<view class="fs-14 text-right">
						<view class="price lh-20">￥{{parent.amount}}</view>
						<view class="state lh-20 fs-13">{{parent.status_message}}</view>
					</view>
				</view>
				<view class="pro fw-bold plr15 pt10 fs-15"><text v-for="(v,num) in parent.products">{{ v.getProduct.name }}{{ v.num }}件,</text></view>
				<view class="buy_info fs-15">
					<view class="flex-between flex-middle">
						<view class="flex1">
							<view class="name lh-24">{{ parent.addr_name }}<text class="Arial pl10">{{ parent.addr_phone }}</text></view>
							<view class="address mt5 fc-6">{{ parent.addr_address }}</view>
						</view>
						<view class="icon-grop">
							<view class="icon dxi-icon dxi-icon-location-fill" @click="location(parent.location_x,parent.location_y,parent.addr_address)"></view>
							<view class="icon dxi-icon dxi-icon-tel-fill" @click="phone(parent.addr_phone)"></view>
						</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data" source="order"></hasMore>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			orderPro,
			dxTabs
		},
		data() {
			return {
				formAction: '/horse/order-count',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 12,
				ruleform:{},
				dataShow:false,
				tabs: [{
					value:12,
					name: "历史订单"
				}, {
					value:9,
					name: "今日完成单"
				},{
					value:0,
					name: "今日取消单"
				}],
				
			}
		},
		methods: {
			tabClick(){
				this.ajax();
			},
			search_(){
				this.getAjaxForApp(this,
					{created_at_start:this.ruleform.start_date,created_at_end:this.ruleform.end_date}
				).then(msg => {
					
				});
			},
			ajax() {
				var options={};
				if(this.status == 12){
					options={status:9};
				}else if(this.status == 9){
					options={status:9,searchType:'today'};
				}else if(this.status == 0){
					options={status:0,searchType:'today'};
				}
				this.getAjaxForApp(this, 
					options
				).then(msg => {
					
				});
			}
		},
		onLoad(options) {
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