<template>
	<view class="bg-f" v-if="data.show">
		<dx-list-msg :imgSrc="item.headerPic" :name="item.name" :content="item.content" v-for="(item,key) in systemLists" @click="goto('/pages/user/message/chat/main',1)">
			<view slot="right">
				<view class="right-box">
					<view class="time fs-12 fc-9 Arial">{{item.news_time}}</view>
					<view class="num" v-if="item.meassage_num > 0">{{item.meassage_num}}</view>
				</view>
			</view>
		</dx-list-msg>
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
				formAction: '/cart/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				systemLists:[]
			}
		},
		onLoad(options) {
			this.ajax();
			this.checkLogin();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
					if(msg.systemLog){
						this.systemLists.push(
							{
								headerPic:'/static/message-send.png',
								name:'交易信息',
								content:msg.systemLog.title,
								news_time:msg.systemLog.operated_at,
								meassage_num: 0
							}	
						)
					}
				});
			}
		},
		
	}
</script>

<style scoped="">
@import url('index.css')
</style>