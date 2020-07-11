<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2">
			<view class="bg-f" v-if="step == 1">
				
				<weui-input v-model="ruleform.name" label="商家名称" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone"></weui-input>
				<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone"
				 action="/sendSms.html"></weui-input>
				<weui-input v-model="ruleform.password" label="密码" datatype="require" type="password" name="password"></weui-input>
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
				<weui-input v-model="ruleform.address" label="详细地址" type="location" name="address" datatype="require"  @callback="locationRes"></weui-input>
				<view class="m20 info-subBtn">
					<dx-button block size="lg" @click="submit">下一步</dx-button>
				</view>
			</view>
			<!-- <view class="bg-f" v-if="step == 2">
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
			
			</view> -->
			
			<view class="upload-photoid" v-if="step == 2">
				<view class="t-title">
					<view class="name">请上传身份证</view>
					<view class="remark">请保持照片清晰无反光</view>
				</view>
				<view class="photoid">
					<view class="item" @click="uploadHeaderImg('idCard')">
						<image class="base-map img" :src="ruleform.idCard ? getSiteName + '/upload/images/merchant/'+ruleform.idCard:'https://appmarket.doxinsoft.com/images/wap/idCard-front.jpg'" ></image>
					</view>
					<view class="item" @click="uploadHeaderImg('idCard2')">
						<image class="base-map img" :src="ruleform.idCard2 ? getSiteName + '/upload/images/merchant/'+ruleform.idCard2: 'https://appmarket.doxinsoft.com/images/wap/idCard-back.jpg'"></image>
					</view>
				</view>
				<view class="m20 mt40 info-subBtn">
					<dx-button block size="lg" @click="next(3)">下一步</dx-button>
				</view>
			</view>
			
			<view class="upload-photoid" v-if="step == 3">
				<view class="t-title">
					<view class="name">请上传证件照片</view>
					<view class="remark">请保持照片清晰无反光</view>
				</view>
				<view class="photoid">
					<view class="item"  @click="uploadHeaderImg('company_logo')">
						<image class="base-map img" :src="ruleform.company_logo ? getSiteName + '/upload/images/merchant/'+ruleform.company_logo:'https://appmarket.doxinsoft.com/images/wap/business-license.jpg'"></image>
					</view>
					<view class="item"  @click="uploadHeaderImg('health_logo')">
						<image class="base-map img" :src="ruleform.health_logo ? getSiteName + '/upload/images/merchant/'+ruleform.health_logo:'https://appmarket.doxinsoft.com/images/wap/health-certificate.jpg'"></image>
					</view>
				</view>
				<view class="m20 mt40 info-subBtn">
					<dx-button block size="lg" @click="submit">完成</dx-button>
				</view>
			</view>
		
			<!-- <view class="text-center fs-13 fc-9 mt30" @click="goto('/pages/user/login/main')" v-if="step == 3">立即登录</view> -->
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
				ruleform: {cityName:[],'idCard':''},
				vaildate: {},
				market:[],
				step:1
			}
		},
		methods: {
			locationRes(res){
				this.ruleform.location_x = res.latitude;
				this.ruleform.location_y = res.longitude;
			},
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
			uploadHeaderImg(field){
				this.uploadImageSingle(res => {
					this.$set(this.ruleform,field,[res]);
					console.log(this.ruleform);
				},"merchant");
			},
			next(step){
				if(step == 3 && !this.ruleform.idCard && !this.ruleform.idCard2){
				   this.getError("身份证还没有上传");
					return false;
				}
				this.step = step;
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
							if(!this.ruleform.company_logo && !this.ruleform.health_logo){
							   this.getError("健康证或营业热昭没上传说");
								return false;
							}
							this.postAjax("/merchant/register", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/user/login/main");
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
			this.ruleform.clientid = '06c346e5ebc8af7fb57d01130ffc05d8'
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
