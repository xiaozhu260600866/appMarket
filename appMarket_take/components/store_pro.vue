<template>
	<view class="stre_pro bg-f" @click="goto('/pages/product/show/main')">
		<dx-products-pic v-for="item in data" :src="item.cover" :isList="true">
			<view class="title fs-16 fw-bold">{{ item.name }}</view>
			<view class="grade flex-middle fc-3 fs-12 mt3">
				<view class="sales">月销 <text class="Arial">{{ item.sales }}</text></view>
				<view class="fresh pl15">数量：<text class="Arial">{{ item.num }}</text></view>
			</view>
			<view class="num flex mt3"><view class="nav">新鲜度 <text class="Arial">{{ item.fresh }}</text></view></view>
			<view class="flex-between">
				<dx-price v-model="item.price" split :intSize="20" :decimalSize="12"></dx-price>
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
.stre_pro .num .nav{background-color: rgba(87,199,52,0.1);color: #57C734;padding: 8upx 16upx;border-radius: 6upx;font-size: 24upx;line-height: 30upx;}
</style>