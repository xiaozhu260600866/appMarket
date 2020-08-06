<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="weui-cells ass-pro mt0 p10">
				<!-- 循环开始 -->
				<div class="weui-cell mb10 bgf proItem" v-for="v in data.lists.data" @click="goto('/pages/shop/group/show/index?id='+v.id,1 )">
					<div class="weui-cell__hd proImg mr15">
						<image class="img" :src="v.firstCover" mode="aspectFill" />
					</div>
					<div class="weui-cell__bd proInfo">
						<p class="title fs-14">{{ v.name }}</p>
						<p class="price fs20 pt5 pb8">￥{{ v.group_price }}<span class="fs-12 fc-9 pl10">原价{{ v.price }}</span></p>
						<div class="count">
							<p class="fs-12 fc-9">已拼<span class="Arial">{{ v.self_num_ }}</span>件</p>
							<button hover-class="none" class="m0 dx-btn-sm plr25 dx-btn-orange">去开团</button>
						</div>
					</div>
					<div class="people Arial">{{ v.group_num }}人拼</div>
				</div>
				<hasMore :parentData="data"></hasMore>
			
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/group-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
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
		onLoad(options) {
			this.ajax();
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