<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="tabs" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#57C734" :bold="true"
			 sliderBgColor="rgba(87, 199, 52, 0.15)" v-model="tabStatus" isFixed></dx-tabs>
			<view class="count-box">
				<view class="other-time block-sec" v-if="tabStatus == 4">
					<weui-input v-model="ruleform.start_date"  type="date" name="start_date"></weui-input>
					<view class="and">—</view>
					<weui-input v-model="ruleform.end_date"  type="date" name="end_date"></weui-input>
				</view>
				<view class="block-sec count-sec">
					<view class="count-row">
						<view class="row-item">
							<view class="num">0.00</view>
							<view class="name">累计收益</view>
							<view class="remark">含等结算:<text class="Arial">0.00</text>元</view>
						</view>
					</view>
				</view>
				<view class="Dorder">
					<view class="title">收益明细（<text class="Arial">{{ order.order_num }}</text>笔）</view>
					<div class="order-list mb8 bg-f" v-for="(item,key) in orderLists" v-if="listsShow" :key="item.id">
						<div class="title plr15 ptb10 bd-be">
							<image class="head mr10" :src="item.getUser.headerPic" />
							<p class="name fs-15">{{item.getUser.userInfo.name ? item.getUser.userInfo.name : item.getUser.nickname}}({{ item.source  }}级)<span v-if="data.query.status == -1">({{ item.getStatus}})</span></p>
							<p class="num fs-15 fc-orange">+<span class="">{{item.amount}}</span></p>
						</div>
						<div class="pro-info">
							<div class="plr5" @click="goto('/pages/product/show/index?id='+product.getProduct.id,1)">
								<orderPro :data="item.products"></orderPro>
							</div>
							<div class="order_count plr15 fs-13" v-if="item.getOrder.shipping == 2">共<span class="Arial">{{item.getOrder.num}}</span>件商品
								实付：￥<span class="Arial fs-16 fc-red">{{ toFixed(parseFloat(item.getOrder.amount) - parseFloat(item.getOrder.payed_amount))}}</span>
							</div>
							<div class="order_count plr15 fs-13" v-else>共<span class="Arial">{{item.getOrder.num}}</span>件商品
								实付：￥<span class="Arial fs-16 fc-red">{{ toFixed((parseFloat(item.getOrder.amount)+  parseFloat(item.getOrder.yunfei))  - parseFloat(item.getOrder.payed_amount))}}</span>
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
	export default {
		components:{
			dxTabs
		},
		data() {
			return {
				formAction: '/shop/dis/do-money',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabStatus: 0,
				ruleform:{
					start_date: '2020-07-15',
					end_date: '2020-07-31'
				},
				tabs: [{
					value: 0,
					name: "全部"
				}, {
					value: 1,
					name: "今日"
				}, {
					value: 2,
					name: "昨日"
				}, {
					value: 3,
					name: "近七天"
				}, {
					value: 4,
					name: "自定义"
				}],
				order:{
					order_num:3
				},
				listsShow: true,
				orderLists:[{
					source: '一',
					getUser:{
						headerPic: '/static/logo.png',
						nickname:'东信科技-强',
						userInfo:{
							name: '朱伟强'
						}
					},
					products:[{
						getProduct:{
							firstCover:'/static/pro02.jpg',
							name: '新鲜芒果',
						},
						amount: 20,
						num: 4
					}],
					getOrder:{
						shipping: 1,
						amount: 20,
						num: 4,
						yunfei: 0,
						payed_amount: 20
					},
					amount: 2,
					order_no:202020202030332,
					created_at:'2020-08-03 17:23:25'
				},{
					source: '一',
					getUser:{
						headerPic: '/static/logo.png',
						nickname:'东信科技-强',
						userInfo:{
							name: '朱伟强'
						}
					},
					products:[{
						getProduct:{
							firstCover:'/static/pro02.jpg',
							name: '新鲜芒果',
						},
						amount: 20,
						num: 4
					}],
					getOrder:{
						shipping: 1,
						amount: 20,
						num: 4,
						yunfei: 0,
						payed_amount: 20
					},
					amount: 2,
					order_no:202020202030332,
					created_at:'2020-08-03 17:23:25'
				}]
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
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped>
@import url("./index.css");
</style>