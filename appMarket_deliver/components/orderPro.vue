<template>
	<view :class="['order_pro', myclass ? myclass : '']">
		<view class="order_info2" v-for="(item,key) in data">
			<view class="pro_img">
				<image class="img" :src="item.getProduct.firstCover" mode="aspectFill" />
			</view>
			<view class="pro_info">
				<view class="Titem">
					<view class="left">
						<view class="name">{{item.getProduct.name}}</view>
						<view class="specs" v-if="item.is_info">{{item.attribute}}</view>
					</view>
					<view class="right">
						<view class="price">￥{{toFixed(item.amount / item.num ) }}</view>
						<view class="num">x {{item.num}}</view>
					</view>
				</view>
				<view class="scount">小计：{{item.amount}}</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
export default {
	props: ['data','url','myclass',"toOrder"],
	data() {
		return {
			
		}
	},
	methods: {
		toProduct(item){
			console.log(item);
			return this.goto(this.url+item.getProduct.id,1)
		}
	}
}

</script>
<style>
.order_pro{padding: 0 20upx;}
.order_info2{display: flex;padding: 20upx 0;border-bottom: 1upx #F5F5F5 dashed;}
.order_info2:last-child{border-bottom: 0;}
.order_info2 .pro_img{padding-right: 20upx;}
.order_info2 .pro_img .img{width: 140upx;height: 140upx;display: flex;border-radius: 6upx;}
.order_info2 .pro_info{flex: 1;overflow: hidden;display: flex;flex-wrap: wrap;align-content: space-between;}
.order_info2 .Titem{display: flex;justify-content: space-between;width: 100%;}
.order_info2 .Titem .left{flex: 1;overflow: hidden;}
.order_info2 .Titem .right{text-align: right;padding-left: 20upx;}
.order_info2 .Titem .name{font-size: 30upx;line-height: 40upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.order_info2 .Titem .specs{font-size: 28upx;line-height: 40upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.order_info2 .Titem .price{font-size: 28upx;line-height: 40upx;color: #333;}
.order_info2 .Titem .num{font-size: 28upx;line-height: 40upx;color: #666;}
.order_info2 .scount{font-size: 28upx;line-height: 40upx;color: #333;text-align: right;width: 100%;}
</style>