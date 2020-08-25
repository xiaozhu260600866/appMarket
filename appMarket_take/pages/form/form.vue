<template>
	<view class="pb50">
		123456
		<page :parentData="data" :formAction="formAction"></page>
		<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f-sub-btn fs16"></myform>
		<view v-if="data.show">
			<weui-input v-model="ruleform.radio" label="开关" type="switch" name="radio" datatype="require"></weui-input>
			<weui-input v-model="ruleform.address" label="定位" type="location" name="address"></weui-input>
			
			<dx-address v-model="ruleform.addr_address"></dx-address>
			<weui-input v-model="ruleform.name" label="门店名称" type="text" name="name" datatype="require"></weui-input>
			<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone"></weui-input>
			<weui-input v-model="ruleform.sms" label="验证码" type="sms" name="sms" :phone="ruleform.phone" action="/auth/sendSms"></weui-input>
			<weui-input v-model="ruleform.phone" label="文本" type="txt" name="phone"></weui-input>
			<weui-input v-model="ruleform.phone" label="文本带箭头" type="txt" name="phone" arrow></weui-input>
			<weui-input v-model="ruleform.remark" label="备注" type="textarea" name="remark" datatype="require"></weui-input>
			<weui-input v-model="ruleform.checkbox" label="多选横向" name="checkbox" changeField="value" type="checkbox" dataKey="sendTypeArr" :row="false"></weui-input>
			<weui-input v-model="ruleform.checkbox" label="多选竖向,选择在左" name="checkbox" changeField="value" type="checkbox" dataKey="sendTypeArr" :row="true" Labelleft></weui-input>
			<weui-input v-model="ruleform.radio" label="单选横向" name="radio" changeField="value" type="radio" dataKey="sendTypeArr" @callback="test"
			 :row="false"></weui-input>
			<weui-input v-model="ruleform.radio" label="单选竖向,选择在右" name="radio" changeField="value" type="radio" dataKey="sendTypeArr" @callback="test"
			 :row="true"></weui-input>
			<weui-input v-model="ruleform.radio" label="单选竖向,选择在左" name="radio" changeField="value" type="radio" dataKey="sendTypeArr" @callback="test"
			 :row="true" Labelleft></weui-input>
			<weui-input v-model="ruleform.sendType" label="弹出层选择" name="sendType" changeField="value" type="select" dataKey="sendTypeArr"></weui-input>
			<weui-input v-model="ruleform.needArr" label="多项弹出层选择" name="needArr" type="manyselect" dataKey="selectData"
			 changeField="value"></weui-input>
			<weui-input v-model="ruleform.logo" label="上传LOGO" type="upload" upurl='article' allowUpLoadNum="5" name="logo"
			 datatype="require"></weui-input>
			<weui-input v-model="ruleform.date" label="日期" type="date" name="date"></weui-input>
			<weui-input v-model="ruleform.time" label="时间" type="time" name="time"></weui-input>
		</view>
	</view>
</template>
<style>
	@import url("./form.css");
</style>
<script>

	export default {
		data() {
			return {
				formAction: '/shop/wapindex',
				formShow:true,
				ruleform: {
					addr_address: '',
					remark:'',
					checkbox:[],
					radio: '',
					sendType: 2,
					sendType2: '2',
					needArr: '服务类,咨询管理'
				},
				selectData: [{
					label: '服务类',
					value: '服务类',
					children: [{
							label: '工商财税法律',
							value: '工商财税法律'
						},
						{
							label: '咨询管理',
							value: '咨询管理'
						},
						{
							label: '数据信息',
							value: '数据信息'
						},
						{
							label: '人力资源',
							value: '人力资源'
						},
						{
							label: '电商营销',
							value: '电商营销'
						},
						{
							label: '医疗健康',
							value: '医疗健康'
						},
					]
				}, {
					label: '产品类',
					value: '产品类',
					children: [{
							label: '电子电工',
							value: '7'
						},
						{
							label: '五金管材',
							value: '8'
						},
						{
							label: '家电日用',
							value: '9'
						},
						{
							label: '机械设备',
							value: '10'
						}
					]
				}],
				sendTypeArr: [{
						label: '普通',
						value: '1',
					},
					{
						label: '加急',
						value: '2',
					},
					{
						label: '自提',
						value: '3'
					},
				],
				sendTypeArr2: [{
						label: '普通',
						value: '1',
					},
					{
						label: '加急',
						value: '2',
					},
					{
						label: '自提',
						value: '3'
					},
				],
				vaildate: {},
				
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			this.data.show = true;
			//this.ajax();
		},
		methods: {
			test(){
				
			},
			formSubmit(){
				console.log('a');	
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
