const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.updateHistory = () => {
		Vue.prototype.updateUrl(["/pages/user/index/main", "/pages/index/main", "/pages/user/coupon/list/main",
			'/pages/user/cart/main', '/pages/user/index/main'
		]);
	}
	Vue.prototype.space=(lat1, lng1, lat2, lng2)=> {
      console.log(lat1, lng1, lat2, lng2)
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      return s  // 单位千米
    }
	Vue.prototype.wechatLogin = () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: res => {
					uni.request({
						url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.authResult.access_token + '&openid=' +
							res.authResult.openid,
						data: {},
						header: {
							//'custom-header': 'hello' //自定义请求头信息
						},
						success: (msg) => {
							uni.setStorageSync('openid', res.authResult.openid);
							let userInfo = {
								nickName: msg.data.nickname,
								unionid: res.authResult.unionid,
								avatarUrl: msg.data.headimgurl,
								openid: msg.data.openid,
							}
							uni.setStorageSync('userInfo', userInfo);
							uni.setStorageSync('unionid', res.authResult.unionid);
							uni.setStorageSync('source', 'app');
							resolve(userInfo);

						}
					});
					//console.log(res.authResult.openid);
				},
				fail: function(res) {
					console.log(1);
					console.log(JSON.stringify(res));
				},
				complete: res => {
					console.log(JSON.stringify(res));
				}
			});
		})
	}







}

export default myfun;
