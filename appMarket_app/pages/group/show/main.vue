<template>
	<view>
		<page :parentData="data" :formAction="formAction"> </page>
		<view>
			<view class="show_banner bg-f">
					<myswiper :data="data.silders" :tbPadding="0" :lrPadding="0" :bdR="0"></myswiper>
			</view>
			<view class="ass-price plr15 ptb10">
				<view class="price fs-28"><text class="fs-12">￥</text>{{ data.detail.group_price }}</view>
				<view class="r-time" v-if="data.detail.group_expire_date!='2099-12-30' || data.detail.group_expire_date != '2099-12-30 00:00:00'">
					<view v-if="data.detail.canGorupBuy">
						<view class="fc-white fs-12">距离活动结束还剩</view>
						<leftTime v-model="data.detail.group_expire_date" type="1"></leftTime>
					</view>
					<view v-else>
						<view class="fc-white fs-18">活动已结束</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12">
				<view class="proTitle plr15 ptb10">
					<view class="fs-15">{{ data.detail.name }}</view>
				</view>
				<view class="proCount fs-13 fc-9 plr15 pb10">

					<view>剩余：<text class="Arial">{{ data.detail.group_num }}</text></view>
				</view>
			</view>
			<view class="pro_type bg-f mtb12">
				<dx-list-msg name="新鲜度" content="新鲜库越高，菜品越新鲜" :nameSize="15">
					<view slot="right">
						<view class="fs-15 Arial main-color">{{data.detail.freshness}}</view>
					</view>
				</dx-list-msg>
				<dx-list-msg name="适用人群" :nameSize="15">
					<view slot="right">
						<view class="fs-14 fc-3">全部</view>
					</view>
				</dx-list-msg>
			</view>
			<view class="ass-group bg-f mb12" v-if="data.groupOrder.length">
				<view class="lh-40 fs-14 plr15">以下小伙伴正在发起拼团，你可以直接参与</view>
				<view class="bd-te">
					<dx-list-msg :imgSrc="v.getUser.userInfo.pic ?v.getUser.userInfo.pic : 'https://boss.doxinsoft.com/images/nouser01.png' " :imgWidth="40" :imgHeight="40" :name="v.getUser.nickname" :nameSize="14"
					 v-for="v in data.groupOrder">
						<view slot="con" class="fc-9 fs-12 mt5 flex-baseline lh-16">
							<view>还差<text class="price plr2">{{ data.detail.group_num - data.groupOrder.length }}</text>人成团，剩余</view>
							<view><leftTime v-model="data.detail.group_expire_date" type="0"></leftTime></view>
							<view>结束</view>
						</view>
						<view slot="right">
							
						</view>
					</dx-list-msg>
					<view class="lh-40 fs-13 fc-6 plr15">支付开团邀请多人参团，人数不足自动退款</view>
				</view>
			</view>
			<dx-tabs :tabs="tabs" v-model="Sstatus" selectedColor="#57C734" sliderBgColor="#57C734" :nameSize="17" :height="100"></dx-tabs>
			<view class="pro-content" v-if="Sstatus == 0">
				<view class="pro-con-main bg-f p10 fs-15 lh-22">
					<u-parse :content="data.detail.content" />
				</view>
				<view class="data-con">
					<view class="fs-12 fc-9 p20 text-center">暂无详情</view>
				</view>
			</view>
			<view class="evalute" v-if="Sstatus == 1">
				<view class="evalute-item p10 bg-f bd-be" v-for="v in suggestLists">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img">
								<image class="img" :src="v.headimgurl" />
							</view>
							<view class="u-name pl10">
								<view class="name lh-20 fs-14">{{ v.nickname }}</view>
								<tui-rate :value="v.quote" :disabled="true"></tui-rate>
							</view>
							<view class="r-time Arial fs-13 fc-9 pl10">{{ getforMatDate(v.created_at) }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15">
						<view class="p">{{ v.suggestContent }}</view>
						<dx-images :data="v.getSuggestLogo"></dx-images>
					</view>

				</view>
				<view class="data-con">
					<view class="fs-12 fc-9 p20 text-center">暂无评价</view>
				</view>
			</view>
			<view id="footer">
				<view class="left plr8">
					<button class="btn-item share bdr0" hover-class="none" @click="goto('/pages/shop/index/index', 2)">
						<p class="iconfont icon-pro-shop"></p>
						<p class="txt">商城</p>
					</button>
					<!-- <button class="btn-item share bdr0" hover-class="none" open-type="share">
						<p class="iconfont icon-pro-share"></p>
						<p class="txt">分享</p>
					</button> -->
				</view>
				<view class="right" v-if="data.detail.canGorupBuy">
					<view class="r-nav">
						<view class="r-item r-item-yellow" @callBack="toBuy(0)">
							<view class="num"><text class="fs-12">￥</text><text class="Arial">{{ data.detail.price }}</text></view>
							<view class="name">单买</view>
						</view>
					</view>
					<view class="r-nav">
						<view class="r-item r-item-red" @click="toBuy(1)">
							<view class="num"><text class="fs-12">￥</text><text class="Arial">{{ data.detail.group_price }}</text></view>
							<view class="name">参团</view>
						</view>
					</view>
				</view>
				<view class="right" v-else>
					<view class="r-nav">
						<view class="r-item r-item-default">活动已结束</view>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'

	import leftTime from "./layouts/left_time";

	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxTabs from "doxinui/components/tabs/tabs"
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxImages from "doxinui/components/images/images"
	export default {
		components: {
			uParse,
			leftTime,
			dxListMsg,
			dxTabs,
			tuiRate,
			dxImages
		},
		data() {
			return {
				formAction: '/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				Sstatus: 0,
				id: "",
				suggestLists: [],
				getSiteName: this.getSiteName(),
				tabs: [{
					value: 0,
					name: "商品详情"
				}, {
					value: 1,
					name: "评价"
				}],
			}
		},
		onReachBottom() {
			console.log('123');
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},

		onLoad(options) {
			//this.getMyAddress(this);
			this.id = options.id;
			this.ajax();
		},
		methods: {
			getforMatDate(created_at) {
				let date2 = created_at.replace(new RegExp(/-/gm), "/");
				let date1 = new Date(date2);
				return this.dateToString(date1);
			},
			ajax() {
				this.getAjaxForApp(this, {
					id: this.id
				}).then(msg => {

				});
			},
			toBuy(auto_group) {
				console.log("|12");
				if (auto_group) {
					return this.goto("/pages/order/buy/main?product_id=" + this.data.detail.id + '&group=1', 1);
				} else {
					return this.goto("/pages/order/buy/main?product_id=" + this.data.detail.id + '&group=0', 1);
				}
			}
		}
	}
</script>
<style scoped="">
	@import url('index.css');
</style>
