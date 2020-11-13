<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="mb12">
				<dx-tabs :tabs="navbar" v-model="showType" selectedColor="#57C734" sliderBgColor="#57C734" @change="ajax"></dx-tabs>
			</view>
			<view class="bd-be">
				<dx-tabs @change="ajax" v-model="quote" :tabs="tabs" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#fff" :bold="true" sliderBgColor="#57C734" >
					
				</dx-tabs>
			</view>
			
			<view class="evalute">
				<view class="evalute-item p10 bg-f bd-be" v-for="v in data.lists.data" v-if="v.user">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img">
								<image class="img" :src="v.user.headerPic" />
							</view>
							<view class="u-name pl10">
								<view class="name lh-20 fs-14">{{ v.addr_name }}</view>
								<view class="lh-20"><tui-rate :value="v.merchant_quote" :disabled="true" :size="16"></tui-rate></view>
							</view>
							<view class="r-time Arial fs-13 fc-9 pl10">{{ v.evaluate_date }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15" >
						<view class="p">{{ v.merchant_evaluate }}</view>
						<dx-images :data="getLogo(v.merchant_evaluate_logo)"  v-if="v.merchant_evaluate_logo"></dx-images>
					</view>
					<view>
						<view class="reply mlr15 mt10 bg-f2 p10 fs-14 bdr6" v-if="v.evaluate_reply">
							<view class="name fc-3 mb5 fw-bold">掌柜回复</view>
							<view class="reply-con fc-6 lh-20">{{ v.evaluate_reply }}</view>
						</view>
						<view class="text-right pr15" v-else @click="goto('/pages/user/evaluate/layouts/reply?order_id='+v.id,1)">
							<dx-button type="success" size="small">回复</dx-button>
						</view>
					</view>
				</view>
				<hasMore :parentData="data"></hasMore>
			</view>
			
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{
			dxTabs,dxTabsScroll,tuiRate,dxImages
		},
		data() {
			return {
				formAction: '/merchant/evaluate',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				replyStatus: 0,
				showType:'all',
				quote:0,
				navbar: [{
					name: "全部",
					value: 'all'
				}, {
					name: "待回复",
					value: 'receiveing'
				}],
				evaluteStatus: 0,
				tabs: [{
					name: "全部",
					value: 0
				}, {
					name: "最新",
					value: 1
				}, {
					name: "好评",
					value: 2
				}, {
					name: "中评",
					value: 3
				}, {
					name: "差评",
					value: 4
				}],
				
			}
		},
		methods: {
			getLogo(cover){
				let coverArr = cover.split(",");
				let coverArr_ = [];
				coverArr.forEach(v=>{
					coverArr_.push({img:this.getSiteName + '/upload/images/order/'+v});
				});
				console.log(coverArr_);
				return coverArr_;
			},
			change(e) {
				this.currentTab = e.index
			},
			ajax() {
				this.getAjaxForApp(this, {
				showType:this.showType,
				quote:this.quote
				}).then(msg => {
					
				});
			}
		},
		onShow(){
			this.ajax();
		},
		onLoad(options) {
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
@import url('index.css')
</style>