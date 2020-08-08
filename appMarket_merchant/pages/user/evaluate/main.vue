<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="mb12">
				<dx-tabs :tabs="navbar" v-model="replyStatus" selectedColor="#57C734" sliderBgColor="#57C734" @change="change"></dx-tabs>
			</view>
			<view class="bd-be">
				<dx-tabs :tabs="tabs" :height="88" :sliderWidth="150" :sliderHeight="60" bottom="50%" color="#888" selectedColor="#fff" :bold="true" sliderBgColor="#57C734" @change="change" v-model="evaluteStatus"></dx-tabs>
			</view>
			
			<view class="evalute">
				<view class="evalute-item p10 bg-f bd-be" v-for="v in suggestLists">
					<view class="u-info">
						<view class="u-info-box">
							<view class="u-img">
								<image class="img" :src="v.headimgurl" />
							</view>
							<view class="u-name pl10">
								<view class="name lh-20 fs-14">{{ v.nickname }}</view>
								<view class="lh-20"><tui-rate :value="v.quote" :disabled="true" :size="16"></tui-rate></view>
							</view>
							<view class="r-time Arial fs-13 fc-9 pl10">{{ v.created_at }}</view>
						</view>
					</view>
					<view class="u-con pt10 plr15">
						<view class="p">{{ v.suggestContent }}</view>
						<dx-images :data="v.getSuggestLogo"></dx-images>
					</view>
					<view>
						<view class="reply mlr15 mt10 bg-f2 p10 fs-14 bdr6" v-if="v.replyCon">
							<view class="name fc-3 mb5 fw-bold">掌柜回复</view>
							<view class="reply-con fc-6 lh-20">{{ v.replyCon }}</view>
						</view>
						<view class="text-right pr15" v-else @click="goto('/pages/user/evaluate/layouts/reply',1)">
							<dx-button type="success" size="small">回复</dx-button>
						</view>
					</view>
				</view>
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				replyStatus: 0,
				navbar: [{
					name: "全部",
					value: 0
				}, {
					name: "待回复",
					value: 1
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
				suggestLists:[{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:4,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro02.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro03.jpg'},
						{img:'/static/pro01.jpg'},
						{img:'/static/pro02.jpg'},
					],
					replyCon:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:5,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					getSuggestLogo:[
						{img:'/static/pro01.jpg'},
					],
					replyCon:''
				},{
					headimgurl:'/static/banner01.jpg',
					nickname:'东信科技-梅',
					quote:3,
					created_at: '2020-06-18 11:29:32',
					suggestContent:'非常新鲜，送货也很快，很值得购买，方便快捷，特别适合上班一族',
					replyCon:''
				}]
			}
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			//this.ajax();
			
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