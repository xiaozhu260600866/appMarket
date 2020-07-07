<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="addressLists bg-f p15 flex" v-for="item in data.lists.data" :key="item.id">
				<view class="info flex1" @click="gotoOrder(item)"> 
					<view class="name fs-14">{{item.name}}
						<text class="Arial pl10">{{item.phone}}</text>
					</view>
					<view class="address fs-14" v-if="item.address">地址：{{item.address}}</view>
				</view>
				<!-- <view class="ad_nav flex pt10">
					<div class="ad_nav_btn" @click="goto('/pages/shop/user/address/create_edit/index?id='+item.id,1)">编辑</div>
					<div class="ad_nav_btn" @click="delAddress(item)">删除</div>
				</view> -->
				<view class="ad_icon">
					<view class="icon"><text class="dxi-icon dxi-icon-edit" @click="goto('/pages/user/address/creat_edit/main?id='+item.id,1)"></text></view>
					<view class="icon"><text class="dxi-icon dxi-icon-del" @click="delAddress(item)"></text></view>
				</view>
			</view>
			<hasMore :parentData="data" source="nodata" message="还没有添加地址"></hasMore>
			<view @click="goto('/pages/user/address/creat_edit/main',1)">
				<dxftButton type="success" btnBg="#57C734" btnBd="#57C734"><text class="dxi-icon dxi-icon-add pr10"></text>添加地址</dxftButton>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxftButton
		},
		data() {
			return {
				formAction: '/user/address/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		methods: {
			gotoOrder(item) {
				let order = uni.getStorageSync('order');
				if (order) {
					let address_id = item.id;
					this.goto("/pages/order/buy/main?address_id=" + address_id);
				}
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			},
			delAddress(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个地址吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'user_address'
							}).then(msg=>{
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
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