<template>
	<view>
		<view class="bg-f message" v-if="data.show">
		
			<dx-list-msg  :imgWidth="44" :imgHeight="44" name="系统通知"
			 :content="item.content" v-for="(item,key) in data.systemLists" @click="goto('/pages/user/message/show/main',1)">
				<view slot="left">
					<view class="licon systemI">
						<text class="iconfont icon-message-notice"></text>
					</view>
				</view>
				<view slot="right">
					<view class="right-box">
						<view class="time fs-12 fc-9 Arial">{{item.created_at}}</view>
						<view class="num" v-if="item.meassage_num>0">{{item.meassage_num}}</view>
					</view>
				</view>
			</dx-list-msg>
			<dx-list-msg  :imgWidth="44" :imgHeight="44" :name="item.title"
			 :content="item.content" v-for="(item,key) in data.orderLists" @click="goto('/pages/user/message/detail/main',1)">
				<view slot="left">
					<view class="licon orderI">
						<text class="iconfont icon-message-email"></text>
					</view>
				</view>
				<view slot="right">
					<view class="right-box">
						<view class="time fs-12 fc-9 Arial">{{item.created_at}}</view>
						 <view class="num" v-if="item.meassage_num>0">{{item.meassage_num}}</view>
					</view>
				</view>
			</dx-list-msg>
			<dx-list-msg :imgSrc="item.getUser.headerPic" :imgWidth="44" :imgHeight="44" :name="item.title"
			 :content="item.content" v-for="(item,key) in data.lists.data" @click="toMessage(item)">
		
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
				formAction: '/deliver/system-message',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				}
				
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onLoad(){
			this.ajax();
		},
		methods: {
			toMessage(item){
				if(item.user_id != this.data.myUser.id){
					return this.goto('/pages/user/message/chat/main?to_userid='+item.user_id),1
				}else{
					return this.goto('/pages/user/message/chat/main?to_userid='+item.to_userid),1
				}
			},
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