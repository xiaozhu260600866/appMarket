<template>
	<view class="stre_pro bg-f">
		<dx-products-pic v-for="item in data" :src="item.firstCover" :imgWidth="imgWidth" :imgHeight="imgHeight" :isList="true"
		 @click="toProduct(item)">
			<view class="right-box" :style="{height:imgHeight*2+'rpx'}">
				<view class="w-b100">
					<view class="title fs-15">{{ item.name }}</view>
					<view class="num flex mt3">
						<view class="nav">新鲜度 <text class="Arial">{{ item.freshness }}</text></view>
					</view>
				</view>
				<view class="flex-between w-b100">
					<dx-price v-model="item.price" split :intSize="18" :decimalSize="12"></dx-price>
					<view class="grade flex-middle fc-6 fs-12 mt3" @click="toProduct(item)">
						<view class="sales pl15" v-if="item.sales">月销 <text class="Arial">{{ item.sales }}</text></view>
						<view class="fresh">数量：<text class="Arial">{{ item.num }}</text></view>
					</view>
				</view>
			</view>

			<div class="flex-right numbox" v-if="canBuy && item.shipping == 2">
				<tui-numberbox v-model="item.buyNum" @change="addCart(item)"></tui-numberbox>
			</div>
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
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			},
			merchant: {
				type: Object,
				default () {
					return {}
				}
			},
			canBuy: {
				type: Boolean,
				default () {
					return true;
				}
			},
			imgWidth: {
				type: Number,
				default: 80
			},
			imgHeight: {
				type: Number,
				default: 80
			}
		},
		data() {
			return {
				num: 0
			}
		},
		methods: {
			addCart(item) {
				this.checkLogin().then(msg => {

					if (this.merchant && this.merchant.working != '营业中') {
						this.getError("店家已打烊、预订配送时间为明天营业时间！");
						setTimeout(() => {
							this.postAjax("/cart/create", item).then(msg => {
								if (msg.data.status == 2) {
									return this.$emit("callBack", {
										cartData: msg.data.cartData
									});
								}
							});
						}, 1000);
					}else{
						this.postAjax("/cart/create", item).then(msg => {
							if (msg.data.status == 2) {
								return this.$emit("callBack", {
									cartData: msg.data.cartData
								});
							}
						});
					}
				})
			}
		}
	}
</script>
<style>
	.stre_pro .num .nav {
		background-color: rgba(87, 199, 52, 0.1);
		color: #57C734;
		padding: 8upx 16upx;
		border-radius: 6upx;
		font-size: 24upx;
		line-height: 30upx;
	}

	.stre_pro .right-box {
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
	}
</style>
