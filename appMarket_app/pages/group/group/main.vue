<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60">
			<view class="show_banner bg-f">
				<myswiper id="arrowTop" :tbPadding="0" :lrPadding="0" :bdR="0" :data="[
					{cover: '/static/pro01.jpg'},
					{cover: '/static/pro02.jpg'}
				]" purl="product"></myswiper>
			</view>
			<view class="ass-price plr15 ptb10">
				<view class="price fs-28"><text class="fs-12">￥</text>{{ data.product.group_price }}</view>
				<view class="r-time" v-if="data.product.group_expire_date!='2099-12-30' || data.product.group_expire_date != '2099-12-30 00:00:00'">
					<view v-if="data.product.canGorupBuy">
						<view class="fc-white fs-12">距离活动结束还剩</view>
						<leftTime v-model="data.product.group_expire_date" type="1"></leftTime>
					</view>
					<view v-else>
						<view class="fc-white fs-18">活动已结束</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12">
				<view class="proTitle plr15 ptb10">
					<view class="fs-15">{{ data.product.name }}</view>
				</view>
				<view class="proCount fs-13 fc-9 plr15 pb10">
					<view>运费：{{ data.product.yunfei ? data.product.yunfei : '免运费' }}</view>
					<view>剩余：<text class="Arial">{{ data.product.num }}</text></view>
				</view>
			</view>
			
			<view class="group bg-f plr15 ptb12 mt12">
				<view class="group-box ptb20">
					<!-- 拼团未结束时客户进入显示 -->
					<view class="con" v-if="data.detail.group.leftNum && data.detail.group.canGorupBuy">
						<view class="ass-state"><text class="Arial num"> {{ data.detail.group.leftNum }} </text>人正在拼</view>
						<view class="ass-disc">剩余 <text class="Arial time">
							<leftTime v-model="data.detail.group.end_date" type="0"></leftTime>
						</text> 结束</view>
					</view>
			
					<!-- 拼团未结束时已参团人员显示 -->
					<view class="con" v-if="data.detail.group.leftNum == 0 && data.detail.isMy">
						<view class="ass-state">拼团成功</view>
						<view class="ass-disc">恭喜您，商家尽快发货</view>
					</view>
					<!-- 超过10个人，用以下状态显示，不懂再问我 -->
					<view class="people">
						<view class="people-list" v-for="(v,key) in groupArray">
							<view class="p-item second">
								<image class="img" :src="v.headerPic ? v.headerPic :'https://boss.doxinsoft.com/images/wap/group-who.png'" />
							</view>
						</view>
						<view class="lh-40 fc-9">•••••</view>
						<view class="people-list" v-for="(v,key) in groupArray2">
							<view class="p-item second">
								<image class="img" :src="v.headerPic ? v.headerPic :'https://boss.doxinsoft.com/images/wap/group-who.png'" />
							</view>
						</view>
					</view>
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
			<view id="footer">
				<view class="left plr8">
					<button class="btn-item" hover-class="none" @click="toIndex">
						<view class="iconfont icon-pro-shop"></view>
						<view class="txt">首页</view>
					</button>
				</view>
			
				<!-- 拼团未结束时已参团人员显示 -->
				<view class="right" v-if="data.detail.isMy && data.detail.group.leftNum > 0">
					<view class="r-nav">
						<view class="r-item cart r-item-yellow" @click="goto('/pages/shop/order/buy/detail?order_no='+data.detail.order_no,1)">查看订单</view>
					</view>
				</view>
				<!-- 拼团未结束时客户进入显示 -->
				<view class="right" v-if="!data.detail.isMy && data.detail.group.leftNum > 0">
					<view class="r-nav">
						<myform :append="true" :ruleform="{}" :vaildate="{}" @callBack="toBuy(data.detail.group.id,1)">
							<view slot="content">
								<view class="r-item buy r-item-red" @click="toBuy(data.detail.group.id,1)">立即拼</view>
							</view>
						</myform>
					</view>
				</view>
			</view>
		</view>
		<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo"></info>
	</view>
</template>

<script>
	import leftTime from "../show/layouts/left_time";
	import info from '../show/layouts/info'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components: {leftTime,uParse,info,dxListMsg,},
		data() {
			return {
				formAction: '/shop/order/group',
				mpType: 'page', //用来分清父和子组件
				// data: this.formatData(this),
				getSiteName: this.getSiteName(),
				data:{
					product:{
						group_price: 6.6,
						group_expire_date: '2020-08-01',
						group_expire_date: '2020-08-31',
						canGorupBuy: true,
						name: '新鲜水果',
						yunfei: '',
						num: 666,
						price: 10.00,
					},
					orderGroup:[{
						getUser:{ 
							headerPic: '/static/logo.png',
							nickname: '同城菜场',
						},
						leftNum: 1,
						end_date: '2020-08-31'
					},{
						getUser:{ 
							headerPic: '/static/logo.png',
							nickname: '同城菜场',
						},
						leftNum: 1,
						end_date: '2020-08-31'
					}],
					detail:{
						isMy: false,
						group:{
							leftNum: 2,
							canGorupBuy: true,
							end_date: '2020-08-08',

						}
					},
				},
				groupArray:[
					{headerPic: '/static/logo.png'},
					{headerPic: '/static/pro01.jpg'},
					{headerPic: '/static/pro02.jpg'},
					{headerPic: '/static/logo.png'},
					{headerPic: '/static/pro01.jpg'},
					{headerPic: '/static/pro02.jpg'},
					{headerPic: '/static/logo.png'},
					{headerPic: '/static/pro01.jpg'},
					{headerPic: '/static/pro02.jpg'},
				],
				groupArray2:[
					{headerPic: '/static/logo.png'},
				],
				proDetail:{
					fresh: 9,
					apply: '全部',
					content:'产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情'
				},

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
			let title = '[仅剩'+this.data.detail.group.leftNum+'个名额]我'+this.data.detail.amount+'元拼了'+this.data.product.name;
			console.log(title);
			return this.shareSource(this, title,"1");
		},
		onLoad(options) {
			// setTimeout(()=>{
			// 	this.ajax();
			// },500)
			
		},
		methods: {
			toBuy(group_id, is_group) {

				this.$refs.productInfo.showType = '';
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.group_id = group_id;
					this.$refs.productInfo.is_group = is_group;
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					if (group_id) {
						this.$refs.productInfo.addCartAjax({
							id: this.data.product.id,
							num: this.num,
							is_info: 0,
							group_id: group_id,
							is_group: is_group
						});
					} else {
						this.$refs.productInfo.addCartAjax({
							id: this.data.product.id,
							num: this.num,
							is_info: 0,
							is_group: is_group
						});
					}
				}
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		},
	}
</script>
<style scoped="">
@import url('index.css');
@import url('../show/index.css');
</style>