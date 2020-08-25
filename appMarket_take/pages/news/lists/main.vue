<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50">
			<view class="news_item mb12 bg-f" v-for="(v,index) in newsLists">
				<dx-list-msg :imgSrc="v.cover" :name="v.title" :imgR="3" :imgHeight="80" :imgWidth="120" @click="goto(v.url,v.type)">
					<view slot="con" class="fs-13 fc-6">
						<view class="Arial mt8">{{ v.created_at }}</view>
						<view class="lh-20 wrap2 mt3">{{ v.content }}</view>
					</view>
				</dx-list-msg>
				<view class="flex-right flex-middle ptb5 mr15">
					<dx-button round type="success" size="mini" myclass="plr20 mr15" @click="goto('/pages/news/create_edit/main',1)">编辑</dx-button>
					<dx-button round size="mini" myclass="plr20">删除</dx-button>
				</view>
			</view>
			<view @click="goto('/pages/news/create_edit/main',1)"><dxftButton type="success">发布公告</dxftButton></view>
		</view>
	</view>
</template>

<script>
import dxListMsg from "doxinui/components/list-cell/list-msg"
import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxListMsg,dxftButton
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				newsLists:[{
					url:'/pages/news/show/main',
					type: 1,
					cover: '/static/banner01.jpg',
					title: '新鲜菜品直接送达家门口',
					content: '使用直接送达简单、快捷、方便、卫生、方便，节省更多的时间，提高生活质量',
					created_at: '2020-06-10'
				},{
					url:'/pages/news/show/main',
					type: 1,
					cover: '/static/banner01.jpg',
					title: '新鲜菜品直接送达家门口',
					content: '使用直接送达简单、快捷、方便、卫生、方便，节省更多的时间，提高生活质量',
					created_at: '2020-06-10'
				},{
					url:'/pages/news/show/main',
					type: 1,
					cover: '/static/banner01.jpg',
					title: '新鲜菜品直接送达家门口',
					content: '使用直接送达简单、快捷、方便、卫生、方便，节省更多的时间，提高生活质量',
					created_at: '2020-06-10'
				},{
					url:'/pages/news/show/main',
					type: 1,
					cover: '/static/banner01.jpg',
					title: '新鲜菜品直接送达家门口',
					content: '使用直接送达简单、快捷、方便、卫生、方便，节省更多的时间，提高生活质量',
					created_at: '2020-06-10'
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