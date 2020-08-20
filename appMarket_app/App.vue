<script>
	export default {
		onLaunch: function() {
			//#ifdef APP-PLUS  
			let that = this;
			var info = plus.push.getClientInfo();
			console.log(JSON.stringify(info));
			/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
			plus.push.addEventListener("click", function(msg) {
				console.log("10011")
				let bgAudioMannager = uni.getBackgroundAudioManager();
				
				
				bgAudioMannager.src = 'http://www.doxincn.com/orderComeIn.mp3';
				bgAudioMannager.play()
				//这里可以写跳转业务代码
			}, false);
			// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {
				// plus.ui.alert(2);  
				console.log("recevice1:" + JSON.stringify(msg))
				console.log(msg);
				// that.postAjax("/text").then(msg2=>{
					
				// });
				if(msg.payload ){
					console.log("进来这里1");
					console.log(msg.payload);
					 if(typeof(msg.payload) == 'string'){
						  var v = JSON.parse(msg.payload)
					 }else{
						 var v = msg.payload
					 }
					 let bgAudioMannager = uni.getBackgroundAudioManager();
					 bgAudioMannager.src = v.voice;
					 bgAudioMannager.play()
					 console.log(plus.os.name);
					 if (plus.os.name == 'iOS') { //如果是IOS
						 if (msg.type == "receive") {   
							//plus.push.createMessage(v.content, v.content, {title: v.content}); 
						 }
					 }else{
						 plus.push.createMessage(v.content, v.content, {title: v.content});
					 }  
				}
				if(msg.aps && msg.aps.category ){
					console.log("进来这里3");
					 var v = JSON.parse(msg.aps.category);
				     let bgAudioMannager = uni.getBackgroundAudioManager();
				     bgAudioMannager.src =v.voice;
				     bgAudioMannager.play()
					 if (plus.os.name == 'iOS') { //如果是IOS
						 if ( msg.type == "receive") {   
							//plus.push.createMessage(v.content, v.content, {title: v.content}); 
						 }
					 }else{
					 	plus.push.createMessage(v.content, v.content, {title: v.content});
					 } 
				 }
				 
				
			}, false);
			//#endif 


		},
		onShow: function() {


		},
		onHide: function() {

		}
	}
</script>

<style>
	@import url('@/public/css/app.css');
	@import url('doxinui/css/global_upx.css');
	@import url('doxinui/css/global_icon.css');
	@import url('@/public/weui/weui.css');
	@import url('@/public/font/iconfont.css');


	/*每个页面公共css */
	/*  #ifdef  MP-WEIXIN */
	/*  #endif  */

	/*  #ifdef  H5 */
	.btn {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

	.class-left,
	.class-right {
		top: 94px !important;
		bottom: 50px !important;
	}

	uni-tabbar,
	uni-tabbar .uni-tabbar {
		z-index: 99 !important;
	}
	uni-tabbar .uni-tabbar-border{
		background-color: transparent!important;
	}

	.list-group .group-item uni-input input {
		height: 32px !important;
		line-height: 32px !important;
	}

	#footer-btn section,
	#footer section {
		width: 100%;
	}

	.recharge-cells {
		padding: 0 15px !important;
	}

	/*  #endif  */

	/* #ifdef MP-ALIPAY */
	/*  #endif  */
</style>
