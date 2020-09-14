<template>
	<section>
		<dx-diag  :tbPadding="0" :lrPadding="0" ref="diag">
			<view class="reason">
				<view class="item" v-for="v in reasonLists" @click="cancelOrder(v.label)">{{ v.label }}</view>
			</view>
		</dx-diag>
	</section>
</template>
<script>
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components:{dxDiag},
		props: [],
		data() {
			return {
				reasonLists:[
					{value:1,label:'其它原因'},
					{value:2,label:'感觉配送时间太长，让我再考虑一下'},
					{value:3,label:'拍错单了，重新下单'},
					{value:4,label:'来不及收货'},
					{value:5,label:'不想要了'},
				]
			}
		},
		methods: {
			cancelOrder(cancel_reason){
				this.getConfirm("是否取消订单", msg => {
					this.postAjax("/user/change-order-status", {id:this.getParent(this).ruleform.id,status:0,cancel_reason:cancel_reason}).then(msg => {
						if (msg.data.status == 2) {
							this.$refs.diag.thisDiag = false;
							this.getParent(this).ajax();
						}
					});
				});
			},
			open() {
				this.$refs.diag.thisDiag = true;
			}
		}
	}
</script>
<style>
.reason .item{font-size: 30upx;color: #333;line-height: 88upx;border-bottom: 2upx #eee solid;padding: 0 30upx;}
.reason .item:last-child{border-bottom: 0;}
</style>
