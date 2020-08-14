<template>
	<view class="tui-product-list">
		<view class="tui-product-container">
			<block v-for="(item,index) in data.lists.data" :key="index" v-if="(index+1)%2!=0 || isList">
				<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
				<!--商品列表-->
				<myform :ruleform="{}" :append="true" :vaildate="{}" :data="item" @callBack="goto(item.auto_group ? '/pages/shop/group/show/index?id='+item.id :'/pages/shop/product/show/index?id='+item.id,1)">
					<div slot="content">
						<view class="tui-pro-item" :class="[isList?'tui-flex-list':'']" hover-class="hover" :hover-start-time="150">
							<image :src="filterImage('300_'+item.thumb_pic,'product')" class="tui-pro-img" :class="[isList?'tui-proimg-list':'']"
							 mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit lh-20">{{item.name}}</view>
								<view class="dx-pro-group flex-between">
									<view class="tui-pro-price lh-22">
										<text class="tui-sale-price">￥{{item.price}}</text>
										<text class="tui-unit" v-if="item.unit">/{{item.unit}}</text>
									</view>
									<view class="tui-pro-pay lh-16">已售{{item.self_num_}}</view>
								</view>
							</view>
						</view>
					</div>
				</myform>
				
				<!--商品列表-->
			</block>
		</view>
		<view class="tui-product-container" v-if="!isList">
			<block v-for="(item,index) in  data.lists.data" :key="index" v-if="(index+1)%2==0">
				<!-- <template is="productItem" data="{{item,index:index}}" /> -->
				<!--商品列表-->
				<myform :ruleform="{}" :append="true" :vaildate="{}" :data="item" @callBack="goto(item.auto_group ? '/pages/shop/group/show/index?id='+item.id :'/pages/shop/product/show/index?id='+item.id,1)">
					<div slot="content">
						<view class="tui-pro-item" :class="[isList?'tui-flex-list':'']" hover-class="hover" :hover-start-time="150">
							<image :src="filterImage('300_'+item.thumb_pic,'product')" class="tui-pro-img" :class="[isList?'tui-proimg-list':'']"
							 mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit lh-20">{{item.name}}</view>
								<view class="dx-pro-group flex-between">
									<view class="tui-pro-price lh-22">
										<text class="tui-sale-price">￥{{item.price}}</text>
										<text class="tui-unit" v-if="item.unit">/{{item.unit}}</text>
									</view>
									<view class="tui-pro-pay lh-16">已售{{item.self_num_}}件</view>
								</view>
							</view>
						</view>
					</div>
				</myform>
				<!--商品列表-->
			</block>
		</view>
	</view>
</template>
<script>
	export default{
		props:["data"]
	}
</script>
<style>
	/* 商品列表*/
	.tui-product-list {display: flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;box-sizing: border-box;padding: 10px 0 60px;}
	.tui-product-container {flex: 1;margin: 0 16upx;}
	.tui-product-container:last-child {margin-left: 0;}
	.tui-pro-item {width: 100%;margin-bottom: 16upx;background: #fff;box-sizing: border-box;border-radius: 12upx;overflow: hidden;transition: all 0.15s ease-in-out;}
	.tui-flex-list {display: flex;margin-bottom: 1upx !important;}
	.tui-pro-img {width: 100%;display: block;min-height: ;}
	.tui-proimg-list {width: 260upx;height: 260upx;flex-shrink: 0;border-radius: 12upx;}
	.tui-pro-content {display: flex;flex-direction: column;justify-content: space-between;box-sizing: border-box;padding: 20upx;}
	.tui-pro-tit {color: #2e2e2e;font-size: 28upx;word-break: break-all;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
	.dx-pro-group {padding-top: 18upx;}
	.tui-sale-price {font-size: 34upx;font-weight: 500;color: #e41f19;}
	.tui-unit {font-size: 24upx;color: #999;padding-left: 12upx;}
	.tui-factory-price {font-size: 24upx;color: #a0a0a0;text-decoration: line-through;padding-left: 12upx;}
	.tui-pro-pay {padding-top: 10upx;font-size: 24upx;color: #999;}
	/* 商品列表*/
</style>