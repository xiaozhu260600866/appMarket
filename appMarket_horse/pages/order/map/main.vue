<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		 <view class="content">
		        <button type="primary" @tap="openMap">点击选择地址</button>
		        <view class="address">
		            <view class="">纬度：{{positionObj.latitude}}</view>
		            <view class="">经度：{{positionObj.longitude}}</view>
		            <view class="">具体地址：{{positionObj.address}}</view>
		        </view>
		
		        <mi-map 
		            v-if="mapShow"
		            ref="miMap"
		            @updateAddress="updateAddress"
		        >
		        </mi-map>
		    </view>
	</view>
</template>

<script>
	import miMap from '@/components/mi-map/mi-map.vue'
	export default {
		components: {miMap},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				mapShow:false,
				getSiteName: this.getSiteName(),
				positionObj: {},
			}
		},
		methods: {
			 // 打开地图
			            openMap() {
			                this.mapShow = true
			            },
			            // 更新地址并关闭地图
			            updateAddress(addressObj) {
							console.log(addressObj);
			                this.mapShow = false
			                this.positionObj = addressObj
			            },
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