<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show" class="business">
			
			<view class="business-list">
				<view class="list-item p15 bd-be bg-f" v-for="v in data.lists.data">
					<view class="info-left mr10">
						<image class="img" :src="v.getUser.headerPic"></image>
					</view>
					<view class="info-con">
						<view class="CItem Atitle fs-15 nowrap lh-20">{{ v.name }}</view>
						<view class="people fs-12 fc-6 mt5">地址：{{ v.address }}</view>
					</view>
					<view class="num ml15 text-center">
						<view class="fs-12 fc-6 flex-center" v-if="v.juli">距离 
							<span class="distance Arial">
								<filterKm v-model="v.juli" v-if="v.juli"></filterKm>
							</span>
						</view>
						<view class="dx-btn dx-btn-xs plr20 bdr15 dx-btn-orange" @click="choose(v)">选择</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import filterKm from '@/components/filterKm';
export default {
	data() {
		return {
			formAction: '/chooseDeliver',
			mpType: 'page', //用来分清父和子组件
			data: this.formatData(this),
			getSiteName: this.getSiteName(),
			deliver:{}
		}
	},
	onReachBottom() {
		this.hasMore(this);
	},
	onPullDownRefresh() {
		this.data.nextPage = 1;
		//this.ajax();
	},
	onShareAppMessage() {
		this.shareSource(this, '商城');
	},
	onLoad(options) {
		this.deliver = uni.getStorageSync('deliver');
		this.getMyAddress(this, () => {
			this.ajax();
		});

	},
	components: { filterKm },
	methods: {
		choose(v){
			uni.setStorageSync('deliver', v);
			this.back();
		},
		ajax() {
			this.getAjax(this).then(msg => {
				console.log(this.data);
			});
		}
	}
}
</script>
<style scoped="">
@import url('index.css');
</style>