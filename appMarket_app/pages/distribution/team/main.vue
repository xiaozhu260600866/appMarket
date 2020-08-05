<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
		<div id="scroller">
			<div class="order-classify bgf mb8">
				<p :class="['nav-tab',lev == 0 ? 'selected' :'']" @click="changeLev(0)">一级({{ data.dis.downCount.one }})</p>
				<p :class="['nav-tab',lev == 1 ? 'selected' :'']" @click="changeLev(1)">二级({{ data.dis.downCount.two }})</p>
			</div>
			<div class="team-header fs-12 fc-9 plr15 ptb3">
				<p>成员信息</p>
				<p>TA的佣金/成员</p>
			</div>
			<div class="order-list mb8 bgf" v-for="item in data.lists">
				<div class="tInfo plr15 ptb10">
					<div class="img pr10">
						<image :src="item.heder_img" />
					</div>
					<div class="rInfo">
						<div class="group fs-15">
							<p>{{item.name}}</p>
							<p>收益：
								<span class="Arial fc-color">{{item.amount}}</span>
							</p>
						</div>
						<div class="group fs-12 fc-9">
							<p class="Arial">{{item.created_at}}</p>
							<p><span class="Arial">{{item.member}}</span>个成员</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hasMore :parentData="data" source="nodata"></hasMore>
	</section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/dis/team',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lev:0,
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{lev:this.lev}).then(msg => {
					console.log(this.data);
				});
			},
			changeLev: function(lev) {
				this.lev = lev;
				this.ajax();
			},
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>