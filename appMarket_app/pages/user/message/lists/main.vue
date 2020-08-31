<template>
	<view>
		<view class="bg-f message" v-if="data.show">
		
			<dx-list-msg  :imgWidth="44" :imgHeight="44" 
			 :content="item.content" v-for="(item,key) in data.systemLists" @click="goto('/pages/user/message/show/main',1)">
				<view slot="left">
					<view class="licon systemI" v-if="item.type == 1">
						<text class="iconfont icon-message-notice"></text>
					</view>
					<view class="licon orderI" v-if="item.type == 2">
						<text class="iconfont icon-message-email"></text>
					</view>
					<view class="licon sendI" v-if="item.type == 3">
						<text class="iconfont icon-message-send"></text>
					</view>
				</view>
				<view slot="right">
					<view class="right-box">
						<view class="time fs-12 fc-9 Arial">{{item.created_at}}</view>
						<!-- <view class="num" v-if="item.meassage_num>0">{{item.meassage_num}}</view>
						<view class="status fs-13 mt5 lh-16 main-color" v-if="item.type==2">支付成功</view> -->
					</view>
				</view>
			</dx-list-msg>
			<dx-list-msg  :imgWidth="44" :imgHeight="44"
			 :content="item.content" v-for="(item,key) in data.orderLists" @click="goto('/pages/user/message/detail/main',1)">
				<view slot="left">
					<view class="licon systemI" v-if="item.type == 1">
						<text class="iconfont icon-message-notice"></text>
					</view>
					<view class="licon orderI" v-if="item.type == 2">
						<text class="iconfont icon-message-email"></text>
					</view>
					<view class="licon sendI" v-if="item.type == 3">
						<text class="iconfont icon-message-send"></text>
					</view>
				</view>
				<view slot="right">
					<view class="right-box">
						<view class="time fs-12 fc-9 Arial">{{item.created_at}}</view>
						<!-- <view class="num" v-if="item.meassage_num>0">{{item.meassage_num}}</view>
						<view class="status fs-13 mt5 lh-16 main-color" v-if="item.type==2">支付成功</view> -->
					</view>
				</view>
			</dx-list-msg>

		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	export default {
		components:{
			dxListMsg
		},
		data() {
			return {
				formAction: '/user/system-message',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				messageLists:[{
					headerPic:'https://appmarket.doxinsoft.com/images/wap/logo.png',
					name:'东信科技-梅',
					type: 0,
					content:'您好，请问有什么可帮到您！',
					create_at:'14:02',
					meassage_num: 3
				},{
					headerPic:'',
					type: 3,
					name: '交易物流信息',
					content:'即将确认收货通知',
					create_at: '2020-08-12',
					meassage_num: 4
				},{
					headerPic:'',
					type: 1,
					name: '您的账号已审核成功',
					content:'',
					create_at: '2020-07-17',
					meassage_num: ''
				},{
					headerPic:'',
					type: 2,
					name: 708022200300031103,
					content:'',
					create_at: '2020-07-14',
					meassage_num: ''
				}]
			}
		},
		onLoad(){
			this.ajax();
		},
		methods: {
			msgGo(v){
				if(this.messageLists.type==0){
					return this.goto('/pages/message/chat/main',1);
				}else if(this.messageLists.type==1){
					return this.goto('/pages/message/show/main',1)
				}else{
					return this.goto('/pages/order/detail/main',1)
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
@import url('index.css')
</style>