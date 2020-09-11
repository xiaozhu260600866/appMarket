<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view>
			<view id="address" class="block-sec" v-if="ruleform.shipping == 1">
				<block v-if="!address">
					<view class="add-add p15" @click="createAddress">
						<view class="add-icon iconfont icon-count-plus mr10"></view>
						<view class="add-txt fs-15">新增收货地址</view>
						<view class="iconfont icon-right fs-12 fc-9"></view>
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
				</block>
			</view>
			<view class="block-sec no" v-if="ruleform.shipping == 2">
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_phone" datatype="require|phone"></weui-input>
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 dataKey="shippingData" :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<weui-input v-model="ruleform.remark" :disabled="ruleform.status >=3 ? true :false" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</view>
			<view v-if="ruleform.shipping == 1">
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 dataKey="shippingData" :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<weui-input v-model="ruleform.remark" :disabled="ruleform.status >=3 ? true :false" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</view>

			<view class="pro-info block-sec">
				<view class="cart-tb p10">
					<view class="pro-img pr10">
						<image class="img" :src="data.detail.products.firstCover" />
					</view>
					<view class="pro-name">
						<view class="name fs-14 nowrap lh20">{{data.detail.products.name}}</view>
						<view class="num Arial fs-12 fc-9">数量：{{ruleform.num}}</view>
					</view>
					<view class="pro-price hide" valign="center">￥{{data.detail.products.integral}}</view>
				</view>
			</view>



			<view id="calculation" class="block-sec">
				<view class="list-group">
					<view class="txt fs-15">应付</view>
					<view class="fs-18 price flex-end">- {{ruleform.integral}}<span class="fs-12 fc-9 pl5"> 积分</span></view>
				</view>
			</view>

			<view id="buy_footer" v-if="ruleform.status == 1">
				<view class="f_left price fs-16 fc-6 plr10">共
					<text class="price fs-24 plr5">{{ruleform.integral}}</text>积分
				</view>
				<view class="f_right" >
					<button class="nav" @click="submit">提交订单</button>
				</view>
			</view>

			
			<view id="buy_footer" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<view class="f_left price"></view>
				<view class="f_right">
					<button class="nav" @click="canReceipt">确认收货</button>
				</view>
			</view>
			<view id="buy_footer" v-else>
				<view class="f_left price"></view>
				<view class="f_right">
					<button class="nav-o" bindtap="canReceipt">完成</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/integral/detail',
				order_no:'',
				shippingData:[
					{label:'邮寄',value:1},
					{label:'自提',value:2},
				],
				mpType: 'page', //用来分清父和子组件
			    data: this.formatData(this),
				getSiteName: this.getSiteName(),
				
				ruleform:{
					
				},
				address: {
					
				},
				vaildate:{}
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
		onLoad(options) {
			if (options.order_no) {
				this.order_no = options.order_no;
				if (options.address_id) {
					this.formAction += "&address_id=" + options.address_id + "&order_no=" + options.order_no;
				} else {
					this.formAction += "?order_no=" + options.order_no;
				}
			}
			this.ajax();
		},

		methods: {
			submit(e) {
				if (!this.address || !this.address.id) {
					this.getError("请填写收货地址");
					setTimeout(() => {
						this.createAddress();
					}, 500)
					return false;
				}
				let ruleform = this.ruleform;
				ruleform.address_id = this.address.id;
				this.receipt("确认兑换吗");
			},
			radioChange(event) {
				this.ruleform.shipping = event.mp.detail.value;
			},
			
			ajax() {
				this.getAjaxForApp(this,{order_no:this.order_no}).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
					if (this.address && !this.ruleform.addr_name) {
						this.ruleform.addr_name = this.address.name;
						this.ruleform.addr_phone = this.address.phone;
						this.ruleform.addr_address = this.address.address;
					}
				});
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				uni.showModal({
					title: '提示',
					content: title,
					success: res => {
						if (res.confirm) {
							this.postAjax("/integral/change-integral-status", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/user/integral/order/lists/main?historyUrl=del&status=" + msg.data.detail.status);
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
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
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>