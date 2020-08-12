<template>
	<view :class="['couponDiag', myclass ? myclass : '']" v-if="couponShow">
		<view class="share-overlay"></view>
		<view class="Cdiag-box">
			<view class="top">
				<dx-list-cell name="优惠券" :nameSize="17" :noborder="true">
					<view slot="right">
						<view class="dxi-icon dxi-icon-off" @click="couponShow = false"></view>
					</view>
				</dx-list-cell>
				<dx-tabs :tabs="navbar" @change="change" selectedColor="#57C734" sliderBgColor="#57C734"></dx-tabs>
				<view class="fs-12 plr15 ptb10">已选中推荐优惠，使用优惠券<text class="Arial">2</text>张，共抵扣<text class="price">￥55.00</text></view>
			</view>
			<view class="couponBox">
				<view class="list_item" v-for="(v,key) in data">
					<view class="item_left fc-white">
						<view class="price fs-26 lh-36 h-36 fc-white"><span class="fs-14">￥</span>{{v.amount}}</view>
						<view class="condition fs-12">满{{v.full_amount}}元可用</view>
					</view>
					<view class="item_right plr12">
						<view class="w-b100 ">
							<view class="coupon-title fs-15 lh-20 nowrap fw-bold">{{ v.name }}</view>
							<view class="coupon-name fs-13 fc-6 lh-20 nowrap">{{ v.storeName }}</view>
						</view>
						<view class="w-b100 ir-bottom flex-between mt8">
							<view class="time fs-13 fc-9 lh-16">{{ v.start_date }} ~ {{ v.end_date }}</view>
						</view>
					</view>
					<view class="select">
						<checkbox-group>
							<checkbox></checkbox>
						</checkbox-group>
					</view>
				</view>
			</view>
			<view class="plr15 ptb10">
				<dx-button type="success" size="lg" block>确认</dx-button>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
import dxListCell from "doxinui/components/list-cell/list-cell"
import dxTabs from "doxinui/components/tabs/tabs"
export default {
	components:{dxListCell,dxTabs},
	props: {
		data: {
			type: Array,
			default () {
				return []
			}
		},
		couponShow:{
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			navbar: [{
				name: "可用优惠券",
				value: 0,
				num: 2
			}, {
				name: "不可用优惠券",
				value: 1,
				num: 0
			}],
			couponArray:[{
				amount: 50,
				discount: '',
				full_amount: 300,
				type: 3,
				name: '满减活动',
				storeName:'顺丰生鲜',
				start_date: '2020-08-01',
				end_date: '2020-08-30',
				status: 0
			},{
				amount: 7,
				discount: '',
				full_amount: 77,
				type: 3,
				name: '七夕优惠',
				storeName:'北郊商行',
				start_date: '2020-08-01',
				end_date: '2020-08-30',
				status: 1
			},{
				amount: 20,
				discount: '',
				full_amount: 100,
				type: 3,
				name: '优惠券',
				storeName:'达记生鲜配送中心',
				start_date: '2020-08-01',
				end_date: '2020-08-30',
				status: 0
			},{
				amount: 20,
				discount: '',
				full_amount: 100,
				type: 3,
				name: '优惠券',
				storeName:'顺丰生鲜',
				start_date: '2020-08-01',
				end_date: '2020-08-30',
				status: 0
			},{
				amount: 20,
				discount: '',
				full_amount: 100,
				type: 3,
				name: '优惠券',
				storeName:'顺丰生鲜',
				start_date: '2020-08-01',
				end_date: '2020-08-30',
				status: 0
			}]
		}
	},
	methods: {
		
	}
}

</script>
<style scoped="">
.share-overlay{position: fixed;top: 0px;right: 0;bottom: 0;left: 0;z-index: 999;width: 100%; height: 1600upx; background-color: rgba(0,0,0,0.3)}
.Cdiag-box{position: fixed;bottom: 0;left: 0;width: 100%;height: 76vh;background-color: #fff;border-radius: 24upx 24upx 0 0;z-index: 1000;}

.couponBox{height: calc(100% - 400upx);overflow-y: auto;background-color: #f5f5f5;padding: 20upx;}
.couponBox .list_item{display: flex;position: relative;min-height: 150upx;background-color: #fff;border-radius: 12upx;margin-bottom: 20upx;overflow: hidden;}
.couponBox .list_item::before{content: "";display: block;width: 32upx;height: 32upx;background-color: #f5f5f5;position: absolute;left: 194upx;top: -16upx;border-radius: 50%;}
.couponBox .list_item::after{content: "";display: block;width: 32upx;height: 32upx;background-color: #f5f5f5;position: absolute;left: 194upx;bottom: -16upx;border-radius: 50%;}
.couponBox .list_item .item_left{width: 210upx;text-align: center;background-color: #57C734;padding: 20upx 0;}
.couponBox .list_item .item_right{display: flex;flex-wrap: wrap;align-content: space-between;position: relative;z-index: 2;flex: 1;margin: 20upx 0;}
.couponBox .list_item .ir-bottom{align-items: center;}
.couponBox .list_item .ir-bottom .time{font-family: Calibri;}
.couponBox .select{display: flex;align-items: center;justify-content: center;padding: 0 20upx;}
.couponBox .select checkbox{zoom: 90%;display: flex;}
.couponBox .select /deep/.uni-checkbox-input{border-radius: 50%;}
.couponBox .select /deep/.uni-checkbox-input-checked{color: #fff!important;border-color: #57C734!important;background-color: #57C734!important;}
.couponBox .select /deep/.uni-checkbox-input:hover{border-color: #57C734!important;}
</style>