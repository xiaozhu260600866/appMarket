<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show" class="business">
			<view class="now-item" v-if='teamHead.name'>
				<view class="now-box bg-f m10 p15 text-center bdr6">
					<view class="fs-12 fc-9 mb5">当前社区</view>
					<view class="head">
						<image class="img" :src="teamHead.getUser.headerPic"></image>
					</view>
					<view class="name fs-15 fc-3 lh-20 mtb10">{{ teamHead.name }}({{ teamHead.community_company_name }})</view>
					<view class="address fs-13 fc-6">地址：{{ teamHead.community_address }}</view>
					<!-- <view class="dx-btn dx-btn-sm plr25 bdr15 dx-btn-orange mt5" @click="choose(v)">选择</view> -->
				</view>
			</view>
			<view class="business-list">
				<view class="list-item p15 bd-be bg-f" v-for="v in teamHeadArr">
					<view class="info-left mr10">
						<image class="img" :src="v.getUser.headerPic"></image>
					</view>
					<view class="info-con">
						<view class="CItem Atitle fs-15 nowrap lh-20">{{ v.name }}({{ v.community_company_name }})</view>
						<view class="people fs-12 fc-6 mt5">地址：{{ v.community_address }}</view>
					</view>
					<view class="num ml15 text-center">
						<view class="fs-12 fc-6 flex-center" v-if="v.location">距离 
							<span class="distance Arial">
								<filterKm v-model="v.location" v-if="v.location"></filterKm>
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
import "./index.css";
import filterKm from '@/components/filterKm';
export default {
	data() {
		return {
			formAction: '/order/buy',
			mpType: 'page', //用来分清父和子组件
			data: this.formatData(this),
			getSiteName: this.getSiteName(),
			teamHead:{
				name:'梁先生',
				community_address:'江门市新会区人民南路10号',
				community_company_name:'人民南路社区',
				phone:'13388998899',
				getUser:{
					headerPic:'/static/pro02.jpg',
				}
			},
			teamHeadArr:[{
				name:'哈达威商店',
				community_address:'江门市蓬江区建设二路',
				community_company_name:'北郊市场',
				phone:'13378585956',
				location: 0.5,
				getUser:{
					headerPic:'/static/pro02.jpg',
				}
			},{
				name:'果果好',
				community_address:'江门市新会区侨兴花园',
				community_company_name:'侨兴市场',
				phone:'13533626333',
				location: 10.5,
				getUser:{
					headerPic:'/static/pro03.jpg',
				}
			},{
				name:'一资商店',
				community_address:'江门市新会区悦洋街32号',
				community_company_name:'悦洋市场',
				phone:'13625696932',
				location: 12.5,
				getUser:{
					headerPic:'/static/pro01.jpg',
				}
			}]
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
		this.teamHead = uni.getStorageSync('teamHead');
		this.getMyAddress(this, () => {
			this.ajax();
		});

	},
	components: { filterKm },
	methods: {
		choose(v){
			uni.setStorageSync('teamHead', v);
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