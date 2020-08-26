<template>
	<view>
		<view v-if="data.show">
			<view class="head-info utop">
				<view class="uinfo">
					<view class="header-img">
						<image class="img" :src="userInfo.headerPic" />
					</view>
					<view class="flex-between flex-middle flex1">
						<view class="pl15 fc-white right info" @click="goto('/pages/user/setting/layouts/info',1)">
							<view class="fs-18">{{ data.detail.name}}</view>
							<view class="fs-16 Arial">ID:{{data.detail.id}}</view>
						</view>
							<view class="status"><weui-input v-model="ruleform.work_status" name="work_status" changeField="value" type="select" dataKey="statusArr" @callback="selectRes"></weui-input></view>
					</view>
				</view>
			</view>
			
			<view class="ugorup-box bg-f mb8 count">
				<view class="head-count">
					<view class="c-item" @click="goto('/pages/user/wallet/index/main',1)">
						<view class="num fs-18 fc-3">{{data.toDayInSum}}<text class="fs-14">元</text></view>
						<view class="name fs-13 fc-6">今日收入</view>
					</view>
					<view class="c-item">
						<view class="num fs-18 fc-3">{{data.toDayInCount}}<text class="fs-14">单</text></view>
						<view class="name fs-13 fc-6">今日完成订单</view>
					</view>
					<view class="c-item">
						<view class="num fs-18 fc-3">{{data.toDayInCount}}<text class="fs-14">分</text></view>
						<view class="name fs-13 fc-6">综合评价</view>
					</view>
				</view>
			</view>
			
			<view class="ugorup-box bg-f mb8">
				<dx-title name="常用工具" nameBold="bold" :nameSize="15" :height="40"></dx-title>
				<dx-nav-class :data="applyArray"  @click="checkAuth" myclass="bdr12" num="4" :imgWidth="30" :imgHeight="30" :nameSize="12" :namePTop="5"></dx-nav-class>
			</view>
			
		</view>
	</view>
</template>

<script>
import dxTitle from "doxinui/components/title/title"
import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{
			dxTitle,
			dxNavClass
		},
		data() {
			return {
				formAction: '/horse/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					sendType: 1
				},
				ruleform:{
					work_status: 1
				},
				userLogin: true,
				count:{
					amount:24,
					integral:11,
					couponNum:0
				},
				userInfo:{
					headerPic:'https://appmarket.doxinsoft.com/images/nouser01.png',
					name:'东信科技-梅'
				},
				applyArray:[
					{
						url:'/pages/order/lists/main',
						type: 1,
						icon:'iconfont icon-user-order',
						name:'我的订单'
					},{
						url:'/pages/user/wallet/index/main',
						type: 1,
						icon:'iconfont icon-user-wallet',
						name:'我的收入'
					},{
						url:'/pages/user/evaluate/main',
						type: 1,
						icon:'iconfont icon-user-evaluate',
						name:'我的评价'
					},{
						url:'/pages/user/info/main',
						type: 1,
						icon:'iconfont icon-user-info',
						name:'个人信息'
					}
				],
				statusArr: [{
					label: '开工',
					value: '1',
				},{
					label: '休息',
					value: '3',
				}],
			}
		},
		methods: {
			selectRes(){
				this.postAjax("/horse/info",this.ruleform).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				});
			},
			checkAuth(v){
				console.log(v);
				return this.goto(v.url,v.type);
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.ruleform.work_status = msg.detail.work_status;
				});
			}
		},
		onLoad(options) {
			this.ajax();
			// uni.getSystemInfo({
			// 	success:res=> {
			// 		this.getError(res.screenHeight+'');
			// 		console.log(res.screenHeight);
			// 	}
			// });
			//this.ajax();
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