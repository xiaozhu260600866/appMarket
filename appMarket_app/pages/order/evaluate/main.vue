<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="evaluate" v-for="v in evaluateLists">
				<view class="order_info2">
					<view class="pro_img">
						<image class="img" :src="v.getProduct.firstCover" mode="aspectFill" />
					</view>
					<view class="pro_info">
						<view class="Titem">
							<view class="left">
								<view class="name">{{v.getProduct.name}}</view>
								<view class="specs" v-if="v.getProduct.is_info">{{v.getProduct.attribute}}</view>
							</view>
							<view class="right">
								<view class="price">￥{{toFixed(v.getProduct.amount / v.getProduct.num ) }}</view>
								<view class="num">x {{v.getProduct.num}}</view>
							</view>
						</view>
						<view class="scount">小计：{{v.getProduct.amount}}</view>
					</view>
				</view>
				<view class="evGroup">
					<dx-list-cell name="描述相符" iconSize="18" iconColor="#ff721f">
					　　<view slot="right">
							<tui-rate v-model="v.quote1" :hollow="true" :disabled="v.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
					<dx-list-cell name="服务态度" iconSize="18" iconColor="#ff721f">
					　　<view slot="right">
							<tui-rate v-model="v.quote2" :hollow="true" :disabled="v.suggestStatus == 1 ? true :false"></tui-rate>
						</view>
					</dx-list-cell>
				</view>
				<view class="evGroup">
					<weui-input v-model="ruleform.remark" placeholder="请输入备注内容" type="textarea" name="remark" datatype="require"
					 :disabled="v.suggestStatus == 1 ? true :false"></weui-input>
					<weui-input v-model="ruleform.suggestLogo" type="upload" upurl='article' allowUpLoadNum="5" name="suggestLogo" datatype="require"
					 :disabled="v.suggestStatus == 1 ? true :false"></weui-input>
				</view>
				<view class="m20" @click="goto('/pages/index/main',2)">
					<dx-button type="primary" btnBg="#57C734" btnBd="#57c734" block>提交</dx-button>
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
					quote1: 5,
					quote2: 5,
					suggestStatus: 0,
					getProduct:{
						is_info:true,
						attribute:'黄色',
						firstCover:'/static/pro01.jpg',
						name:'新鲜甜橙',
						amount: 8.9,
						num: 1
					},
				}]
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