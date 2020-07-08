<template>
	<view class="shop_list bg-f" >
		<dx-products-pic v-for="item in data" @click="goto('/pages/store/index/main?merchant_id='+item.id,1)" :imgWidth="100" :imgHeight="100" :src="item.cover" :isList="true">
			<view @click="goto('/pages/store/index/main?merchant_id='+item.id,1)">
				<view class="flex-between">
					<view class="title fs-17 fw-bold">{{ item.name }}</view>
					<view class="status fc-9 fs-14" >营业中</view>
				</view>
				<view class="flex-middle businessHours">
					<view class="nav">营业时间：<text class="Arial">{{ item.hour_time }}</text></view>
				</view>
				<view class="grade flex-baseline mt3">
					<tui-rate :current="4" :disabled="true" :score="0.45"></tui-rate>
				</view>
				<view class="flex-middle fs-13 fc-3 lh-20">
					<view class="pr12">起送<text class="num">￥{{item.order_amount}}</text></view>
					<view class="pr12 num">
						<filterKm v-model="item.juli" v-if="item.juli"></filterKm>
					</view>
					<view class="num"><text class="num">1</text>时<text class="num">1</text>分</view>
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
		filterKm
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
</style>