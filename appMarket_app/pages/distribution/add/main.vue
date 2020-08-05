<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section class="container" v-if="data.show">
			<div class="header-bg">
				<image src="https://merchant.doxinsoft.com/images/site/people-join-img.png" mode="widthFix" />
			</div>
			<div class="template mlr20 bg-f bdr6" v-if="data.can_add">
				<div class="not-add p30" v-if="data.passing">
					<div class="tip fs-15 lh-22 mb20 fc-6 text-center">您的申请已经提交，请等待审核，谢谢!</div>
					<a class="a dx-btn dx-btn-big dx-btn-green w-b100" @click="goto('/pages/shop/index/index',2,'/pages/shop/user/index/index')">
						<span class="iconfont icon-cart"></span> 继续去购物
					</a>
				</div>
				<div v-else> 
					<div class="p30 write-input">
						<div class="fs-14 fc-6 ptb15 text-center">填写真实信息，成为我们的合作伙伴！</div>
						<weui-input v-model="ruleform.name" placeholder="请填写您的姓名" type="text" name="name" datatype="require">
							<div slot="left">
								<span class="iconfont icon-dis-user fs-18 fc-6 pr15"></span>
							</div>
						</weui-input>
						<weui-input v-model="ruleform.phone" placeholder="请填写您的手机号码" type="text" name="phone" datatype="require|phone">
							<div slot="left">
								<span class="iconfont icon-dis-phone fs-18 fc-6 pr15"></span>
							</div>
						</weui-input>
						<weui-input v-model="ruleform.city" placeholder="请填写城市" type="text" name="city" datatype="require" changeField="value" dataKey="cityArr">
							<div slot="left">
								<span class="iconfont icon-location-o fs-18 fc-6 pr15"></span>
							</div>
						</weui-input>
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green w-b100 bdr25 mt20"></myform>
					</div>
				</div>
			</div>
			<div class="template mlr20 bg-f bdr6" v-else>
				<div class="not-add p30">
					<div class="tip fs-15 lh-22 mb20 fc-6 text-center">本店累计消费
						<span class="Arial fc-red">{{data.candis}}</span>元，才可成为商家，您已消费
						<span class="Arial fc-red">{{data.order_sum}}</span>元，请继续努力。
					</div>
					<div class="dx-btn dx-btn-big dx-btn-green w-b100" @click="goto('/pages/shop/index/index',2,'/pages/shop/user/index/index')">
						<span class="iconfont icon-cart"></span> 继续去购物
					</div>
				</div>
			</div>
			
			<div class="rule" v-if="data.rule">
				<p><u-parse :content="data.rule" /></p>
			</div>
		</section>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formAction: '/add-dis.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					default: false,
					address:''
				},
				cityArr: [
					{label:'江门',value:1},
					{label:'广州',value:2},
					{label:'深圳',value:3},
				],
				vaildate: {},
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
			this.ajax();
		},
		methods: {
			formSubmit: function(e) {
				this.postAjax(this.formAction,this.ruleform).then(msg=>{
					if (msg.data.status == 2) {
						this.updateHistory();
						this.ajax();
						//this.goto("/pages/shop/distribution/index/index");
					}
				
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>