<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="zindex2">
			<view class="pro-header-box main-bg flex-middle fc-white plr10" :style="{height:height_+'px'}">
				<view class="pro-header-icon lh-24" :style="{paddingTop:top+'px'}">
					<view class="dxi-icon dxi-icon-left" @click="goto('/pages/user/index/main',2)"></view>
				</view>
				<view class="pro-header flex1 text-center" :style="{paddingTop:top+'px',paddingLeft:40*2+'rpx'}">
					商品管理
				</view>
				<view class="pro-header-icon text-center" :style="{paddingTop:top+'px',width:40*2+'rpx'}" v-if="!type && !operation">
					<view class="dxi-icon dxi-icon-zoom-in" @click="goto('/pages/search/products/main',1)"></view>
				</view>
				<view class="pro-header-icon text-center" :style="{paddingTop:top+'px',width:40*2+'rpx'}" v-if="!type && operation" @click="operation = false">
					<view class="fs-14 fc-white">取消</view>
				</view>
			</view>
			<view>
				<scroll-view scroll-y scroll-with-animation class="tab-view pb50" :scroll-top="scrollTop" :style="{height:height+'px',top:height_+'px'}">
					<!-- <view class="tab-bar-item flex-baseline" :class="['折扣' ? 'active' : '']" @click="'折扣'">
						<text class="iconfont icon-pro-discount"></text>
						<text>折扣</text>
					</view> -->
					
					<view v-for="(item,key) in data.productClass" :key="key" class="tab-bar-item" :class="[selectClassKey==key ? 'active' : '']"
					 :data-current="index" @click="changeClassKey(key)">
					    <text class="iconfont icon-pro-discount" v-if="item.value == 'discount'"></text>
					    <text class="iconfont icon-pro-hot" v-if="item.value == 'hot'"></text>
						<text>{{item.label}}</text>
					</view>
				</scroll-view>
				<block v-for="(item,index) in data.productClass" :key="index">
					<scroll-view scroll-y class="right-box pb60" :style="{height:height+'px',top:height_+'px'}" v-if="currentTab==index">
						<productLists :data="data.productClass[selectClassKey].products.data" :type="type" ref="productLists" :operation="operation"></productLists>
						<div v-if="!data.productClass[selectClassKey].products.data.length">
							暂无数据
						</div>
					</scroll-view>
				</block>
				<dxftButton type="success" size="lg" v-if="type" @click="confirm">确认</dxftButton>
				<view class="flex ope-btn" v-if="!operation && !type">
					<dx-button type="info" size="lg" myclass="bdr0" block @click="operation = true">批量操作</dx-button>
					<dx-button type="success" size="lg" myclass="bdr0" block @click="goto('/pages/product/create_edit/main',1)">新增商品</dx-button>
				</view>
				<!-- 点击批量操作后显示以下按钮 -->
				<view class="flex ope-btn" v-if="operation && !type">
					<dx-button type="success" size="lg" myclass="bdr0" block>下架</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dxProductsPic from 'doxinui/components/products/pic'
import productLists from "@/components/productLists.vue"
import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components: {
			dxProductsPic,
			productLists,
			dxftButton
		},
		data() {
			return {
				formAction: '/merchant/product/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height_:64,
				top: 0,
				top_: 0,
				type:'',
				coupon_id:"",
				chooseData:[],
				selectClassKey:0,
				currentTab: 0, //预设当前项的值
				scrollTop: 0 ,//tab标题的滚动条位置
				operation: ''
			}
		},
		methods: {
			confirm(){
				
				if(this.$refs.productLists[0].chooseData.length == 0){
					this.getError("您还没有选择");
					return false;
				}
				this.chooseData  = this.$refs.productLists[0].chooseData;
				let product_name = "";
				let product_id = "";
				this.chooseData.forEach((v,index)=>{
					 if(index != this.chooseData.length-1){
						 product_name+=v.name+",";
						 product_id+=v.id+",";
					 }else{
						 product_name+=v.name;
						 product_id+=v.id;
					 }
				});
				if(this.coupon_id){
					this.goto("/pages/user/discounts/create_edit/discounts?product_str="+product_id+"&product_name="+product_name+'&id='+this.coupon_id);
				}else{
					this.goto("/pages/user/discounts/create_edit/discounts?product_str="+product_id+"&product_name="+product_name);
				}
				
			},
			changeClassKey(key){
				this.selectClassKey = key;
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
		},
		onLoad(options) {
			if(options.type){
				this.type = options.type;
			}
			if(options.coupon_id){
				this.coupon_id = options.coupon_id;
			}
			if(options.operation){
				this.operation = options.operation;
			}
			this.data.show = true
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.height_ = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
				}
			})
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						let header = 0;
						let top_ = 0;
						//#ifdef H5
						top_ = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(header)
						this.top_ = top_ + uni.upx2px(header)
					}
				});
			}, 50)
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
		onShow(){
			this.ajax()
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>