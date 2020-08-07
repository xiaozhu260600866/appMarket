<template>
	<view>
		<page :parentData="data" :formAction="formAction">	</page>
		<view>
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
			<view class="ass-group bg-f mb12" v-if="data.orderGroup.length">
				<view class="lh-40 fs-14 plr15">以下小伙伴正在发起拼团，你可以直接参与</view>
				<view class="bd-te">
					<dx-list-msg :imgSrc="v.getUser.headerPic" :imgWidth="40" :imgHeight="40" :name="v.getUser.nickname" :nameSize="14"
					 v-for="v in data.orderGroup" v-if="v.leftNum">
						<view slot="con" class="fc-9 fs-12 mt5 flex-baseline lh-16">
							<view>还差<text class="price plr2">{{ v.leftNum }}</text>人成团，剩余</view>
							<view><leftTime v-model="v.end_date" type="0"></leftTime></view>
							<view>结束</view>
						</view>
						<view slot="right">
							<dx-button type="danger" size="mini" hollow  @click="goto('/pages/group/group/main?order_no='+v.order_no)">去拼团</dx-button>
						</view>
					</dx-list-msg>
					<view class="lh-40 fs-13 fc-6 plr15">支付开团邀请多.人参团，人数不足自动退款</view>
				</view>
			</view>
			<dx-tabs :tabs="tabs" v-model="Sstatus" selectedColor="#57C734" sliderBgColor="#57C734" :nameSize="17" :height="100"></dx-tabs>
			<view class="pro-content" v-if="Sstatus == 0">
				<view class="pro-con-main bg-f p10 fs-15 lh-22">
					<u-parse :content="proDetail.content"/>
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
					<button class="btn-item share bdr0" hover-class="none" open-type="share">
						<p class="iconfont icon-pro-share"></p>
						<p class="txt">分享</p>
					</button>
				</view>
				<view class="right">
					<view class="r-nav">
						<myform title="加入购物车" :append="true" :ruleform="{}" :vaildate="{}" @callBack="toBuy(0,0)">
							<view slot="content">
								<view class="r-item r-item-yellow">
									<text class="fs-12">￥</text><text class="Arial">{{ data.product.price }}</text>
									<text class="fs-15 pl3">单买</text>
								</view>
							</view>
						</myform>
					</view>
					<view class="r-nav">
						<myform title="加入购物车" :append="true" :ruleform="{}" :vaildate="{}" @callBack="toBuy(0,1)">
							<view slot="content">
								<view class="r-item r-item-red">
									<text class="fs-12">￥</text><text class="Arial">{{ data.product.group_price }}</text>
									<text class="fs-15 pl3">开团</text>
								</view>
							</view>
						</myform>
					</view>
				</view>
			</view>
			<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo" :infoArr="data.infoArr" :infoArr2="data.infoArr2"></info>
			<view v-if="show" class="pb10" style="position: absolute;left:-1300px">
				<!-- 海报 -->
				<sharePic :proshareBg="proshareBg" :data="data" :productFirstCover="productFirstCover" ref="sharePic"></sharePic>
				<shareProduct2 :data="data" v-if="data.show && data.dis" ref="shareProduct" :proposterBg="proposterBg" :fingerprint="fingerprint"
				 :qrcodeFilePath="qrcodeFilePath" :posterFilePath="posterFilePath"></shareProduct2>
			</view>
		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import shareProduct2 from "@/components/poster/shareProduct";
	import sharePic from "@/components/poster/sharePic.vue";
	import leftTime from "./layouts/left_time";
	import info from './layouts/info'
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxTabs from "doxinui/components/tabs/tabs"
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxImages from "doxinui/components/images/images"
	export default {
		components: {uParse,info,leftTime,shareProduct2,sharePic,dxListMsg,dxTabs,tuiRate,dxImages},
		data() {
			return {
				formAction: '/shop/product/show',
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
				},
				proDetail:{
					fresh: 9,
					apply: '全部',
					content:'产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情产品详情'
				},
				Sstatus: 0,
				tabs: [{
					value: 0,
					name: "商品详情"
				}, {
					value: 1,
					name: "评价"
				}],
				suggestLists:[{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:4,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
					]
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:5,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
					]
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:3,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
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
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			if(this.data.product.is_group || this.data.product.is_miaosha){
				this.data.query.shareImg = this.$refs.sharePic.getImg();
			}
			console.log(this.data.query);
			return this.shareSource(this, this.data.product.name,'notShareSource');
		},
		onLoad(options) {
			//this.getMyAddress(this);
			//this.ajax();
		},
		methods: {
			getforMatDate(created_at){
				let date2=created_at.replace(new RegExp(/-/gm) ,"/");
				let date1 = new Date(date2);
				return this.dateToString(date1);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.product.video_url){
						this.getQQvideoLink(msg.product.video_url,msg=>{
							this.videoUrl = msg.url;
						});
					}
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
						success:res=>{
							this.posterFilePath = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/proshare-bg03.png',
						success:res=>{
							this.proshareBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/prohead-bg.png',
						success:res=>{
							this.prodheadBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.data.product.firstCover,
						success:res=>{
							this.productFirstCover = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/proposter-bg.jpg',
						success:res=>{
							this.proposterBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/fingerprint.png',
						success:res=>{
							this.fingerprint = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
						success:res=>{
							this.posterFilePath = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/dis/p'+msg.product.id+'.jpg',
						success:res=>{
							this.qrcodeFilePath = res.tempFilePath;
							this.show = true;
						}
					});
				});
			},
			addCart() {
				this.$store.state.mutations.cart = true;
				this.$refs.productInfo.showType = 'addCart';
				if (this.data.infoArr.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.product.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			infoCallBack(cartNum) {
				this.data.cartNum = cartNum;
			},
			toBuy(group_id, is_group) {
				if (is_group && !this.data.product.canGorupBuy) {
					this.getError('活动已结束');
					return false;
				}
				this.$refs.productInfo.showType = '';
				if (this.data.infoArr.length > 0) {
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
			addUserCollection() {
				let product_id = this.data.product.id;
				let url = "/shop/product/collection";
				if (this.data.collections) return false;
				this.postAjax(url, {
					id: product_id
				}, msg => {
					if (msg.data.status == 2) {
						this.data.collections = 1;
					}
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>