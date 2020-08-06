<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show"><!-- v-if="data.show" -->
			<view class="Uinfo main-bg pt20 pb35 plr20">
				<view class="header-img pr15">
					<image class="img" :src="data.user.userInfo.pic ? data.user.userInfo.pic : 'https://boss.doxinsoft.com/images/nouser01.png'" mode="aspectFill" />
				</view>
				<view class="info fc-white">
					<view class="fs-20">{{ data.user.userInfo.name }}</view>
					<view class="no fs-16 Arial">{{data.user.userInfo.phone}}</view>
				</view>
			</view>
			<view class="block-sec">
				<view class="head-count">
					<view class="like" @click="goto('/pages/distribution/count/main',1)">
						<view class="c-item">
							<view class="num">{{data.orderSum}}</view>
							<view class="name">累计收益(元)</view>
						</view>
					</view>
					<view class="like" @click="goto('/pages/distribution/count/main',1)">
						<view class="c-item">
							<view class="num">{{data.orderCount}}</view>
							<view class="name">累计订单</view>
						</view>
					</view>
					<view class="like" @click="goto('/pages/distribution/client/main',1)">
						<view class="c-item">
							<view class="num">{{data.clientCount}}</view>
							<view class="name">累计新增客户</view>
						</view>
					</view>
				</view>
				<dx-list-cell arrow name="可提现金额" noborder @click="goto('/pages/distribution/domoney/main',1)">
					<view slot="right" class="price fs-15">
						{{data.price}}
					</view>
				</dx-list-cell>
			</view>
			<view class="block-sec">
				<dx-nav-class @click="checkAuth" :data="navGroup" myclass="mtb10" iconSize="26" :num="4"></dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{dxListCell,dxNavClass},
		data() {
			return {
				formAction: '/user/share/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				navGroup: [{
					url:"/pages/distribution/count/main",
					type:1,
					icon:"iconfont icon-dis-income",
					name:"收益明细"
				},{
					url:"/pages/distribution/record-list/main",
					type:1,
					icon:"iconfont icon-dis-record",
					name:"提现记录"
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
			this.ajax();
		},
		onShow(){
			//this.ajax();
		},
		methods: {
			checkAuth(v){
				return this.goto(v.url,v.type);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
			
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>