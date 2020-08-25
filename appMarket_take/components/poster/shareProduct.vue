<template>
	<section v-if="shareDiv">
		<div class="pshare-float text-center bg-f pb10" v-if="data.product.firstDisPrice.price !='该商品不参加分销' && data.dis && data.product.poster_cover"><!-- v-if="data.product.is_share_distribution && data.product.poster_cover" -->
			<p class="ficon iconfont icon-off fs-12 fc-white" @click="shareDiv = false"></p>
			<p class="ftitle fs-12 fc-white shop-bg lh-22">会员分享</p>
			<p class="fprice fs-12 fc-red ptb10">返<span class="Arial">￥{{data.product.firstDisPrice.price}}</span></p>
			<p class="fs-10 mtb5">下单即得佣金</p>
			<div class="mlr10 fbtn"><button class="dx-btn-sm dx-btn-red fs-12" @click="shareBtn = true">立即分享</button></div>
		</div>
		<div class="" v-if="shareBtn == true">
			<div class="share-overlay"></div>
			<div class="pshare-dig">
				<div class="pshare-group">
					<button hover-class="none" class="group-item p0" open-type="share">
						<p class="iconfont icon-pshare-wechat"></p>
						<p class="words">发送好友</p>
					</button>
					<div class="group-item" @click="loadImg(data)" v-if="data.product.poster_cover">
						<p class="iconfont icon-pshare-save"></p>
						<p class="words">保存海报</p>
					</div>
				</div>
				<div class="cancel-btn" @click="shareBtn = false">取消</div>
			</div>
		</div>
		<div>
			<image :src="proposterBg" hidden @load="imageLoad" data-index="0" >
		<!-- 	<image :src="proposterBg" v-if="tempFilePath" :style="'width: '+images[0].width+'px; height: '+images[0].height+'px;'" ></image> -->
			<canvas :style="'width: '+width_+'px; height: '+height+'px;left:-1300px'" canvas-id="firstCanvas" v-if="!img" ></canvas>
		</div>
		
	</section>
</template>
<script type="text/javascript">
	export default{
		props:["data","posterFilePath","proposterBg","qrcodeFilePath","fingerprint"],
		data(){
			return {
				shareBtn:false,
				height:0,
				shareDiv:true,
				images: [],
				show:false,
				width_:0,
				img:'',
				getSiteName: this.getSiteName(),
			}
		},
		mounted(){
			uni.getSystemInfo({
				success: (res) => {
					this.width_ = res.windowWidth
					this.height = res.windowHeight
				}
			})
		},
		methods: {
			imageLoad(e) {
				console.log("iac");
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width_, //如:375 i6屏宽
					viewHeight = this.width_ / ratio; //计算的高度值
				var image = [];
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image[e.target.dataset.index] = {
					width: viewWidth,
					height: viewHeight
				}
				console.log(image);
				this.images = image;
				
				//广告图
				var ctx = uni.createCanvasContext("firstCanvas",this)
				ctx.drawImage(this.proposterBg, 0, 0, this.width_, this.images[0].height)
				ctx.drawImage(this.posterFilePath, 42, 118, this.width_-84, this.width_-84)
				
				this.height = this.images[0].height + 120 ;
				
				//脚部背景
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, this.images[0].height, this.width_, 120)
				
				//二维码
				ctx.drawImage(this.qrcodeFilePath, 40, this.images[0].height+20, 80, 80)
				console.log(this.fingerprint)
				//指纹识别
				ctx.drawImage(this.fingerprint, this.width_-120, this.images[0].height+20, 60, 60)
				
				// 提示
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText('长按识别小程序码', this.width_-140, this.images[0].height+96)
				ctx.draw();
				setTimeout(()=>{
					uni.canvasToTempFilePath({
						canvasId:"firstCanvas",
						success:res=> {
							this.img = res.tempFilePath;
						},
						fail:res=>{
						}
					},this)
				},1000);
			

				
			},
			loadImg(data){
				this.shareBtn = false;
				this.open();
			},
			open() {
				
				uni.previewImage({
					current: this.img, // 当前显示图片的http链接
					urls: [this.img] // 需要预览的图片http链接列表
				})
			},
			ajax(msg) {
				console.log(msg);
				this.product = msg.product;
				this.dis = msg.dis;
				wx.downloadFile({
					url:this.getSiteName+'/upload/images/product/'+msg.product.poster_cover,
					success:res=>{
						this.posterFilePath = res.tempFilePath;
						this.show = true;
						console.log(this.posterFilePath);
						console.log(108);
					},
					fail:res=>{
						console.log(res);
					}
				});
				
			}
		},
	}
</script>
<style type="text/css" scoped="">

/* 分享浮动 */
.pshare-float{position: fixed;right: 10px;bottom: 85px;border-radius: 6px;min-width: 100px;box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);-webkit-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);-moz-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);z-index: 100;}
.pshare-float:before{content: "";display: block;position: absolute;right: 8px;top: -12px;height: 12px;width: 1px;background-color: rgba(0, 0, 0, 0.4);}
.pshare-float .ficon{position: absolute;top: -30px;right: 0;background-color: rgba(0, 0, 0, 0.6);width: 18px;height: 18px;line-height: 18px;text-align: center;border-radius: 50%;}
.pshare-float .fprice{border-bottom: 1px #EE4543 dashed;}
.pshare-float .ftitle{border-radius: 6px 6px 0 0;}
.pshare-float .fbtn .dx-btn-sm{border-radius: 14px;}

.pshare-dig{position: fixed;width: 100%;background: #fff;left: 0;bottom: 0;z-index: 100;border-radius: 30px 30px 0 0;}
.pshare-dig .pshare-group{background: #F3F3F5;display: flex;padding: 40px 10%;border-radius: 30px 30px 0 0;}
.pshare-group .group-item{width: 100%;text-align: center;background: transparent;}
.pshare-group .group-item .iconfont{font-size: 50px;line-height: 60px;}
.pshare-group .group-item .words{font-size: 13px;color: #666;padding-top: 10px;line-height: 20px;}
.pshare-dig .cancel-btn{height: 50px;line-height: 50px;color: #666;text-align: center;font-size: 15px;}

</style>