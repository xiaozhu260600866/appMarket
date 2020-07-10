<template>
	<view class="stre_pro bg-f">
		<dx-products-pic v-for="item in data" :src="item.firstCover" :isList="true"  @click="goto('/pages/product/show/main?id='+item.id,1)">
			<view class="title fs-15" >{{ item.name }}</view>
			<view class="grade flex-middle fc-3 fs-12 mt3" @click="goto('/pages/product/show/main?id='+item.id,1)" >
				<view class="sales pl15" v-if="item.sales">月销 <text class="Arial">{{ item.sales }}</text></view>
				<view class="fresh">数量：<text class="Arial">{{ item.num }}</text></view>
			</view>
			<view class="num flex mt3"><view class="nav">新鲜度 <text class="Arial">{{ item.freshness }}</text></view></view>
			<view class="flex-between">
				<dx-price v-model="item.price" split :intSize="16" :decimalSize="12"></dx-price>
			</view>
			<div class="flex-right" v-if="canBuy"><tui-numberbox v-model="item.buyNum" @change="addCart(item)"></tui-numberbox></div>
		</dx-products-pic>
	</view>
</template>
<script>
import dxProductsPic from 'doxinui/components/products/pic'
import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
	components: {
		dxProductsPic,
		tuiNumberbox
	},
	props:{
		data:{
			type:Array,
			default (){
				return[]
			}
		},
		canBuy:{
			type:Boolean,
			default(){
				return true;
			}
		}
	},
	data() {
		return {
			num:0
		}
	},
	methods: {
		addCart(item){
			this.checkLogin().then(msg=>{
				this.postAjax("/cart/create",item).then(msg=>{
					if(msg.data.status == 2){
						return this.$emit("callBack",{cartData:msg.data.cartData});
					}
				});
			})
		}
	}
}
</script>
<style>
.stre_pro .num .nav{background-color: rgba(87,199,52,0.1);color: #57C734;padding: 8upx 16upx;border-radius: 6upx;font-size: 24upx;line-height: 30upx;}
</style>