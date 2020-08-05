<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="show">
			 <view class="share-qrcode">
				<view class="qrcode-info">
					<view class="center-ad">
						<image src="https://boss.doxinsoft.com/images/app/qrcode-ad.jpg" mode="widthFix"  class="image"/>
					</view>
					<view class="shead-info">
						<image :src="data.getUser.avatarUrl" />
						<view class="shead-name">
							<view class="p">我是
								<text>{{data.getUser.nickName}}</text>
							</view>
							<view class="p">我为
								<text>{{ data.siteConfig.web_name }}</text>代言
							</view>
						</view>
						<view class="clear"></view>
					</view>
					<view class="qrcode">
						<view class="p">
							<image class="image" :src="getSiteName+'/upload/images/dis/'+data.distribution.id+'.jpg'" v-if="data.distribution" @click="previewImage(data.distribution.id+'.jpg','dis')" />
						</view>
						<view class="p1">长按识别小程序<br>开启您的购物之旅</view>
					</view>
					<view id="footer-btn"><view class="f-dx-btn dx-btn-blue text-center" @click="poster">生成海报</view></view>
				</view>
			</view> 
			<canvas :style="'width: '+width+'px; height: '+height+'px; left:-1300px'" canvas-id="firstCanvas"  v-if="!tempFilePath"  ></canvas>
			<image :src="share_logo" @load="imageLoad" hidden v-if="share_logo"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/dis',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				posterShow:true,
				show:false,
				tempFilePath:'',
				disFile:'',
				width: 375,
				height: 530,
				share_logo:'',
				images:[]
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
			uni.getSystemInfo({
				success:res=> {
					this.width = res.windowWidth
					this.height = res.windowHeight
					//this.height = res.screenHeight;
				}
			});
			this.ajax();
		},
		methods: {
			imageLoad(e){
				var $width = e.detail.width, //获取图片真实宽度
				$height = e.detail.height,
				ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width, //如:375 i6屏宽
				viewHeight = this.width / ratio; //计算的高度值
				
				
				let ctx = uni.createCanvasContext('firstCanvas')
				//console.log('w:'+viewWidth + 'h:'+viewHeight);
				//广告图
				ctx.drawImage(this.share_logo ? this.share_logo : '../../../../static/fenxiaobg.jpg', 0, 0, viewWidth, viewHeight)
				
				this.height = viewHeight + 130 ;
				
				
				
				//脚部背景
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, viewHeight, viewWidth, 130)
				
				//二维码
				
				if(this.disFile)ctx.drawImage(this.disFile, 15, viewHeight+15, 100, 100)
				
				// // 文字背景
				// ctx.setFillStyle('rgba(0, 0, 0, 0.65)')
				// ctx.fillRect(viewWidth/2-100, viewHeight+225, 200, 30)
				
				
				//商家名称
				ctx.setFontSize(20)
				ctx.setFillStyle('#F17E2A')
				ctx.fillText(this.data.distribution.name, 130, viewHeight+55)
				
				
				//长按扫码抢优惠
				ctx.setFontSize(13)
				ctx.setFillStyle('#333')
				ctx.fillText('长按扫码抢优惠', 130, viewHeight+80)
			
				
				ctx.draw();
				//生成图片
				setTimeout(()=>{
					uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success:res=> {
						console.log(res);
						this.tempFilePath = res.tempFilePath;
					},
					fail:res=>{
						console.log(res);
					}
				})
				},200)
				
			},
			poster(){
				uni.previewImage({
					current: this.tempFilePath, // 当前显示图片的http链接
					urls: [this.tempFilePath] // 需要预览的图片http链接列表
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					wx.downloadFile({
						url:this.getSiteName+'/upload/images/dis/'+this.data.distribution.id+'.jpg',
						success:res=>{
							this.disFile = res.tempFilePath;
						}
					});
					if(msg.shareLogo){
						wx.downloadFile({
							url:msg.shareLogo,
							success:res=>{
								this.share_logo = res.tempFilePath;
								this.show = true;
							}
						});
					}else{
						this.show = true;
					}
				});
			}
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>