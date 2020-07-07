<template>
	<view v-if="data.show">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="car_list" v-if="data.merchants.length">
				<view class="car_store bg-f mb12" v-for=" (merchant,index) in data.merchants ">
					<view class="storeName flex">
						<view class="check mr15">
							<checkbox-group @change="checkboxChangeMerchant($event,index)" >
								<checkbox :checked="merchant.is_check==1 ? true :false"/>
							</checkbox-group>
						</view>
						<view class="info flex1 flex-middle">
							<image class="img" :src="merchant.cover"></image>
							<view class="name fs-15 fc-3">{{ merchant.name }}</view>
						</view>
					</view>
					<view id="pro_info" v-for="(item,key2) in merchant.data" v-if="item.getProduct">
						<view class="list-group flex-middle">
							<view class="zheng ">
								<checkbox-group @change="checkboxChange($event,item,index)">
									<checkbox value="1" :checked="item.is_check==1 ? true :false" :data-price="item.getProduct.price"  :data-key="key2" />
								</checkbox-group>
							</view>
							<dx-products-pic :src="item.getProduct.firstCover" :isList="true" :noborder="true" myclass="flex1" :tbPadding="0" :imgHeight="100" :imgWidth="100">
								<view class="Rinfo">
									<view class="w-b100 pr10">
										<view class="title fs-15 wrap2 lh-22">{{item.getProduct.name}}</view>
									</view>
									<view class="w-b100 flex-between flex-middle">
										<view class="lh-20"><dx-price v-model="item.amount" split :intSize="16" :decimalSize="12"></dx-price></view>
										<tui-numberbox v-model="item.num"></tui-numberbox>
									</view>
									<view class="del" @click="del(item.id)">
										<text class="iconfont icon-cart-del"></text>
									</view>
								</view>
							</dx-products-pic>
						</view>
					</view>
				</view>
			</view>
			<view class="cart-empty pt50" v-if="!data.merchants.length">
				<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
				<p class="fs18 mt10">您的购物车空空的</p>
				<p class="fs13 font_grey mt5">赶紧去挑些喜欢的填满它吧</p>
				<button hover-class="none" class="btn mt10" @click="goto('/pages/index/main',2)">去首页逛逛</button>
			</view>
			<view id="cartfooter" v-if="data.merchants.length">
				<view class="bd-t lInfo" style="width: 100%;">
					<view class="group left">
						<view class="zheng">
							<checkbox-group @change="checkboxAll">
								<checkbox />
							</checkbox-group>
						</view>
						<p class="txt fs-14">全选</p>
					</view>
					<view class="group right plr10">
						<p class="count fs-14">合计：</p>
						<p class="price fs-18 font_bold"><span class="fs-14">￥</span>{{amount}}</p>
					</view>
				</view>
				<view class="submit plr10 ptb5" @click="sublimt">
					<dx-button type="primary" btnBg="#57C734" btnBd="#57C734" >提交</dx-button>
				</view>
			</view>
		</view>
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
		data() {
			return {
				formAction: '/cart/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				checkLength:0
			}
		},
		
		computed: {
			amount() {
				let amount = 0;
				this.checkLength = 0;
				for (var i = 0; i < this.data.merchants.length; i++) {
					var merchants = this.data.merchants[i];
					merchants.data.forEach(item=>{
						if (item.is_check && item.getProduct) {
							amount += parseFloat(item.getProduct.price) * parseInt(item.num);
							this.checkLength++;
						}
					});
				}
				return amount.toFixed(2);
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onShow(){
			this.onShow(this);
		},
		onLoad(options) {
			this.ajax();
			this.checkLogin();
		},
		methods: {
			sublimt(){
				if (this.checkLength == 0) {
					this.getError("请勾选项目");
					return false;
				}
				
				
				this.postAjax("/cart/order", {
					data: this.data.merchants
				}).then(msg => {
					if (msg.data.status == 2) {
						this.goto("/pages/order/buy/main",1);
					}
				});
			},
			del(id) {
				console.log(id);
				this.getConfirm("真的确认删除吗？", () => {
					this.postAjax("/cart/del-all",{id:id}).then(msg=>{
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			checkboxAll(e){
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;
				for (var i = 0; i < this.data.merchants.length; i++) {
					var merchants = this.data.merchants[i];
					this.$set(merchants,"is_check",isCheck);
					merchants.data.forEach(item=>{
						this.$set(item,"is_check",isCheck);
					});
				}
				console.log(this.data.merchants);
			},
			checkboxChangeMerchant(e,key){
				
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;
				
				this.data.merchants[key].data.forEach(v=>{
					
					this.$set(v,"is_check",isCheck);
				});
				console.log(this.data.merchants[key].data);
			},
			checkboxChange(e, item, merchantKey) {
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;
				this.$set(item,"is_check",isCheck);
				let is_checkNum  = 0;
				let listsNum  = 0;
				this.data.merchants[merchantKey].data.forEach(v=>{
					listsNum++;
					if(v.is_check)is_checkNum ++ ;
				});
				if(is_checkNum == listsNum){
					this.$set(this.data.merchants[merchantKey],"is_check",1);
				}else{
					this.$set(this.data.merchants[merchantKey],"is_check",0);
				}
				
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>