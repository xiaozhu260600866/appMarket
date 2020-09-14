<template>
	<section>
		<dx-diag :open="true" :tbPadding="0" :lrPadding="0">
			<view class="reason">
				<view class="item" v-for="v in reasonLists">{{ v.label }}</view>
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
			toggleDiag() {
				this.$parent.popDiv = !this.$parent.popDiv;
			}
		}
	}
</script>
<style>
.reason .item{font-size: 30upx;color: #333;line-height: 88upx;border-bottom: 2upx #eee solid;padding: 0 30upx;}
.reason .item:last-child{border-bottom: 0;}
</style>
