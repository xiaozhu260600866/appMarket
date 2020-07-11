<template>
	<view class="server-place">
		<div class="p20">
			<view class="flex-between flex-middle">
				<div class="fs-14">{{order.addr_address}}</div>
				<dxButton plain type="success" round size="small" @click="close">关闭</dxButton>
			</view>
			<view class="flex-between flex-middle">
				<div class="fs-14">
					<div v-if="order.horse_take">全程{{order.space}}km</div>
					<div v-if="order.horse_take == 0 && order.getMerchant.space">全程{{order.getMerchant.space}}</div>
				</div>
				<dxButton type="success" size="small" round @click="location(markers[1].latitude,markers[1].longitude,order.getMerchant.name,)">导航</dxButton>
			</view>
			<view class="flex fs-14 fc-gray bd-td flex-middle" style="height: 50px;">
				请在{{order.deliver_date}}内送达目的地
			</view>
		</div>
		<map
			id='map'
			ref='map'
			v-bind:style="{height: mapH + 'px'}"
			style="width: 100%;" 
			:latitude="latitude" 
			:longitude="longitude"
			@regionchange='mapChange'
			:markers="markers"
			>
		</map>
		<view class="map-tools">
			<div class="p20 flex-between flex-middle" style="height: 50px;width:100%">
				<div class="flex flex-middle">
					<image src="../../static/horse.png" style="width:80px;height: 80px;"></image>
					<div>{{order.addr_name}}</div>
				</div>
				<div>
					<dxButton type="success" size="small" round @click="phone(order.addr_phone)">电话</dxButton>
				</div>
			</div>
		</view>
	</view>
	
</template>

