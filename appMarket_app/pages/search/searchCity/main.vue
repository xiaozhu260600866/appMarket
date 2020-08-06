<template>
	<view class="page">
		<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight+'px'}">
			<view class="search-bar">
				<view class="search-bar-form">
					<view class="search-bar-box">
						<!-- <icon class="icon-search-in-box" type="search" size="16"></icon> -->
						<input confirm-type="search" class="search-bar-input" placeholder="输入城市名称或首字母查询" placeholder-class="phcolor"
						 :value="inputVal" :focus="inputShowed" @input="inputTyping" />
						<view class="icon-clear" v-if="inputVal" @tap="clearInput">
							<!-- #ifdef APP-PLUS || MP -->
							<icon type="clear" :size="15"></icon>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon>
							<!-- #endif -->
						</view>
					</view>
					<label class="search-bar-label" v-if="!inputShowed" @tap="showInput">
						<!-- <icon class="icon-search" type="search" size="16"></icon> -->
						<view class="search-bar-text">输入城市名称或首字母查询</view>
					</label>
				</view>
			</view>
			<view class="tui-list search-result" v-if="inputShowed">
				<view class="tui-list-cell" hover-class="tui-list-cell-hover" v-for="(item,index) in searchResult" :key="index"
				 @tap="selectCity" :data-name="item" :hover-stay-time='150'>
					<view class="tui-list-cell-navigate">
						{{item}}
					</view>
				</view>
			</view>
			<view v-if="!inputVal">
				<view class="current-city" v-if="localCity">
					<view class="title">当前城市</view>
					<view class="city-name">
						<tui-icon name="position-fill" color="#5677fc" :size="18"></tui-icon>
						{{localCity}}
					</view>
				</view>
				<view class="hot-city">
					<view class="title">已开通城市</view>
					<view class="city-names">
						<view class="city-name-item" v-for="(item,index) in data.city" :key="index" hover-class="tap-city" :hover-stay-time="150"
						 @tap="selectCity" :data-name="item.name">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="tui-list city-list">
					<block v-for="(list,index) in lists" :key="index" v-if="list.data[0]">
						<view class="tui-list-cell-divider" :id="index === 0 ? 'suoyin' : list.letter">
							{{list.letter}}
						</view>
						<view class="tui-list-cell" hover-class="tui-list-cell-hover" v-for="(item,index2) in list.data" :key="index2"
						 @tap="selectCity" :data-name="item.cityName" :hover-stay-time='150'>
							<view class="tui-list-cell-navigate" :class="[list.data.length-1==index?'last':'']">
								{{item.cityName}}
							</view>
						</view>
					</block>
				</view>
			</view>
		</scroll-view>
		<view class="tui-indexed-list-bar" :style="{height:indexBarHeight+'px'}" @touchstart="touchStart" @touchmove.stop="touchMove"
		 @touchend.stop="touchEnd" @touchcancel.stop="touchCancel" v-if="!inputVal">
			<text v-for="(items,index) in lists" :key="index" class="tui-indexed-list-text" :style="{height:indexBarItemHeight+'px'}">
				{{index==0?"索引":items.letter}}
			</text>
		</view>
		<view class="tui-indexed-list-alert" v-if="touchmove && lists[touchmoveIndex].letter">
			{{lists[touchmoveIndex].letter}}
		</view>
	</view>
</template>

<script>
	const cityData = require('../../../public/js/city.js')
	import tuiIcon from "xiaozhu/uniapp/thorui/components/icon/icon"
	export default {
		components: {
			tuiIcon
		},
		data() {
			return {
				formAction: '/city',
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				mpType: 'page', //用来分清父和子组件
				lists: [],
				touchmove: false, // 是否在索引表上滑动
				touchmoveIndex: -1,
				titleHeight: 0, // 索引二字距离窗口顶部的高度
				indexBarHeight: 0, // 索引表高度
				indexBarItemHeight: 0, // 索引表子项的高度
				scrollViewId: '', // scroll-view滚动到的子元素的id
				winHeight: 0,
				inputShowed: false, // 输入框是否显示
				inputVal: '', // 搜索框输入的内容
				hotCity: ['北京', '上海', '广州', '深圳', '杭州', '长沙', '武汉', '厦门', '西安', '昆明', '成都', '重庆'], // 热门城市
				searchResult: [], // 搜索城市的结果
				localCity: ''
			}
		},
		onLoad: function(options) {
			const that = this;
			that.localCity = uni.getStorageSync('city');;
			setTimeout(() => {
				uni.getSystemInfo({
					success: function(res) {
						let winHeight = res.windowHeight
						let barHeight = winHeight - uni.upx2px(204);
						that.winHeight = winHeight;
						that.indexBarHeight = barHeight;
						that.indexBarItemHeight = barHeight / 25;
						that.titleHeight = uni.upx2px(132);
						that.lists = cityData.list
					}
				})
			}, 50)
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			},
			showInput() {
				this.inputShowed = true
			},
			clearInput() {
				this.inputVal = "";
				this.inputShowed = false;
				this.searchResult = [];
				uni.hideKeyboard() //强行隐藏键盘
			},
			inputTyping(e) {
				this.inputVal = e.detail.value;
				this.searchCity()
			},
			// 搜索城市
			searchCity() {
				let result = []
				cityData.list.forEach((item1, index1) => {
					item1.data.forEach((item2, index2) => {
						if (item2.keyword.indexOf(this.inputVal.toLocaleUpperCase()) !== -1) {
							result.push(item2.cityName)
						}
					})
				})
				this.searchResult = result
			},
			// 选择城市
			selectCity(e) {
				let cityName = e.currentTarget.dataset.name;
				//返回并刷新上一页面
				let canPush = false;
				this.data.city.forEach(msg=>{
					if(msg.name == cityName){
						canPush = true;
					}
				});
				if(!canPush){
					this.getError("该城市还没有开通");
					return false;
				}
				 uni.setStorageSync('city', cityName);
				 this.updateHistory();
				 this.back();
				// this.$eventHub.$emit('emit', cityName)
				// uni.navigateBack({
				// 	delta: 1
				// })
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index === 0 ? 1 : index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index === 0 ? 1 : index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			}
		}
	}
</script>
<style scoped="">
@import url('index.css')
</style>