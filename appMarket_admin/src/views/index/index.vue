<template>
	<div v-if="data.show">
		<div class="icount-box">
			<div class="icount-item">
				<div class="icount-title"><span class="name">订单概况</span></div>
				<div class="icount-row">
					<div class="row-item" @click="goto('/merchant/order-lists?status=3')">
						<div class="row-name">待接单</div>
						<div class="row-num">{{ data.data.count0Count }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/order-lists?status=4')">
						<div class="row-name">待配送</div>
						<div class="row-num">{{ data.data.count4Count }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/order-lists?status=0')">
						<div class="row-name">待退款</div>
						<div class="row-num">{{ data.data.count0Count }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/order-lists?status=5')">
						<div class="row-name">已完成</div>
						<div class="row-num">{{ data.data.count5Count }}</div>
					</div>
				</div>
			</div>
			<div class="icount-item">
				<div class="icount-title"><span class="name">商家概况</span></div>
				<div class="icount-row">
					<div class="row-item" @click="goto('/merchant/lists?status=1')">
						<div class="row-name">全部商家</div>
						<div class="row-num">{{ data.data.merchantCount }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/lists?status=1')">
						<div class="row-name">营业中</div>
						<div class="row-num">{{ data.data.merchantCountWorkStatus1 }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/lists?status=1')">
						<div class="row-name">休息中</div>
						<div class="row-num">{{ data.data.merchantCountWorkStatus3 }}</div>
					</div>
					<div class="row-item" @click="goto('/merchant/lists?status=1')">
						<div class="row-name">封停</div>
						<div class="row-num">{{ data.data.merchantCountWorkStatus2 }}</div>
					</div>
				</div>
			</div>
			<div class="icount-item">
				<div class="icount-title"><span class="name">配送员概况</span></div>
				<div class="icount-row">
					<div class="row-item" @click="goto('/horse/lists?status=1')">
						<div class="row-name">全部配送员</div>
						<div class="row-num">{{ data.data.horseCount }}</div>
					</div>
					<div class="row-item" @click="goto('/horse/lists?status=1')">
						<div class="row-name">接单中</div>
						<div class="row-num">{{ data.data.horseCountWorkStatus1 }}</div>
					</div>
					<div class="row-item" @click="goto('/horse/lists?status=1')">
						<div class="row-name">休息中</div>
						<div class="row-num">{{ data.data.horseCountWorkStatus3 }}</div>
					</div>
					<div class="row-item" @click="goto('/horse/lists?status=1')">
						<div class="row-name">封停</div>
						<div class="row-num">{{ data.data.horseCountWorkStatus2 }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
		export default {
				data() {
						return {
								formAction: '/admin/user/boss-count',
								data: this.formatData(this),
								siteName: this.getSiteName()
						}
				},
				watch: {
						'$route': 'ajax'
				},
				mounted() {
						this.ajax()
				},
				methods: {
						ajax() {
								this.getAjax(this, {}, msg => {
									// this.$nextTick(()=>{
									//   this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
									// })
								})
						}
				}
		}
</script>

<style>
.icount-box{margin: 15px;background-color: #fff;padding: 15px;}
.icount-item{margin-bottom: 20px;}
.icount-item:last-child{margin-bottom: 0;}
.icount-title{padding: 10px 15px;background-color: #f8f8f8;margin-bottom: 15px;}
.icount-title .name{font-size: 15px;font-weight: bold;display: inline-block;padding-left: 15px;position: relative;line-height: 20px;}
.icount-title .name:before{content: "";display: block;position: absolute;top: 50%;left: 0;margin-top: -8px;height: 16px;width: 4px;background-color: #1890ff;}
.icount-row{display: flex;justify-content: space-between;align-items: center;background-color: #f8f8f8;padding: 15px 0;}
.icount-row .row-item{width: 100%;text-align: center;border-right: 1px dotted #cbcbcb;}
.icount-row .row-item:last-child{border-right: 0;}
.icount-row .row-num{font-size: 40px;color: #333;line-height: 55px;}
.icount-row .row-name{font-size: 14px;color: #333;line-height: 20px;}
</style>
