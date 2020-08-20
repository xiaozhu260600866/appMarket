<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="evaluate" v-for="v in evaluateLists">
				<view class="evGroup">
					<dx-list-cell :name="horse.name" :imgSrc="horse.headerPic" imgWidth="36" imgHeight="36" imgR="18" noborder></dx-list-cell>
					<dx-list-cell name="评价" iconSize="18" iconColor="#ff721f" padding="0 30rpx">
					　　<view slot="right">
							<tui-rate v-model="v.quote1" :hollow="true" :disabled="v.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<weui-input v-model="ruleform.remark" placeholder="请输入评价内容" type="textarea" name="remark" datatype="require"
					 :disabled="v.suggestStatus == 1 ? true :false"></weui-input>
				</view>
				<view class="evGroup">
					<dx-list-cell :name="store.name" :imgSrc="store.headerPic" imgWidth="36" imgHeight="36" imgR="18" noborder></dx-list-cell>
					<dx-list-cell name="评价" iconSize="18" iconColor="#ff721f" padding="0 30rpx">
					　　<view slot="right">
							<tui-rate v-model="v.quote2" :hollow="true" :disabled="v.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<weui-input v-model="ruleform.remark" placeholder="请输入评价内容" type="textarea" name="remark" datatype="require"
					 :disabled="v.suggestStatus == 1 ? true :false"></weui-input>
					<weui-input v-model="ruleform.suggestLogo" type="upload" upurl='article' allowUpLoadNum="5" name="suggestLogo" datatype="require"
					 :disabled="v.suggestStatus == 1 ? true :false"></weui-input>
				</view>
				<view class="m20" @click="goto('/pages/index/main',2)">
					<dx-button type="primary" btnBg="#57C734" btnBd="#57c734" size="lg" block>提交</dx-button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import tuiRate from "xiaozhu/uniapp/thorui/components/rate/rate"
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components: {
			tuiRate,
			dxListCell
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				evaluateLists:[{
					quote1: 0,
					quote2: 0,
					suggestStatus: 0,
					getProduct:{
						is_info:true,
						attribute:'黄色',
						firstCover:'/static/pro01.jpg',
						name:'新鲜甜橙',
						amount: 8.9,
						num: 1
					},
				}],
				store:{
					headerPic:'/static/pro02.jpg',
					name: '东风生鲜'
				},
				horse:{
					headerPic:'/static/pro01.jpg',
					name: '骑手-东风'
				}
			}
		},
		methods: {
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