const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.updateHistory = () => {
		Vue.prototype.updateUrl(["/pages/user/index/main", "/pages/index/main", "/pages/user/coupon/list/main",
			'/pages/user/cart/main', '/pages/user/index/main'
		]);
	}
	Vue.prototype.toProduct = (item) => {
		if(item.auto_group){
			return Vue.prototype.goto("/pages/group/show/main?id="+item.id,1);
		}else{
			return Vue.prototype.goto("/pages/product/show/main?id="+item.id,1);
		}
	}
	Vue.prototype.checkLogin=(url,type)=>{
			let userInfo  = uni.getStorageSync('userInfo');
			if(userInfo && userInfo.is_bing){
				if(url){
					return Vue.prototype.goto(url,type ? type :1);
				}else{
					return new Promise((resolve, reject) => {
						resolve();
					});
				}
				
			}else{
				uni.showToast({
				    title: '请先登录',
				    duration: 2000
				});
				return Vue.prototype.goto("/pages/user/login/main?shareSource=1");
			}
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
							// let userInfo = uni.getStorageSync('userInfo', userInfo);
							// if(userInfo){
							// 	userInfo.nickName = msg.data.nickname;
							// 	userInfo.avatarUrl = msg.data.headimgurl;
							// 	userInfo.openid= msg.data.openid;
							// }else{
							// 	let userInfo = {
							// 		nickName: msg.data.nickname,
							// 		//unionid: res.authResult.unionid,
							// 		avatarUrl: msg.data.headimgurl,
							// 		openid: msg.data.openid,
							// 	}
							// }
							//uni.setStorageSync('openid', res.authResult.openid);
							
							//uni.setStorageSync('userInfo', userInfo);
							//uni.setStorageSync('unionid', res.authResult.unionid);
							uni.setStorageSync('source', 'app');
							resolve(msg.data);

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
