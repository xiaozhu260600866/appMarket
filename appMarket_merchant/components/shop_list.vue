<template>
	<view class="shop_list bg-f"  @click="goto('/pages/store/index/main')">
		<dx-products-pic v-for="item in data" :src="item.cover" :isList="true">
			<view class="flex-between">
				<view class="title fs-17 fw-bold">{{ item.title }}</view>
				<view class="status fc-9 fs-14" v-if="item.status">{{ item.status }}</view>
			</view>
			<view class="grade flex-baseline">
				<dx-icon name="star-fill" size="12" color="#ff721f"></dx-icon>
				<view class="num fc-orange fs-13 ml5">{{ item.grade }}分</view>
			</view>
			<view class="flex-middle fs-13 fc-3 lh-20">
				<view class="pr12">起送<text class="num">￥{{item.amount}}</text></view>
				<view class="pr12 num">{{item.distance}}km</view>
				<view class="num"><text class="num">{{item.hour}}</text>时<text class="num">{{item.minute}}</text>分</view>
			</view>
			<view class="flex-middle businessHours mt3">
				<view class="nav">营业时间：<text class="Arial">{{ item.businessHours }}</text></view>
			</view>
		</dx-products-pic>
	</view>
</template>
<script>
import dxProductsPic from 'doxinui/components/products/pic'
	export default {
	components: {
		dxProductsPic
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
.shop_list .businessHours .nav{background-color: #fef8e0;padding: 10upx 16upx;border-radius: 6upx;color: #f88109;font-size: 26upx;line-height: 30upx;}
</style>