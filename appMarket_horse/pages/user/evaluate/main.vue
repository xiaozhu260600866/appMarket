<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="mb12 eva-top">
				<view class="total_qoute main-bg flex-middle flex-center ptb20">
					<tui-rate :value="data.quoteAvg" :disabled="true" :size="18" active="#FFDC00" normal="#fff"></tui-rate>
					<view class="fs-18 pl15 fc-yellow"><text class="Arial">{{data.quoteAvg}}</text>分</view>
				</view>
				<dx-tabs :tabs="navbar" v-model="quote" selectedColor="#57C734" sliderBgColor="#57C734" @change="ajax"></dx-tabs>
			</view>
			<view class="evalute">
				<view class="evalute-item p10 bg-f bd-be" v-for="v in data.lists.data">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img">
								<image class="img" :src="v.user.headerPic"  />
							</view>
							<view class="u-name pl10">
								<view class="name lh-20 fs-14">{{ v.addr_name }}</view>
								<view class="flex-middle">
									<tui-rate :value="v.horse_quote" :disabled="true" :size="14"></tui-rate>
									<view class="fs-12 fc-6 pl8"><text class="Arial">{{v.horse_quote}}</text>分</view>
								</view>
							</view>
							<view class="r-time Arial fs-13 fc-9 pl10">{{ v.evaluate_date }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15">
						<view class="p">{{ v.horse_evaluate }}</view>
					</view>
					<view class="u_order fs-14 fc-6 bg-f2 plr15 ptb5 mt10">
						<view>订单号：<text class="Arial">{{ v.order_no }}</text></view>
						<view>订单日期：<text class="Arial">{{ v.created_at }}</text></view>
						<view>商家：<text class="Arial">{{ v.getMerchant.name }}</text></view>
						<view>地址：<text class="Arial">{{ v.getMerchant.address }}</text></view>
					</view>
				</view>
				<hasMore :parentData="data"></hasMore>
			</view>
			
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	export default {
		components:{
			dxTabs,dxTabsScroll,tuiRate
		},
		data() {
			return {
				formAction: '/horse/evaluate',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				currentTab: 0,
				total_qoute: 4,
				quote:0,
				navbar: [{
					name: "综合评价",
					value: 0
				}, {
					name: "好评",
					value: 2
				}, {
					name: "差评",
					value: 4
				}],
				suggestLists:[{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:4,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'很给力，很及时',
					order:{
						order_no: 202022552525252,
						order_date: '2020-06-27',
						store: '东风生鲜',
						address:'广东省江门市蓬江区建设路82号10楼100室东信科技有限公司'
					}
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:5,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'很给力，很及时',
					order:{
						order_no: 202022552525252,
						order_date: '2020-06-27',
						store: '东风生鲜',
						address:'广东省江门市蓬江区建设路82号10楼100室东信科技有限公司'
					}
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:3,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'很给力，很及时',
					order:{
						order_no: 202022552525252,
						order_date: '2020-06-27',
						store: '东风生鲜',
						address:'广东省江门市蓬江区建设路82号10楼100室东信科技有限公司'
					}
				}]
			}
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
			ajax() {
				this.getAjaxForApp(this, {
				quote:this.quote
				}).then(msg => {
					
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