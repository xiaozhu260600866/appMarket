<template>
	<view class="container bg-f">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#333'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view>
					<tui-icon name="search" :size='16' color='#333'></tui-icon>
				</view>
				<!-- #endif -->
				<input confirm-type="search" placeholder="请搜索商品" :focus="true" auto-focus placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="key"  @confirm="search"/>
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="key" >
					<tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
				</view>
				<!-- #endif -->
			</view>
			<view class="tui-cancle" @tap="search">搜索</view>
		</view>

		<view class="tui-search-history" v-if="history.length>0">
			<view class="tui-history-header">
				<view class="tui-search-title">搜索历史</view>
				<tui-icon name="delete" :size='14' color='#333' @tap="openActionSheet" class="tui-icon-delete"></tui-icon>
			</view>
			<view class="tui-history-content">
				<block v-for="(item,index) in history" :key="index">
					<tui-tag type="gray" shape="circle" @click="goto('/pages/shop/product/lists/index?name='+item.name,1)">{{item.name}}</tui-tag>
				</block>
			</view>
		</view>
		<productLists :data="products.data" :type="'1'" ref="productLists" :operation="true"></productLists>
		<tui-actionsheet :show="showActionSheet" :tips="tips" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
	</view>

</template>

<script>
	import tuiIcon from "xiaozhu/uniapp/thorui/components/icon/icon"
	import tuiTag from "xiaozhu/uniapp/thorui/components/tag/tag"
	import tuiActionsheet from "xiaozhu/uniapp/thorui/components/actionsheet/actionsheet"
	import productLists from "@/components/productLists.vue"
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiActionsheet,
			productLists
		},
		data() {
			return {
				history: [],
				products:[],
				formAction:"/merchant/product/listAll",
				key: "",
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				showActionSheet: false,
				tips: "确认清空搜索历史吗？"
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'history',
				success: res => {
					this.history = res.data;
				}

			});
			this.ajax();

		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				name:this.key
				}).then(msg => {
					this.products = msg.lists;
				});
			},
			 search(){
				  this.ajax();
			 },
			
			cleanKey: function() {
				this.key = ''
			},
			
		}
	}
</script>

<style scoped="">
@import url('index.css')
</style>