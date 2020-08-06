<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="show_banner bg-f" id="arrowTop">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</div>
			<div class="ass-price plr15 ptb10">
				<p class="price fs-28"><span class="fs-12">￥</span>{{ data.product.group_price }}</p>
				
			</div>
			<div class="bg-f pb10">
				<div class="proTitle plr15 ptb10">
					<p class="fs-15">{{ data.product.name }}</p>
				</div>
				<div class="proCount fs-13 fc-9 plr15 pb10">
					<p>运费：{{ data.product.yunfei ? data.product.yunfei : '免运费' }}</p>
					<p>剩余：<span class="Arial">{{ data.product.num }}</span></p>
				</div>
			</div>
			<div class="group bgf plr15 pb10">
				<div class="group-box p20">
					<!-- 拼团未完成时团主及他人都显示 -->
					<div class="con" v-if="data.detail.group.leftNum && data.detail.group.canGorupBuy">
						<p class="ass-state">还差<span class="Arial num"> {{ data.detail.group.leftNum }} </span>人成团</p>
						<p class="ass-disc">剩余 <span class="Arial time">
							<leftTime v-model="data.detail.group.end_date" type="0"></leftTime>
						</span> 结束</p>
					</div>

					<!-- 自己进入时满员显示 -->
					<div class="con" v-if="data.detail.group.leftNum == 0 && data.detail.isMy">
						<p class="ass-state">拼团成功</p>
						<p class="ass-disc">恭喜您，商家尽快发货</p>
					</div>

					<!-- 别人进入时满员显示 -->
					<div class="con" v-if="data.detail.group.leftNum == 0 && !data.detail.isMy">
						<p class="ass-state">此团已满员</p>
					</div>

					<!-- 拼团失败时显示 -->
					<div class="con" v-if="data.detail.group.leftNum && !data.detail.group.canGorupBuy">
						<p class="ass-state">拼团失败</p>
						<p class="ass-disc" style="display:none">系统将自动退款</p>
					</div>

					<!-- 拼团成功时显示 -->
					<div class="con" v-if="data.detail.group.leftNum == 0 && !data.detail.group.canGorupBuy">
						<p class="ass-state">拼团成功</p>
						<p class="ass-disc" style="display:none">系统将自动退款</p>
					</div>

					<div class="people">
						<div class="people-list" v-for="(v,key) in data.detail.group.group_num">
							<div :class="['p-item',  'main']" v-if="key == 0 && data.groupInfo[0]">
								<image class="img" :src="data.groupInfo[0].getUser.headerPic" />
								<p class="tab">团长</p>
							</div>
							<div class="p-item second" v-if="key>0">
								<image class="img" :src="data.groupInfo[key] ? data.groupInfo[key].getUser.headerPic :'https://boss.doxinsoft.com/images/wap/group-who.png'" />
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="ass-rule mt8 bgf plr15">
				<div class="title ptb8">
					<p class="fs-16">拼团说明</p>
				</div>
				<div class="process pt5 pb10">
					<div class="item">
						<span class="iconfont icon-float-feedback"></span>
						<span class="name">开团/参团</span>
					</div>
					<div class="item">
						<span class="iconfont icon-float-feedback"></span>
						<span class="name">邀友参团</span>
					</div>
					<div class="item">
						<span class="iconfont icon-float-feedback"></span>
						<span class="name">人满成团</span>
					</div>
				</div>
				<div class="rule-con pb15">
					<p class="fs-14">支付开团或参团，邀请好友参团，在有效时间内达到成团人数则拼团成功，进行发货；若超时未达到拼团人数则拼团失败，系统将自动退款。</p>
				</div>
			</div>
			
			<!-- 商品评价&商品详情 -->
			<div class="pro_title mt10 bg-f">
				<div class="title-group" @click="showEvaluate=false">
					<span :class="['span','fs-16',!showEvaluate ? 'cur' :'']">商品详情</span>
				</div>
				<div class="title-group" @click="showEvaluate=true">
					<span :class="['span','fs-16',showEvaluate ? 'cur' : '']">评价</span>
				</div>
			</div>
			<view class="pro-content bg-f" v-if="!showEvaluate && data.product">
				<view class="pro-con-main">
					<uParse :content="data.product.content" />
				</view>
			</view>
			<div class="evalute pb50 bd-be" v-if="showEvaluate">
				<div class="evalute-item p10 bg-f bd-be" v-for="v in data.suggestLists">
					<div class="u-info">
						<div class="u-info-box">
							<div class="u-img"><img class="img" :src="v.getUser.headimgurl"></div>
							<div class="u-name pl10">
								<p class="name lh20 fs-14">{{ v.getUser.nickname }}</p>
								<p class="fs-12 fc-6">好评</p>
							</div>
							<div class="r-time Arial fs-12 fc-9" style="width:250px">{{ v.created_at }}</div>
						</div>
					</div>
					<div class="u-con ptb15">
						<p class="p">{{ v.suggestContent }}</p>
						<div class="image-group mt5">
							<div class="img-item" v-for="(item,index2) in v.getSuggestLogo">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</div>
						</div>
					</div>
					<div class="u-con ptb15 bd-te" v-if="v.suggestStatus ==2">
						<p class="fs-color fs-14 p" style="width:250px">{{ v.updated_at }}追评</p>
						<p class="p">{{ v.suggestContent2 }}</p>
						<div class="image-group mt5">
							<div class="img-item" v-for="(item,index2) in v.getSuggestLogo2">
								<image :src="getSiteName + '/upload/images/order/'+item " mode="aspectFill"></image>
							</div>
						</div>
					</div>
				</div>
				<div class="data-con" v-if="data.suggestLists.length == 0">
					<p class="fs-12 fc-9 p10 text-center">暂无评价</p>
				</div>
			</div>
			<!-- 商品评价&商品详情结束 -->
			
			<div id="footer">
				<div class="left plr8">
					<button class="btn-item" hover-class="none" @click="toIndex">
						<p class="iconfont icon-pro-shop"></p>
						<p class="txt">首页</p>
					</button>
				</div>

				<!-- 拼团未完成时团主或已参团人员显示 -->
				<div class="right" v-if="data.detail.isMy && data.detail.group.leftNum > 0">
					<div class="r-nav">
						<div class="r-item cart r-item-yellow" @click="goto('/pages/shop/order/buy/detail?order_no='+data.detail.order_no,1)">查看订单</div>
					</div>
					<div class="r-nav">
						<button class="r-item buy r-item-red" open-type="share">邀请好友参团</button>
					</div>
				</div>
				<!-- 拼团未完成时其他人进入显示 -->
				<div class="right" v-if="!data.detail.isMy && data.detail.group.leftNum > 0">
					<div class="r-nav">
						<myform :append="true":ruleform="{}"  :vaildate="{}"  @callBack="toBuy(0,1)">
							<div slot="content">
								<div class="r-item cart r-item-yellow">我来开新团</div>
							</div>
						</myform>
					</div>
					<div class="r-nav">
						<myform :append="true":ruleform="{}"  :vaildate="{}"  @callBack="toBuy(data.detail.group.id,1)">
							<div slot="content">
								<div class="r-item buy r-item-red" @click="toBuy(data.detail.group.id,1)">立即参与</div>
							</div>
						</myform>
					</div>
					
				</div>

				<!-- 拼团完成时其人进入显示 -->
				<div class="right" v-if="data.detail.group.leftNum <= 0 && !data.detail.isMy">
					<div class="r-nav">
						<myform :append="true" :ruleform="{}"  :vaildate="{}"  @callBack="toBuy(0,1)">
							<div slot="content">
								<div class="r-item buy o-btn r-item-red" @click="toBuy(0,1)">我来开新团</div>
							</div>
						</myform>
					</div>
				</div>

				<!-- 拼团成功时显示 -->
				<div class="right" v-if="data.detail.group.leftNum <= 0 && data.detail.isMy">
					<div class="r-nav">
						<myform :append="true":ruleform="{}"  :vaildate="{}"  @callBack="goto('/pages/shop/order/buy/detail?order_no='+data.detail.order_no,1)">
							<div slot="content">
								<div class="r-item cart r-item-yellow">查看订单</div>
							</div>
						</myform>
					</div>
					<div class="r-nav">
						<myform :append="true":ruleform="{}"  :vaildate="{}"  @callBack="goto('/pages/shop/index/index',2)">
							<div slot="content">
								<div class="r-item buy r-item-red" @click="goto('/pages/shop/index/index',2)">更多拼团</div>
							</div>
						</myform>
					</div>
				</div>

				<!-- 拼团失败显示 -->
				<div class="right" style="display: none;">
					<div class="r-item buy o-btn r-item-red" @click="toBuy(0,1)">重新开团</div>
				</div>
			</div>
		</div>
		<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo"></info>
	</view>
</template>

<script>
	import leftTime from "../show/layouts/left_time";
	import info from '../show/layouts/info'
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formAction: '/shop/order/group',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				showEvaluate: false,
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
			let title = '[仅剩'+this.data.detail.group.leftNum+'个名额]我'+this.data.detail.amount+'元拼了'+this.data.product.name;
			console.log(title);
			return this.shareSource(this, title,"1");
		},
		onLoad(options) {
			setTimeout(()=>{
				this.ajax();
			},500)
			
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
		components: {
			leftTime,
			uParse,
			info
		},
	}
</script>
<style scoped="">
@import url('index.css');
@import url('../show/index.css');
</style>