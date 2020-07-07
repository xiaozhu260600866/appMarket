<template>
	<div>
		<canvas :style="'width: '+width_+'px;height: '+height+'px;left:-1300px'" :canvas-id="canvasId" v-if="!img"></canvas><!-- v-if="!img" -->
		<img :src="proshareBg" hidden @load="imageLoad2" data-index="0" v-if="canShow">
		<img :src="productFirstCover" hidden @load="imageLoad3" data-index="0" >
	</div>
</template>

<script>
	
	export  default{
		mounted(){
			uni.getSystemInfo({
				success: (res) => {
					this.width_ = res.windowWidth
					this.height = res.windowHeight
				}
			})
		},
		data(){
			return {
				shareShow:false,
				width:0,
				height:0,
				firstCoverWidth:0,
				firstCoverHeight:0,
				width_:0,
				img:'',
				canShow:false,
				canvasId:'firstCanvas2'
			}
		},
		props:['proshareBg','data','productFirstCover'],
		methods:{
			getImg(){
				return this.img;
			},
			imageLoad3(e){
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
					
				var viewWidth = this.width_, //如:375 i6屏宽
					viewHeight = this.width_ / ratio; //计算的高度值
				var image = {};
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image = {
					width: viewWidth,
					height: viewHeight
				}
				this.firstCoverWidth = image.width;
				this.firstCoverHeight = image.height;
				this.canShow = true;
			},
			imageLoad2(e) {
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
					
				var viewWidth = this.width_, //如:375 i6屏宽
					viewHeight = this.width_ / ratio; //计算的高度值
				var image = {};
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image = {
					width: viewWidth,
					height: viewHeight
				}
				console.log({width:$width,heigth:$height,ratio:ratio});
				console.log(image);
				console.log("firstCoverWidth"+this.firstCoverWidth);
				console.log("firstCoverHeight"+this.firstCoverHeight);
				
				//广告图
				var ctx2 = uni.createCanvasContext(this.canvasId,this)
				
				//背景
				ctx2.setFillStyle('#fff')
				ctx2.fillRect(0, 0, this.width_, image.height)
				
				if(this.firstCoverHeight/this.firstCoverWidth>=1){
					ctx2.drawImage(this.productFirstCover, this.width_/2-this.firstCoverWidth*(image.height/this.firstCoverHeight)/2, 0, this.firstCoverWidth*(image.height/this.firstCoverHeight), image.height)
				}
				else{
					ctx2.drawImage(this.productFirstCover, 0, 0, this.width_, this.firstCoverHeight*(this.width_/this.firstCoverWidth))
				}
				ctx2.drawImage(this.proshareBg, 0, 0, this.width_, image.height)
				
				this.height = image.height ;
				
				//￥
				ctx2.setFontSize(16)
				ctx2.setFillStyle('#fce14c')
				ctx2.fillText('￥', 13, image.height-15)
				
				//售价
				ctx2.setFillStyle('#fce14c')
				ctx2.font='bold 30px Arial'
				
				if(this.data.product.is_group){
					ctx2.fillText(this.data.product.group_price, 30, image.height-15)
					
					//原价
					// ctx2.setFontSize(15)
					ctx2.setFillStyle('#fff')
					ctx2.font='15px Arial'
					ctx2.fillText('￥'+this.data.product.price, this.data.product.price.length*12+42, image.height-15)
					
					//删除线
					ctx2.setFillStyle('#fff')
					ctx2.fillRect(this.data.product.price.length*12+42,image.height-21, this.data.product.price.length*11, 1)
					
				}else if(this.data.product.is_miaosha){
					ctx2.fillText(this.data.product.miaosha_price, 30, image.height-15)
					
					//原价
					// ctx2.setFontSize(15)
					ctx2.setFillStyle('#fff')
					ctx2.font='15px Arial'
					ctx2.fillText('￥'+this.data.product.price, this.data.product.price.length*12+42, image.height-15)
					
					//删除线
					ctx2.setFillStyle('#fff')
					ctx2.fillRect(this.data.product.price.length*12+42,image.height-21, this.data.product.price.length*11, 1)
				}else{
					ctx2.fillText(this.data.product.price, 30, image.height-15)
					
					//原价
					// ctx2.setFontSize(15)
					ctx2.setFillStyle('#fff')
					ctx2.font='15px Arial'
					ctx2.fillText('￥'+this.data.product.new_price, this.data.product.new_price.length*12+42, image.height-15)
					
					//删除线
					ctx2.setFillStyle('#fff')
					ctx2.fillRect(this.data.product.new_price.length*12+42,image.height-21, this.data.product.new_price.length*11, 1)
				}
				
				
				// let textWidth = this.strlen(this.data.product.price)
				// ctx.fillText(textWidth,  100, image.height-30)
				this.shareShow = true;
				ctx2.draw();
				setTimeout(()=>{
					uni.canvasToTempFilePath({
						canvasId:this.canvasId,
						success:res=> {
							this.img = res.tempFilePath;
						},
						fail:res=>{
						}
					},this)
				},1000);
			},
		}
	}
</script>

<style>
</style>
