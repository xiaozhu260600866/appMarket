var userInfo = wx.getStorageSync('userInfo');
if (userInfo) {
	uni.connectSocket({
		url: 'wss://appmarket.doxinsoft.com/wss',
		success: res => {
			console.log("ok");
		}
	});
	uni.onSocketOpen(function(res) {
		console.log('WebSocket连接已打开！');

		//#ifdef APP-PLUS
		var info = plus.push.getClientInfo();
		var clientid = info.clientid
		//#endif
		//#ifdef H5
		var clientid = 'f5ce477bc2d8d5e1e1c3cdd2e059b924'
		//#endif
		let data = {
			clientid: clientid
		};
		data = JSON.stringify(data);
		setInterval(() => {
			uni.sendSocketMessage({
				data: data
			});
		}, 10000)
	});
	uni.onSocketError(function(res) {
		console.log('WebSocket连接打开失败，请检查1！11');
	});
	uni.onSocketMessage(function(res) {
		let obj = JSON.parse(res.data)
		if (obj.status == 2) {
			//订单到了音乐 start
			console.log(obj.content);
			if (obj.type == 'playVideo') {
				let bgAudioMannager = uni.getBackgroundAudioManager();
				bgAudioMannager.src = obj.url;
				bgAudioMannager.play()
			}
		}
	});
}
