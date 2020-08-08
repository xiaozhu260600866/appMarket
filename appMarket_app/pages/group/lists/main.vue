<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="ass-pro p10">
				<!-- 循环开始 -->
				<view class="weui-cell mb10 bg-f bdr6 proItem" v-for="v in data.lists.data" @click="goto('/pages/group/show/main?id='+v.id,1 )">
					<view class="weui-cell__hd proImg mr15">
						<image class="img" :src="v.firstCover" mode="aspectFill" />
					</view>
					<view class="weui-cell__bd proInfo">
						<view class="title fs-14">{{ v.name }}</view>
						<view class="price fs-20 pt5 pb8"><text class="fs-14">￥</text>{{ v.group_price }}<text class="fs-12 fc-9 pl10">原价{{ v.price }}</text></view>
						<view class="count">
							<view class="fs-12 fc-9">已拼<text class="Arial">{{ v.self_num_ }}</text>件</view>
							<button hover-class="none" class="m0 dx-btn-sm plr25 dx-btn-orange">去开团</button>
						</view>
					</view>
					<view class="people Arial">{{ v.group_num }}人拼</view>
				</view>
				<hasMore :parentData="data"></hasMore>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/group-lists',
				mpType: 'page', //用来分清父和子组件
				// data: this.formatData(this),
				getSiteName: this.getSiteName(),
				data:{
					lists:{
						data:[{
							firstCover: '/static/pro02.jpg',
							name: '新鲜芒果',
							group_price: 6.6,
							price: 10,
							self_num_: 263,
							group_num: 2
						}]
					}
				}
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
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