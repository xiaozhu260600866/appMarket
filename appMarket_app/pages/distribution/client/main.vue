<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view><!-- v-if="data.show" -->
			<view class="rl-list">
			<view class="page-brandlists">
				<view class="list-group p15 mb8 bg-f flex" v-for="item in data.lists.data">
					<image class="img mr15" :src="item.pic" />
					<view class="info lh-20">
						<p class="fs-15">微信：{{item.nickname[0]}} <span v-if="item.nickname[0] != item.name">({{item.name ? item.name :'游客'}})</span></p>
						<p class="fs-12 fc-9">关注时间：{{item.created_at}}</p>
					</view>
				</view>
			</view>
			<view class="pageview"></view>
		</view>
		<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/dis/client',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				data:{
					lists:{
						data:[{
							pic: '/static/logo.png',
							created_at: '2020-08-01 17:36:26',
							name: '梅',
							nickname: '东信科技-梅'
						}]
					}
				}
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
			//this.ajax();
		},
		methods: {
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