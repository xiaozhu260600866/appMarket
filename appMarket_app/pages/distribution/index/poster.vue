<template>
	<view>
		<canvas :style="'width: '+width+'px; height: '+height+'px;'" canvas-id="firstCanvas"></canvas>
		<image src="/static/pro02.jpg" @load="imageLoad" hidden></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			posterShow:true,
			width: 375,
			height: 600,
			images:[],
			title: '将海报发给好友，推广有回报',
			username: '东信科技',
			remark: '最新资讯，与你共享',
			reminder: '长按图片保存到相册'
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success:res=> {
				this.width = res.windowWidth
				this.height = res.windowHeight
				//this.height = res.screenHeight;
			}
		});
	},
	methods: {
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
			ratio = $width / $height; //图片的真实宽高比例
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			let ctx = uni.createCanvasContext('firstCanvas')
			
			//标题背景
			ctx.setFillStyle('#fff')
			ctx.fillRect(0, 0, 0, 60)
			
			//标题
			ctx.setFontSize(16)
			ctx.setFillStyle('#999')
			ctx.fillText(this.title, viewWidth/2-this.title.length*8, 35)
			
			//广告图
			ctx.drawImage('../../../static/pro02.jpg', 0, 60, viewWidth, viewHeight)
			
			//脚部背景
			ctx.setFillStyle('#fff')
			ctx.fillRect(0, viewHeight+60, viewWidth, 170)
			
			// 头像
			ctx.drawImage('../../../static/logo.png', 50, viewHeight+85, 70, 70)
			ctx.drawImage('../../../static/prohead-bg.png', 50, viewHeight+85, 70, 70)
			
			//昵称
			ctx.setFontSize(16)
			ctx.setFillStyle('#333')
			ctx.fillText(this.username, 170/2-this.username.length*8, viewHeight+180)
			
			//备注
			ctx.setFontSize(12)
			ctx.setFillStyle('#666')
			ctx.fillText(this.remark, 170/2-this.remark.length*6, viewHeight+202)
			
			//二维码
			ctx.drawImage('../../../static/qrcode-k.jpg', viewWidth-150, viewHeight+80, 110, 110)
			
			//指纹
			ctx.drawImage('../../../static/fingerprint.png', viewWidth/2-this.reminder.length*9-30, viewHeight+250, 20, 20)
			
			//提示
			ctx.setFontSize(18)
			ctx.setFillStyle('#333')
			ctx.fillText(this.reminder, viewWidth/2-this.reminder.length*9, viewHeight+265)
			
			// //商家名称
			// ctx.setFontSize(20)
			// ctx.setFillStyle('#F17E2A')
			// ctx.fillText('大牛时间', 130, viewHeight+55)
			
			// //长按扫码抢优惠
			// ctx.setFontSize(13)
			// ctx.setFillStyle('#333')
			// ctx.fillText('长按扫码抢优惠', 130, viewHeight+80)
		
			ctx.draw();
			
		},
	}
}
</script>