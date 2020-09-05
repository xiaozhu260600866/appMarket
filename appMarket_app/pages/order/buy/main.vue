<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12 pb50" v-if="data.show">
			<view class="block-sec">
				<weui-input v-model="ruleform.shipping" label="配送方式" name="shipping" changeField="value" type="radio" dataKey="shippingArr"
				 @callback="test" :row="false" v-if="ruleform.shipping == 2 || ruleform.shipping == 4"></weui-input>
			</view>
			<!-- 如果是骑手取货 || 邮寄astart -->
			<view id="address" class="block-sec" v-if="ruleform.shipping == 1 || ruleform.shipping == 2">
				<block v-if="!address">
					<!-- <view class="add_group" @click="createAddress">
						<view class="left_txt fc-6">收货地址：<span class="fc-3">(暂无收货地址)</span></view>
						<view class="iconfont icon-right fs-12 fc-9"></view>
					</view> -->
					<view class="add-add p15" @click="createAddress">
						<p class="add-icon iconfont icon-count-plus mr10"></p>
						<p class="add-txt fs-15">新增收货地址</p>
						<p class="iconfont icon-right fs-12 fc-9"></p>
					</view>
				</block>
				<block v-else>
					<view class="add-info flex-middle plr15 bd-be" @click="addressLists">
						<view class="licon pr15">
							<span class="iconfont icon-location-c-fill fs-24 main-color"></span>
						</view>
						<view class="info ptb10 flex1">
							<view class="name fs-15">
								<span>{{address.name}}</span>
								<span class="Arial pl10">{{address.phone}}</span>
							</view>
							<view class="add-detail fs-14 fc-6">
								<view class="label">地址：</view>
								<view class="name flex1">{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</view>
							</view>
						</view>
					</view>
					<my-picker :picker-list="data.deliverData" column-num="3" @confirm="deliverCallBack" v-if="ruleform.shipping == 2">
						<view class="dx-cell">
							<view class="dx-cell_hd">
								<view class="dx-label main-color fw-bold" style="width: 200rpx;">选择送达时间</view>
							</view>
							<view class="dx-cell_bd text-right">
								<view>{{ruleform.deliver_date || ''}}</view>
							</view>
							<view class="dx-cell_ft dx_ft-access"></view>
						</view>
					</my-picker>
				</block>
			</view>
			<!-- 如果是骑手取货end -->
			<!-- 如果是自提点start -->
			<view class="block-sec" v-if="ruleform.shipping == 4">
				<view v-if="deliver.name">
					<view class="add-info p10">
						<view class="info pr15">
							<view class="fs-17 fc-3 mb5 lh-24">自提地址</view>
							<view class="add-detail fs-14 fc-3">{{deliver.address}}</view>
							<view class="fs-14 fc-9 mt3">{{deliver.name}}- {{deliver.phone}}</view>
						</view>
						<view class="group text-center pl10">
							<image class="img" :src="deliver.headerPic" />
							<view class="name fs-12 fc-3 mt5">{{deliver.name}}</view>
							<view class="tip">店家</view>
						</view>
					</view>
				</view>
				<view v-else @click="goto('/pages/order/chooseDeliver/main',1)">
					<view class="add-add p10">
						<view class="add-icon dxi-icon dxi-icon-add mr10"></view>
						<view class="add-txt fs-15">请选择自提点</view>
						<view class="iconfont icon-right fs-12 fc-9"></view>
					</view>
				</view>
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" name="addr_phone" datatype="require"></weui-input>
			</view>
			<!-- 如果是自提点end -->
			<!-- 如果是到店自提start -->
			<view class="block-sec" v-if="ruleform.shipping == 3">
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" name="addr_phone" datatype="require"></weui-input>
			</view>
			<!-- 如果是到店自提end -->
			<view class="storePro block-sec" v-for="(merchant,index) in data.merchants">
				<view class="storeName flex-middle">
					<image class="img" :src="merchant.cover"></image>
					<view class="name fs-15 fc-3">{{ merchant.name }}</view>
				</view>
				<orderPro :data="merchant.data"></orderPro>
				<view class="bd-te">
					<weui-input v-model="ruleform.send_price" label="配送费" myclass="ptb5" type="txt" name="send_price"></weui-input>
					<weui-input v-model="ruleform.weigth_price" label="超重费用" myclass="ptb5" type="txt" name="weigth_price"></weui-input>
					<view @click="showCoupon(index)">
						<view :class="['dx-cell','dx-dateTime']">
							<view class="dx-cell_hd">
								<slot name="left" />
								<view class="dx-label">优惠券</view>
							</view>
							<view class="dx-cell_bd">
								<view v-if="merchant.couponOrders.length == 0">
									
									{{merchant.group ? '团购不参与优惠券':'无可用优惠券'}}
								</view>
								<view v-if="merchant.couponOrders.length > 0">
									<view v-if="merchant.chooseCoupon">
										 -{{merchant.chooseCoupon.amount}}
									</view>
									<view v-else>
									请选择优惠券
									</view>
								</view>
							</view>
							<view class="dx-cell_ft dx_ft-access"></view>
							<slot name="right" />
						</view>
					</view>
					<coupon-diag :data="merchant.couponOrders" :ref="'coupon'+index" @callBack="couponCallBack($event,index)"></coupon-diag>
				</view>
				<view class="Scount fs-15 text-right p15 be-te">
					共<text class="Arial">{{merchant.orderNum}}</text>件商品 合计：<text class="Arial price fs-16">￥{{merchant.chooseCoupon ?  merchant.orderSum - merchant.chooseCoupon.amount : merchant.orderSum}}</text>
				</view>
			</view>
			<view class="block-sec">
				<!-- <weui-input v-model="ruleform.emergencyFee" label="加急费" name="emergencyFee" changeField="value" type="radio" dataKey="emergencyFeeArr"
				 @callback="test" :row="false"></weui-input> -->

				<weui-input v-model="ruleform.quick_price" label="加急费" name="quick_price" changeField="value" type="checkbox"
				 dataKey="emergencyFeeArr" :row="true" Labelleft myclass="emFee"></weui-input>
			</view>
			<view id="mode" class="block-sec">
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给卖家留言"></weui-input>
			</view>
			<view id="buy_footer">
				<view class="f_left price fs-18 plr10">￥
					<text class="txt fs-24">{{amount}}</text>
				</view>
				<view class="f_right">
					<button class="nav" @click="formSubmit">提交订单</button>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
	import myPicker from "@/components/myPicker/picker.vue";
	import couponDiag from '@/components/couponDiag';
	export default {
		components: {
			orderPro,
			myPicker,
			couponDiag
		},
		computed: {
			amount() {

				let amount = 0;
				let coupon_amount = 0;
				if (this.data.merchants) {
					this.data.merchants.forEach(v => {
						v.data.forEach(item => {
							amount += parseFloat(item.amount);
						});
						if(v.chooseCoupon){
							coupon_amount+=parseFloat(v.chooseCoupon.amount);
						}
					})
				}
				if (this.ruleform.quick_price.length) {
					amount += 5;
				}
				let newAmount = amount-coupon_amount;
				return newAmount.toFixed(2);
			}
		},
		data() {
			return {
				deliverData: [],
				product_id:"",
				group:'',
				formAction: '/order/buy',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				order_no:"",
				getSiteName: this.getSiteName(),
				ruleform: {
					shipping: '',
					send_price: '￥0',
					weigth_price: '￥0',
					coupon: '暂无',
					quick_price: 0,
				},
				couponShow: false,
				vaildate: {},
				address: {},
				address_id: 0,
				shippingArr: [{
					value: 2,
					label: '送货上门'
				}, {
					value: 4,
					label: '自提'
				}],
				pay_methods: [{
					label: '微信支付',
					value: 1
				}, {
					label: '余额支付',
					value: 2
				}],
				emergencyFeeArr: [{
					label: '￥5',
					value: 1
				}],
				deliver: {
					
				},
				
			}
		},
		onShow(){
				let deliver = uni.getStorageSync('deliver');
				if(deliver){
					this.deliver = deliver;
					this.ruleform.deliver_id = deliver.id;
				}
		},
		methods: {
			couponCallBack(item, index) {
				this.$set(this.data.merchants[index],"chooseCoupon",item[0]);
			},
			showCoupon(index) {
				console.log(this.$refs);
				this.$refs['coupon'+index][0].thisDiag = true;
			},
			deliverCallBack(picked) {
				console.log(picked.values[2]);
				console.log(new Date('2020/07/01 18:00:00'));
				console.log(new Date(picked.values[1]));
				if (new Date(picked.values[2]).getTime() <= new Date(picked.values[1]).getTime()) {
					this.getError("开始时间不能大于结束时间");
					return false;
				}
				let month = new Date(picked.values[0]).getMonth() + 1;
				this.$set(this.ruleform, "deliver_date", month + '/' + new Date(picked.values[0]).getDate() + ' ' + picked.labels[1] +
					'-' + picked.labels[2]);


			},
			formSubmit() {
				this.vaildForm(this, res => {
					if (res) {
						if(this.ruleform.shipping == 4){
							if(!this.deliver.name){
								this.getError("请添加自提点");
								return false;
							}
						}else if(this.ruleform.shipping == 1 || this.ruleform.shipping  == 2){
							if (!this.address) {
								this.getError("请添加联系地址");
								this.createAddress();
								return false;
							}
						}
						this.ruleform.merchants = this.data.merchants;
						this.ruleform.address = this.address;
						
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								return this.goto("/pages/order/pay_center/main?order_no=" + msg.data.order_no)
							}
						});
					}
				});
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order', 1);
				this.goto('/pages/user/address/lists/main?order=1');
			},
			createAddress() {
				uni.setStorageSync('order', 1);
				this.goto("/pages/user/address/creat_edit/main", 1);
			},
			ajax() {
				this.getAjaxForApp(this, {
					address_id: this.address_id,
					product_id:this.product_id,
					group:this.group

				}).then(msg => {
					this.address = msg.address;
					if(!this.ruleform.shipping){
						this.ruleform.shipping = msg.shipping;
					}
				});
			}
		},
		onLoad(options) {
			if (options.address_id) {
				this.address_id = options.address_id
			}
			if (options.product_id) {
				this.product_id = options.product_id
			}
			if (options.group) {
				this.group = options.group
			}
			if(options.order_no){
				this.order_no  = options.order_no;
			}
			// var day2 = new Date();
			// day2.setTime(day2.getTime());
			// var s2 =  (day2.getMonth()+1) + "/" + day2.getDate();
			// var day3 = new Date();
			// day3.setTime(day3.getTime()+24*60*60*1000);
			// var s3 =  (day3.getMonth()+1) + "/" + day3.getDate();
			// this.deliverData.push(
			// 	{label:'今天',value:s2},
			// 	{label:'明天',value:s3},
			// )

			// var s4 = new Date().getHours()+''+new Date().getMinutes();
			// if(parseInt(s4) < parseInt(new Date().getHours() + '' + "30")){
			// 	var toDayhourTime = new Date().getHours() + ":30";
			// }else{
			// 	var toDayhourTime = new Date().getHours() +1 + ":00";
			// }

			// let start_date = new Date(day2.getFullYear()+'/' + s2+' '+toDayhourTime).getTime();
			// console.log(start_date);
			// let end_date = 

			// for (var i = 0; i < 1200; i+=30) {

			// }
			// console.log(this.deliverData);
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},

	}
</script>
<style scoped="">
	@import url('index.css');
	@import url("xiaozhu/css/dx-input")
</style>
