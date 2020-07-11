<template>
	<view class="bg-f">
		<dx-list-msg :imgSrc="item.headerPic" :name="item.name" :content="item.content" v-for="(item,key) in messageLists">
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				messageLists:[{
					headerPic:'https://appmarket.doxinsoft.com/images/wap/logo.png',
					name:'东信科技-梅',
					content:'您好，请问有什么可帮到您！',
					news_time:'14:02',
					meassage_num: 3
				}]
			}
		},
		methods: {
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