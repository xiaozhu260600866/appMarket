<template>
	<view class="shop_list bg-f" >
		<dx-products-pic v-for="item in data" @click="goto('/pages/store/index/main?merchant_id='+item.id,1)" :imgWidth="100" :imgHeight="100" :src="item.cover" :isList="true">
			<view @click="goto('/pages/store/index/main?merchant_id='+item.id,1)">
				<view class="flex-between">
					<view class="title fs-17 fw-bold">{{ item.name }}</view>
					<view class="status fc-9 fs-14" >营业中</view>
				</view>
				<view class="flex">
					<view class="flex1">
						<view class="flex-middle businessHours">
							<view class="nav">营业时间：<text class="Arial">{{ item.hour_time }}</text></view>
						</view>
						<view class="grade flex-baseline mt3">
							<tui-rate :current="4" :disabled="true" active="#FDB508" :value="item.score" :size="14"></tui-rate>
							<view class="fs-12 pl5 lh-24">{{item.score}}分</view>
						</view>
						<view class="flex-middle fs-13 fc-3 lh-20">
							<view class="pr12">起送<text class="num">￥{{item.order_amount}}</text></view>
							<!-- <view class="num"><text class="num">01</text>时<text class="num">15</text>分</view> -->
						</view>
					</view>
					<view class="location fs-13 fc-9 Arial" v-if="item.juli"><filterKm v-model="item.juli" v-if="item.juli"></filterKm></view>
				</view>
					
			</view>
		</dx-products-pic>
	</view>
</template>
<script>
import dxProductsPic from 'doxinui/components/products/pic'
import filterKm from '@/components/filterKm';
import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	export default {
	components: {
		dxProductsPic,
		filterKm,
		tuiRate
	},
	props:{
		data:{
			type:Array,
			default (){
				return[]
			}
		},
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>
<style>
.shop_list .businessHours .nav{background-color: #F4F4F4;padding: 10upx 16upx;border-radius: 6upx;color: #333;font-size: 26upx;line-height: 30upx;}
.shop_list .grade{color: #FDB508;}
</style>