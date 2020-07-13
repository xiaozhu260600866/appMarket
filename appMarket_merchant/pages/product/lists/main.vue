<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom: 180upx">
			<view slot="floatBtn">
				<view @click="goto('/pages/product/create_edit/main',1)">
					<floatBtn type="2" icon="icon-count-plus" myclass="float-nav-green topFloat" iSize="fs-22" nSize="fs-13" title="新增"></floatBtn>
				</view>
			</view>
		</page>
		<view class="zindex2">
			<view class="pro-header-box main-bg flex-middle fc-white plr10" :style="{height:height_+'px'}">
				<view class="pro-header-icon lh-24" :style="{paddingTop:top+'px'}">
					<view class="dxi-icon dxi-icon-left" @click="goto('/pages/user/index/main',2)"></view>
				</view>
				<view class="pro-header flex1 text-center" :style="{paddingTop:top+'px',paddingLeft:40*2+'rpx'}">
					商品管理
				</view>
				<view class="pro-header-icon text-center" :style="{paddingTop:top+'px',width:40*2+'rpx'}">
					<view class="dxi-icon dxi-icon-zoom-in" @click="goto('/pages/search/products/main',1)"></view>
				</view>
			</view>
			<view>
				<scroll-view scroll-y scroll-with-animation class="tab-view pb50" :scroll-top="scrollTop" :style="{height:height+'px',top:height_+'px'}">
					<view v-for="(item,key) in data.productClass" :key="key" class="tab-bar-item" :class="[selectClassKey==key ? 'active' : '']"
					 :data-current="index"  @click="changeClassKey(key)">
						<text>{{item.label}}</text>
					</view>
				</scroll-view>
				<block v-for="(item,index) in data.productClass" :key="index">
					<scroll-view scroll-y class="right-box pb50" :style="{height:height+'px',top:height_+'px'}" v-if="currentTab==index">
						<productLists :data="data.productClass[selectClassKey].products.data"></productLists>
						<div v-if="!data.productClass[selectClassKey].products.data.length">
							暂无数据
						</div>
					</scroll-view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
import dxProductsPic from 'doxinui/components/products/pic'
import productLists from "@/components/productLists.vue"
	export default {
		components: {
			dxProductsPic,
			productLists
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
				selectClassKey:0,
				currentTab: 0, //预设当前项的值
				scrollTop: 0 ,//tab标题的滚动条位置
			}
		},
		methods: {
			changeClassKey(key){
				console.log(0);
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