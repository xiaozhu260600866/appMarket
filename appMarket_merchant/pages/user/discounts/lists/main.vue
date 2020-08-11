<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50" v-if="data.show">
			<view class="discounts_item mb12 bg-f" v-for="(v,index) in data.lists.data">
				<dx-list-msg :name="getName(v)">
					<view slot="left">
						<view class="type type-dis" v-if="v.type == 1">折</view>
						<view class="type type-coupon" v-if="v.type == 0">券</view>
					</view>
					<view slot="con" class="fs-13 fc-9">
						<view class="Arial mt8">发布时间：{{ v.created_at }}</view>
					</view>
					<view slot="right" class="edit_icon">
						<view class="icon" @click="goto(v.type == 0 ? '/pages/user/discounts/create_edit/coupon?id='+v.id : '/pages/user/discounts/create_edit/discounts?id='+v.id,1)"><text class="dxi-icon dxi-icon-edit"></text></view>
						<view class="icon"><text class="dxi-icon dxi-icon-del" @click="del(v)"></text></view>
					</view>
				</dx-list-msg>
			</view>
			<hasMore :parentData="data"></hasMore>
			<view @click="openActionSheet(4)"><dxftButton type="success">新增优惠</dxftButton></view>
			<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable"
			 :color="color" :size="size" :is-cancel="isCancel" @click="toCreate" @cancel="closeActionSheet"></tui-actionsheet>
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
				formAction: '/merchant/coupon/lists',
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
			getName(item){
				if(item.type == 0){
					return item.name;
				}else{
					return item.product_name+item.discount+'折优惠'
				}
			},
			del(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个产品吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'coupons'
							}).then(msg=>{
								if (msg.data.status == 2) {
									this.ajax();
								}
							});
						}
					}
				})
			},
			toCreate(item){
				if(item.index == "3"){
					this.goto("/pages/user/discounts/create_edit/full");
				}else if(item.index == "0"){
					this.goto("/pages/user/discounts/create_edit/discounts");
				}else if(item.index == "1"){
					this.goto("/pages/user/discounts/create_edit/coupon");
				}
			},
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
						itemList = [ {
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
			this.ajax();
			
		},
		onShow(){
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