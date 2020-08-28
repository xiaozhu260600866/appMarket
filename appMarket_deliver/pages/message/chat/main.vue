<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="chat-lists" v-for="(v,key) in chatLists">
				<view class="chat-time">{{ v.time }}</view>
				<view class="chat-con" v-for="(item,index) in v.chatCon">
					<view class="chat-left chat-item" v-if="item.type == 0">
						<image class="chat-head" :src="item.chat_head"></image>
						<view class="chatbox chatbox-left">{{ item.chat_content }}</view>
					</view>
					<view class="chat-right chat-item" v-if="item.type == 1">
						<view class="chatbox chatbox-right">{{ item.chat_content }}</view>
						<image class="chat-head" :src="item.chat_head"></image>
					</view>
				</view>
			</view>
			<view class="chat-footer">
				<input class="chat-input" type="text" />
				<view class="chat-nav">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				chatLists:[{
					time: '2020-07-08 17:21:13',
					chatCon:[{
						type: 1,
						chat_head: '/static/pro02.jpg',
						chat_content: '你好'
					},{
						type: 1,
						chat_head: '/static/pro02.jpg',
						chat_content: '请问这个商品包邮吗？我想买比较多，可以便宜些吗？'
					},{
						type: 0,
						chat_head: '/static/pro03.jpg',
						chat_content: '您好，您需要多少呢？我们珠三角地区可以包邮的'
					}]
				}]
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
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