<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mt12 pb50" v-if="data.show">
			<view id="address" class="block-sec" v-if="ruleform.shipping == 1">
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
					<view class="add-info flex-middle plr15" @click="addressLists">
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
				
					<my-picker :picker-list="data.deliverData" column-num="3" @confirm="deliverCallBack" >
						<view class="dx-cell">
							<view class="dx-cell_hd">
								<view class="dx-label">选择时间</view>
							</view>
							<view class="dx-cell_bd text-right">
								<view >{{ruleform.deliver_date || ''}}</view>
							</view>
							<view class="dx-cell_ft dx_ft-access"></view>
						</view>
					</my-picker>
				</block>
			</view>
			<view class="storePro block-sec" v-for="(merchant,index) in data.merchants">
				<view class="storeName flex-middle">
					<image class="img" :src="merchant.cover"></image>
					<view class="name fs-15 fc-3">{{ merchant.name }}</view>
				</view>
				<orderPro :data="merchant.data"></orderPro>
				<view class="bd-te">
				</view>
				<view class="Scount fs-15 text-right p15 be-te">
					共<text class="Arial">{{merchant.orderNum}}</text>件商品 合计：<text class="Arial price fs-16">￥{{merchant.orderSum}}</text>
				</view>
			</view>
			<view id="mode" class="block-sec">
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给卖家留言"></weui-input>
			</view>
			<view id="buy_footer">
				<view class="f_left price fs-18 plr10">￥
					<text class="txt fs-24">{{amount}}</text>
				</view>
				<view class="f_right" >
					<button class="nav" @click="formSubmit">提交订单</button>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderPro from "@/components/orderPro";
    import myPicker from "@/components/myPicker/picker.vue";
	export default {
		components:{
			orderPro,
			myPicker
		},
		computed:{
			amount(){
				let amount = 0;
				if(this.data.merchants){
					this.data.merchants.forEach(v=>{
						 v.data.forEach(item=>{
							 amount+= parseFloat(item.amount);
						 });
					})
				}
				return amount.toFixed(2);
			}
		},
		data() {
			return {
				deliverData:[
				],
				
				formAction: '/order/buy',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{shipping:1},
				vaildate:{},
				address:{},
				address_id:0,
				shippingArr:[{
					value: 0,
					label:'自提'
				},{
					value: 1,
					label: '送货上门'
				}],
				pay_methods: [{
					label: '微信支付',
					value: 1
				},{
					label: '余额支付',
					value: 2
				}],
				
			}
		},
		methods: {
			deliverCallBack(picked){
				console.log(picked.values[2]);
				console.log(new Date('2020/07/01 18:00:00'));
				console.log(new Date(picked.values[1]));
				if(new Date(picked.values[2]).getTime() <= new Date(picked.values[1]).getTime()){
					this.getError("开始时间不能大于结束时间");
					return false;
				}
				let month = new Date(picked.values[0]).getMonth() +1;
				this.$set(this.ruleform,"deliver_date",month +'/'+new Date(picked.values[0]).getDate()+' '+ picked.labels[1] + '-' + picked.labels[2]);
				
				
			},
			formSubmit(){
				this.vaildForm(this,res=>{
					if(res){
						if(!this.address){
							this.getError("请添加联系地址");
							this.createAddress();
							return false;
						}
						this.ruleform.merchants = this.data.merchants;
						this.ruleform.address = this.address;
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								return this.goto("/pages/order/pay_center/main?order_no="+msg.data.order_no)
							}
						});
					}
				});
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order',1);
				this.goto('/pages/user/address/lists/main?order=1' );
			},
			createAddress() {
				uni.setStorageSync('order',1);
				this.goto("/pages/user/address/creat_edit/main", 1);
			},
			ajax() {
				this.getAjaxForApp(this, {address_id:this.address_id
				
				}).then(msg => {
					this.address  = msg.address;
				});
			}
		},
		onLoad(options) {
			if(options.address_id){
				this.address_id = options.address_id
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