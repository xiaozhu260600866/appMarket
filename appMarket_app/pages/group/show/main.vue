<template>
	<view>
		<page :parentData="data" :formAction="formAction">	</page>
		<view>
			<view class="show_banner bg-f">
				<myswiper id="arrowTop" :tbPadding="0" :lrPadding="0" :bdR="0" :data="[
					{cover: '/static/pro01.jpg'},
					{cover: '/static/pro02.jpg'}
				]" purl="product"></myswiper>
			</view>
			
		</view>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import shareProduct2 from "@/components/poster/shareProduct";
	import sharePic from "@/components/poster/sharePic.vue";
	import leftTime from "./layouts/left_time";
	import info from './layouts/info'
	export default {
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				qrcodeFilePath:'',
				posterFilePath:'',
				proposterBg: '',
				tempFilePath:'',
				getSiteName: this.getSiteName(),
				num: 1,
				showEvaluate: false,
				keepAlive: false,
				productFirstCover:'',
				showType: '',
				show:false,
				intoView: '',
				shareDiag: false,
				proshareBg:'',
				fingerprint:'',
				prodheadBg:'',
				rule_type: 0,
				videoUrl:'',
				otherData: {
					card_user_id: ''
				},
			}
		},
		onReachBottom() {
			console.log('123');
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			if(this.data.product.is_group || this.data.product.is_miaosha){
				this.data.query.shareImg = this.$refs.sharePic.getImg();
			}
			console.log(this.data.query);
			return this.shareSource(this, this.data.product.name,'notShareSource');
		},
		onLoad(options) {
			//this.getMyAddress(this);
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.product.video_url){
						this.getQQvideoLink(msg.product.video_url,msg=>{
							this.videoUrl = msg.url;
						});
					}
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
						success:res=>{
							this.posterFilePath = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/proshare-bg03.png',
						success:res=>{
							this.proshareBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/prohead-bg.png',
						success:res=>{
							this.prodheadBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.data.product.firstCover,
						success:res=>{
							this.productFirstCover = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/proposter-bg.jpg',
						success:res=>{
							this.proposterBg = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/images/site/fingerprint.png',
						success:res=>{
							this.fingerprint = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
						success:res=>{
							this.posterFilePath = res.tempFilePath;
							
						},
						fail:res=>{
							console.log(res);
						}
					});
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/dis/p'+msg.product.id+'.jpg',
						success:res=>{
							this.qrcodeFilePath = res.tempFilePath;
							this.show = true;
						}
					});
				});
			},
			addCart() {
				this.$store.state.mutations.cart = true;
				this.$refs.productInfo.showType = 'addCart';
				if (this.data.infoArr.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.product.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			infoCallBack(cartNum) {
				this.data.cartNum = cartNum;
			},
			toBuy(group_id, is_group) {
				if (is_group && !this.data.product.canGorupBuy) {
					this.getError('活动已结束');
					return false;
				}
				this.$refs.productInfo.showType = '';
				if (this.data.infoArr.length > 0) {
					this.$refs.productInfo.group_id = group_id;
					this.$refs.productInfo.is_group = is_group;
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					if (group_id) {
						this.$refs.productInfo.addCartAjax({
							id: this.data.product.id,
							num: this.num,
							is_info: 0,
							group_id: group_id,
							is_group: is_group
						});
					} else {
						this.$refs.productInfo.addCartAjax({
							id: this.data.product.id,
							num: this.num,
							is_info: 0,
							is_group: is_group
						});
					}
				}
			},
			addUserCollection() {
				let product_id = this.data.product.id;
				let url = "/shop/product/collection";
				if (this.data.collections) return false;
				this.postAjax(url, {
					id: product_id
				}, msg => {
					if (msg.data.status == 2) {
						this.data.collections = 1;
					}
				});
			}
		},
		components: {
			uParse,
			info,
			leftTime,
			shareProduct2,
			sharePic

		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>