<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="chat-lists" v-for="(item,key) in data.lists.data">
				<view class="chat-time">{{ item.created_at }}</view>
				<view class="chat-con">
					<view class="chat-left chat-item" v-if="data.myUser.id != item.user_id">
						<image class="chat-head" :src="item.getUser.headerPic"></image>
						<view class="chatbox chatbox-left">{{ item.content }}</view>
					</view>
					<view class="chat-right chat-item" v-else>
						<view class="chatbox chatbox-right">{{ item.content }}</view>
						<image class="chat-head" :src="item.getUser.headerPic"></image>
					</view>
				</view>
			</view>
			<view class="chat-footer" >
				<input class="chat-input" type="text" v-model="content"/>
				<view class="chat-nav" @click="add">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/merchant/system-message?type=3&bothMessage=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				merchant_id:"",
				to_userid:'',
				getSiteName: this.getSiteName(),
				content:"",
			}
		},
		methods: {
			add(){
				if(!this.content){
					return  this.getError("请输入内容");
				}
				this.postAjax("/merchant/addSystemMesaage",{to_userid:this.to_userid,content:this.content},"notloading").then(msg=>{
					if(msg.data.status == 2){
						this.content= "";
						this.ajax("notLoing");
					}
				});
			},
			ajax(notLoing) {
				this.getAjaxForApp(this, {
					to_userid:this.to_userid,
					merchant_id:this.merchant_id
				}).then(msg => {
					this.setTitle(msg.user.userInfo.name)
					this.data.lists.data.reverse();
					this.toDown();
				},"notLoing");
			}
		},
		onLoad(options) {
			this.to_userid = options.to_userid;
			this.merchant_id = options.merchant_id;
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