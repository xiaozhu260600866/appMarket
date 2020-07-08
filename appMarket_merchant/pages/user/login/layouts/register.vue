<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f" v-if="step == 1">
				<my-picker :picker-list="data.citys" :column-num="3"  @confirm="cityCallBack">
					<view class="dx-cell">
						<view class="dx-cell_hd">
							<view class="dx-label">省市区<span class="star">*</span></view>
						</view>
						<view class="dx-cell_bd text-right">
							<span class="pl8" v-for="v in ruleform.cityName">{{v}}</span>
						</view>
						<view class="dx-cell_ft dx_ft-access"></view>
					</view>
				</my-picker>
				<weui-input v-model="ruleform.market_id" label="市场" datatype="require" name="market_id" changeField="value" type="select" dataKey="market"></weui-input>
				<weui-input v-model="ruleform.address" label="详细地址" type="location" name="address" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone"></weui-input>
				<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone"
				 action="/sendSms.html"></weui-input>
				<weui-input v-model="ruleform.password" label="密码" datatype="require" type="password" name="password"></weui-input>
				<view class="m20 info-subBtn">
					<dx-button block size="lg" @click="submit">下一步</dx-button>
				</view>
			</view>
			<view class="bg-f" v-if="step == 2">
				<weui-input v-model="ruleform.idCard" label="身份证人像面" type="upload" upurl='merchant' allowUpLoadNum="1" name="idCard"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.idCard2" label="身份证人像面" type="upload" upurl='merchant' allowUpLoadNum="1" name="idCard2"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.company_logo" label="营业执照" type="upload" upurl='merchant' allowUpLoadNum="1" name="company_logo"
				  datatype="require"></weui-input>
				<weui-input v-model="ruleform.health_logo" label="健康证" type="upload" upurl='merchant' allowUpLoadNum="1" name="health_logo"
				   datatype="require"></weui-input>
				<view class="m20 info-subBtn">
					<dx-button block size="lg" @click="submit">完成</dx-button>
				</view>
			
			</view>
		
		
			<view class="text-center fs-13 fc-9 mt30" @click="goto('/pages/user/login/main')">立即登录</view>
		</view>
	</view>
</template>

<script>
	import myPicker from "@/components/myPicker/picker.vue";
	export default {
		components: {
			myPicker
		},
		data() {
			return {
				formAction: '/category',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {cityName:[]},
				vaildate: {},
				market:[],
				step:1
			}
		},
		methods: {
			checkboxChange(e) {
				let value = e.mp.detail.value.length;
				this.ruleform.agress = value;
			},
			cityCallBack(picked) {
				   this.ruleform.cityName = picked.labels;
				   this.ruleform.city = picked.values;
				   const fclass = picked.value;
				   this.postAjax('/search-market', { fclass: fclass }).then(msg => {
				       this.data.market = msg.data.lists.data
					   this.market = [];
				       this.data.market.forEach((v,index) => {
						  this.market.push(
							{label:v.name,value:v.id}
						  )
				       })
				   })
				
				//this.demos.multiColumns.columnPickedIndex = index
				//this.demos.multiColumns.columnPicked = picked
			},
			submit() {
				
				this.vaildForm(this, res => {
					if (res) {
						if(this.step == 1){
							if (this.ruleform.code != wx.getStorageSync('smsCode')) {
								this.getError("验证码不正确");
								return false;
							}
							this.step =2;
						}else{
							this.postAjax("/merchant/register", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/login/main");
								}
							});
						}
						
						
					}
				});

			},
			ajax() {
				this.getAjaxForApp(this, {

				}).then(msg => {

				});
			}
		},
		onLoad(options) {
			//#ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			this.ruleform.clientid = info.clientid
			//#endif
			//#ifdef H5
			this.ruleform.clientid = 'f5ce477bc2d8d5e1e1c3cdd2e059b924'
			//#endif
			//var info = plus.push.getClientInfo();
			//this.ruleform.clientid =  info.clientid
			console.log(this.ruleform.clientid);
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
@import url('../index.css');
@import url("xiaozhu/css/dx-input")
</style>
