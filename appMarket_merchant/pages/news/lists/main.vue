<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50">
			<view class="news_item mb12 bg-f" v-for="(v,index) in data.lists.data">
				<dx-list-msg :name="v.title" @click="goto(v.url,v.type)">
					<view slot="con" class="fs-13 fc-6">
						<view class="Arial mt10">{{ v.created_at }}</view>
						<view class="lh-20 wrap2 mt3">{{ v.content }}</view>
					</view>
				</dx-list-msg>
				<view class="flex-right flex-middle ptb5 mr15">
					<dx-button round type="success" size="mini" myclass="plr20 mr15" @click="goto('/pages/news/create_edit/main?id='+v.id,1)">编辑</dx-button>
					<dx-button round size="mini" myclass="plr20" @click="del(v)">删除</dx-button>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
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
				formAction: '/merchant/article/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				
			}
		},
		methods: {
			del(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个产品吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'merchant_articles'
							}).then(msg=>{
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					},
				})
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			this.ajax();
			
		},
		onShow(){
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