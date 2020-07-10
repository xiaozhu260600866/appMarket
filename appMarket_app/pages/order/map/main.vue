<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		 <view class="content" v-if="mapShow">
		        <mi-map
		            v-if="mapShow"
		            ref="miMap"
		        >
		        </mi-map>
		    </view>
	</view>
</template>

<script>
	import miMap from '@/components/mi-map/mi-map.vue'
	export default {
		components: {miMap},
		data() {
			return {
				formAction: '/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				mapShow:false,
				order_no:"",
				getSiteName: this.getSiteName(),
				positionObj: {},
			}
		},
		methods: {    
			ajax() {
				this.getAjaxForApp(this, {order_no:this.order_no
				
				}).then(msg => {
					if(!msg.horse){
						this.mapShow = false;
					}else{
						this.mapShow = true;
						let item = msg.detail;
						this.$nextTick(()=>{
							this.$refs.miMap.ajax(item,"1234",msg.horse.latitude,msg.horse.longitude);
						})
						
					}
				});
			}
		},
		onLoad(options) {
			this.order_no = options.order_no;
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