<script>
	const app = getApp()
	var QQMapWX = require('./qqmap-wx-jssdk.min.js')
	var qqmapsdk = new QQMapWX({
	  key: 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
	})
	import dxftButton from "doxinui/components/button/footer-button"
	import dxButton from "doxinui/components/button/button"　
	export default {
		components:{
			dxftButton,
			dxButton
		},
		props: {
			tipText: {
				type: String,
				default: '选择位置'
			},
			descText: {
				type: String,
				default: '使用当前定位或在地图上标记位置'
			},
		},
		data() {
			return {
				mapH: 0,             // 地图高度，可在initMapH()中设置高度
				longitude: 0,        // 初始经度
				latitude: 0,         // 初始纬度
				myAddress: '',   	 // 初始地址信息
				order:{},
				name:'',
				addressObj: {        // 地图选点信息
					longitude: '',
					latitude: '',
					address: '请选择集合地点'
				},
				 markers: [{  
						id:'1',  
						label:{  
							content:''  
						},
						 
						latitude: 0,  
						longitude: 0,  
						width:10,  
						height:10,  
						iconPath: '/static/horse.png',
				     },
					 {
							id:'1',  
							label:{  
								content:''  
							},  
							latitude: 22.592627,  
							longitude: 113.079593,  
							width:10,  
							height:10,  
							iconPath: '/static/end.png',
					  },
				],  
				controls: [           // 地图中心点图标, 可更换iconPath, 详情见官方文档关于map组件的介绍
					{
						iconPath: '/static/aqq.png',
						position: { 
							left: 175,
							top: 210,
							width: 30, 
							height: 30,
						},
						clickable: false
					}
				],
			};
		},
		mounted() {
			
		},
		methods:{
			ajax(order,name,location_x,location_y){
				this.order = order;
				this.name = name;
				this.markers[1].latitude = location_x
				this.markers[1].longitude = location_y
				this.getLocation()
				setInterval(()=>{
					this.getLocation()
				},10000);
				this.initMapH()
			},
			close(){
				this.getParent(this).mapShow = false;
			},
			// 查询现在的位置
			getLocation() {
				let this_ = this
				uni.getLocation({
					// type: 'gcj02', // 返回国测局坐标
					geocode: true,
					success: res=>{
						this_.initMap(res)
						this_.markers[0].latitude = res.latitude
						this_.markers[0].longitude = res.longitude
					    this.postAjax("/horse/updateHorseLocation",{latitude:res.latitude,longitude:res.longitude,order_no:this.order.order_no},"notloing");
						
					},
					fail: function(e) {
						uni.showToast({
							icon: 'none',
							title: '获取地址失败, 请检查是否开启定位权限~~'
						})
					}
				})
			},
			
			// 初始化我的位置
			async initMap(res) {
				this.longitude = res.longitude;
				this.latitude = res.latitude;
				this.myAddress = await this.getAddressName(res);
				
				this.addressObj = Object.assign({}, this.addressObj,{
					longitude: res.longitude,
					latitude: res.latitude,
					address: this.myAddress
				})
			},
			
			// 地图选择位置后 查询地点名称
			async checkMap(res) {
				this.addressObj = Object.assign({}, this.addressObj,{
					longitude: res.longitude,
					latitude: res.latitude,
					address: await this.getAddressName(res)
				})
				console.log('当前位置:' + res.latitude + '|' + res.longitude);
			},
			
			// 监听地图位置变化
			mapChange(e) {
				console.log(e);
				let that = this
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (e.type == 'end') {
						that.mapCtx = uni.createMapContext('map', this)
						that.mapCtx.getCenterLocation({
							success: res => {
								this.checkMap(res)
							},
							fail: err => {
								console.log(err);
							}
						})
					}
				}, 200)
			},
			// 查询地图中心点的名称
			getAddressName(addressObj) {
				
				return new Promise((res) => {
					// #ifdef APP-PLUS
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: addressObj.latitude,
								longitude: addressObj.longitude
							},
							get_poi: 1,
							poi_options: "page_size=1;page_index=1",
							output: 'jsonp',
							success: (e) => {
								res(e.result.formatted_addresses.recommend);
							},
							fail: err => {
								res(err);
							}
						})
					// #endif
					
					// #ifndef APP-PLUS
						// ======================== jsonp跨域 ======================== 
						const KEY = 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
						let locationObj = addressObj.latitude+','+addressObj.longitude
						let url = 'https://apis.map.qq.com/ws/geocoder/v1?coord_type=5&get_poi=1&output=jsonp&poi_options=page_size=1;page_index=1';
						this.$jsonp(url,{
						  key: KEY,
						  location: locationObj
						}).then(e => {
							res(e.result.formatted_addresses.recommend);
						})
						.catch(err => {
							res(err);
						})
					// #endif
					
					
				})
				
			},
			// 计算地图的高度
			initMapH() {
				// #ifdef APP-PLUS
					this.mapH = uni.getSystemInfoSync().windowHeight - 260;
				// #endif
				// #ifndef APP-PLUS
					this.mapH = uni.getSystemInfoSync().windowHeight - 170;
				// #endif
			},
			// 移动到我的位置
			toMyLocation() {
				this.getLocation()
			},
			// 提交
			submitAdress() {
				this.controls = []
				setTimeout(() => {
					this.$emit('updateAddress', this.addressObj)
				}, 100)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.server-place{
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100%;
		background: #ffffff;
		z-index: 999;
		.icon-img{
			width: 36px;
			height: 36px;
			display: block;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			margin-top: -70px;
		}
		.map-tools{
			position: fixed;
			width: 100%;
			bottom: 0rem;
			left: 0;
			padding-bottom: .5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.my-location{
				width: 90%;
				margin: 0 auto;
				height: 2.5rem;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 0.5rem;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				overflow: hidden;
				.left{
					background: #3384ff;
					// flex: 20%;
					width: 2.5rem;
					height: 100%;
				}
				.right{
					font-size: 0.57rem;
					margin-left: .5rem;
					color: #111;
					// flex: 80%;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;
					.text{
						width: 12rem;
						overflow: hidden;
						white-space:nowrap;
						text-overflow: ellipsis;
						color: #3384FF;
						margin-top: .3rem;
					}
				}
			}
			
			.start-place{
				width: 85%;
				margin: 0 auto;
				height: 5.5rem;
				margin: 0 auto;
				margin-top: .6rem;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 0.5rem;
				padding: .5rem;
				.place{
					.title{
						font-size: 0.67rem;
						font-weight: bold;
						color: #111;
					}
					.text{
						font-size: 0.76rem;
						color: #3384FF;
						font-weight: bold;
						width: 12rem;
						vertical-align: middle;
						display: inline-block;
						margin-left: .5rem;
						overflow: hidden;
						white-space:nowrap;
						text-overflow: ellipsis;
					}
				}
				.tip{
					font-size: 0.57rem;
					color: #666;
					margin-top: .5rem;
				}
				.sure{
					margin-top: .5rem;
					color: #FFFFFF;
					background: #212121;
					font-weight: 600;
				}
				
			}
		}
	}
</style>
