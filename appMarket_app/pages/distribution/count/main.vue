<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="tabs" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#57C734" :bold="true"
			 sliderBgColor="rgba(87, 199, 52, 0.15)" v-model="searchType" isFixed @change="search"></dx-tabs>
			<view class="count-box">
				<view class="other-time block-sec" v-if="searchType == 'other'">
					<weui-input v-model="ruleform.start_date"  type="date" name="start_date"></weui-input>
					<view class="and">—</view>
					<weui-input v-model="ruleform.end_date"  type="date" name="end_date" @callback="search_"></weui-input>
				</view>
				<view class="block-sec count-sec">
					<view class="count-row">
						<view class="row-item">
							<view class="num">{{data.orderCount}}</view>
							<view class="name">累计收益</view>
							<view class="remark">含等结算:<text class="Arial">{{data.orderSum}}</text>元</view>
						</view>
					</view>
				</view>
				<view class="Dorder">
					<view class="title">收益明细（<text class="Arial">{{ data.orderCount }}</text>笔）</view>
					<div class="order-list mb8 bg-f" v-for="(item,key) in data.lists.data"  :key="item.id">
						<div class="title plr15 ptb10 bd-be">
							<image class="head mr10" :src="item.getUser.userInfo.pic" />
							<p class="name fs-15">{{item.getUser.userInfo.name ? item.getUser.userInfo.name : item.getUser.nickname}}<span v-if="data.query.status == -1">({{ item.getStatus}})</span></p>
							<p class="num fs-15 fc-orange">+<span class="">{{item.amount}}</span></p>
						</div>
						<div class="pro-info">
							<div class="plr5" @click="goto('/pages/product/show/index?id='+product.getProduct.id,1)">
								<orderPro :data="item.getOrder.products"></orderPro>
							</div>
							<div class="order_count plr15 fs-13" v-if="item.getOrder.shipping == 2">共<span class="Arial">{{item.getOrder.num}}</span>件商品
								实付：￥<span class="Arial fs-16 fc-red">{{ toFixed(parseFloat(item.getOrder.amount) - parseFloat(item.getOrder.payed_amount))}}</span>
							</div>
							<div class="order_count plr15 fs-13" v-else>共<span class="Arial">{{item.getOrder.num}}</span>件商品
								实付：￥<span class="Arial fs-16 fc-red">{{item.getOrder.amount}}</span>
							</div>
							<div class="infob fs-12 fc-9 plr15 ptb10 bd-te">
								<p>订单编号：<span class="Arial">{{item.order_no}}</span></p>
								<p>下单时间：<span class="Arial">{{item.created_at}}</span></p>
							</div>
						</div>
					</div>
					<hasMore :parentData="data" source="nodata"></hasMore>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import orderPro from "@/components/orderPro";
	export default {
		components:{
			dxTabs,orderPro
		},
		data() {
			return {
				formAction: '/user/share/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				searchType: 'threeyear',
				ruleform:{
					start_date: '',
					end_date: ''
				},
				tabs: [{
					value: 'threeyear',
					name: "全部"
				}, {
					value: 'today',
					name: "今日"
				}, {
					value: 'yesterday',
					name: "昨日"
				}, {
					value: 'thisweek',
					name: "近七天"
				}, 
				{
					value: 'other',
					name: "自定义"
				},
				],
			
				listsShow: true,
			
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			search_(){
				this.getAjax(this,{created_at_start:this.ruleform.start_date,created_at_end:this.ruleform.end_date,type:0}).then(msg => {
					console.log(this.data);
				});
			},
			search(){
				if(this.searchType != "other"){
					this.ajax();
				}
			},
			ajax() {
				this.getAjax(this,{searchType:this.searchType,type:0}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped>
@import url("./index.css");
</style>