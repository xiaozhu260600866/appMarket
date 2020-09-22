<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2">
			<view class="bg-f" v-if="step == 1">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input> 
				<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone"></weui-input>
				<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone"
				 action="/sendSms.html"></weui-input>
				<weui-input v-model="ruleform.password" label="密码" datatype="require" type="password" name="password"></weui-input>
				<weui-input v-model="ruleform.password_confirm" label="确认密码" datatype="require"  type="password" name="password_confirm"></weui-input>
				<weui-input v-model="ruleform.transportation" label="交通工具" name="transportation" changeField="value" type="select" dataKey="transportationArr"></weui-input>
				<view class="m20 info-subBtn">
					<dx-button block size="lg" @click="submit">下一步</dx-button>
				</view>
			</view>
			<view class="upload-photoid" v-if="step == 2">
				<view class="t-title">
					<view class="name">请上传身份证</view>
					<view class="remark">请保持照片清晰无反光</view>
				</view>
				<view class="photoid">
					<view class="item" @click="uploadHeaderImg('idCard')">
						<image class="base-map img" :src="ruleform.idCard ? getSiteName + '/upload/images/horse/'+ruleform.idCard:'https://appmarket.doxinsoft.com/images/wap/idCard-front.jpg'" ></image>
					</view>
					<view class="item" @click="uploadHeaderImg('idCard2')">
						<image class="base-map img" :src="ruleform.idCard2 ? getSiteName + '/upload/images/horse/'+ruleform.idCard2: 'https://appmarket.doxinsoft.com/images/wap/idCard-back.jpg'"></image>
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
					<view class="item"  @click="uploadHeaderImg('health_logo')">
						<image class="base-map img" :src="ruleform.health_logo ? getSiteName + '/upload/images/horse/'+ruleform.health_logo:'https://appmarket.doxinsoft.com/images/wap/health-certificate.jpg'"></image>
					</view>
				</view>
				<view class="m20 mt40 info-subBtn">
					<dx-button block size="lg" @click="submit">完成</dx-button>
				</view>
			</view>
			<!-- <view class="bg-f" v-if="step == 2">
				<weui-input v-model="ruleform.idCard" label="身份证人像面" type="upload" upurl='horse' allowUpLoadNum="1" name="idCard"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.idCard2" label="身份证人像面" type="upload" upurl='horse' allowUpLoadNum="1" name="idCard2"
				 datatype="require"></weui-input>
				<view class="m20 info-subBtn">
					<dx-button block size="lg" @click="submit">完成</dx-button>
				</view>
			</view> -->
			<!-- <view class="text-center fs-13 fc-9 mt30" @click="goto('/pages/user/login/main')">立即登录</view> -->
		</view>
	</view>
</template>

<script>

	export default {
		components: {
			
		},
		data() {
			return {
				formAction: '/category',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {transportation:1},
				vaildate: {},
				transportationArr:[
					{label:"是",value:1},
					{label:"否",value:0},
				],
				step:1
			}
		},
		methods: {
			next(step){
				if(step == 3 && !this.ruleform.idCard && !this.ruleform.idCard2){
				   this.getError("身份证还没有上传");
					return false;
				}
				this.step = step;
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
				},"horse");
			},
			submit() {
				
				this.vaildForm(this, res => {
					if (res) {
						if(this.step == 1){
							if(this.ruleform.password != this.ruleform.password_confirm){
								return this.getError("确认密码与密码不一致");
							}
							if (this.ruleform.code != wx.getStorageSync('smsCode')) {
								this.getError("验证码不正确");
								return false;
							}
							this.step =2;
						}else{
							if( !this.ruleform.health_logo){
							   this.getError("健康证没上传");
								return false;
							}
							this.postAjax("/horse/register", this.ruleform).then(msg => {
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
			this.ruleform.clientid = 'f5ce477bc2d8d5e1e1c3cdd2e059b924'
			//#endif
			//var info = plus.push.getClientInfo();
			//this.ruleform.clientid =  info.clientid
			


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
	@import url('../index.css')
</style>
