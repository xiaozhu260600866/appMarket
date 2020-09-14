<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="zindex2">
			<view class="iad-img">
				<image src="../../static/Iad02.jpg" mode="aspectFill" class="img"></image>
			</view>
			<view class="special">
				<view class="special-item" v-for="(v,key) in data.lists.data" @click="goto('/pages/product/show/main?id='+v.id,1)">
					<view class="pimg">
						<image class="img" :src="v.firstCover" mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="name">{{v.name}}</view>
						<view class="flex-baseline flex-between">
							<view class="price">￥{{v.auto_group ? v.group_price : v.price}}</view>
							<view class="group_num flex1" v-if="v.auto_group">拼团人数:<text class="Arial">{{v.group_num}}</text></view>
							<view class="sales" v-if="v.self_num_">售量:<text class="Arial">{{v.self_num_}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/product/lists?id_index=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			this.ajax();
		},
		onReachBottom() {
			console.log(1);
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
@import url('index.css');
</style>