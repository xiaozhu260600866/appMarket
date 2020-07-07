<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50">
			<view class="discounts_item mb12 bg-f" v-for="(v,index) in newsLists">
				<dx-list-msg :name="v.title">
					<view slot="left">
						<view class="type type-full" v-if="v.type == 1">减</view>
						<view class="type type-dis" v-if="v.type == 2">折</view>
						<view class="type type-coupon" v-if="v.type == 3">券</view>
					</view>
					<view slot="con" class="fs-13 fc-9">
						<view class="Arial mt8">发布时间：{{ v.created_at }}</view>
					</view>
					<view slot="right" class="edit_icon">
						<view class="icon" @click="goto(v.edit_url,1)"><text class="dxi-icon dxi-icon-edit"></text></view>
						<view class="icon"><text class="dxi-icon dxi-icon-del"></text></view>
					</view>
				</dx-list-msg>
			</view>
			<view @click="openActionSheet(4)"><dxftButton type="success">新增优惠</dxftButton></view>
			<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable"
			 :color="color" :size="size" :is-cancel="isCancel" @click="goto(v.edit_url,1)" @cancel="closeActionSheet"></tui-actionsheet>
		</view>
	</view>
</template>

<script>
import dxListMsg from "doxinui/components/list-cell/list-msg"
import dxftButton from "doxinui/components/button/footer-button"
import tuiActionsheet from "xiaozhu/uniapp/thorui/components/actionsheet/actionsheet"
	export default {
		components:{
			dxListMsg,dxftButton,tuiActionsheet
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				newsLists:[{
					edit_url:'/pages/user/discounts/create_edit/full',
					type: 1,
					title: '满200减10',
					created_at: '2020-06-10'
				},{
					edit_url:'/pages/user/discounts/create_edit/discounts',
					type: 2,
					title: '芒果商城8折优惠',
					created_at: '2020-06-10'
				},{
					edit_url:'/pages/user/discounts/create_edit/coupon',
					type: 3,
					title: '15元优惠券',
					created_at: '2020-06-10'
				}],
				
				// 弹出插件
				showActionSheet: false,
				maskClosable: true,
				tips: "确认清空搜索历史吗？",
				itemList: [],
				color: "#9a9a9a",
				size: 26,
				isCancel: true
			}
		},
		methods: {
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			openActionSheet: function(type) {
				let itemList = [{
					text: "确定",
					color: "#1a1a1a"
				}];
				let maskClosable = true;
				let tips = "确认清空搜索历史吗？";
				let color = "#9a9a9a";
				let size = 26;
				let isCancel = true;
				//组件中都有默认值，实际应用中不需要可不操作
				switch (type) {
					case 4:
						tips = "";
						itemList = [{
							text: "满减活动",
							color: "#1a1a1a"
						}, {
							text: "折扣商品",
							color: "#1a1a1a"
						}, {
							text: "优惠券",
							color: "#1a1a1a"
						}]
						break;
				}
				setTimeout(() => {
					this.showActionSheet = true;
					this.itemList = itemList;
					this.maskClosable = maskClosable;
					this.tips = tips;
					this.color = color;
					this.size = size;
					this.isCancel = isCancel
				}, 0)
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