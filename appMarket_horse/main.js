

import Vue from 'vue'
import App from './App'
import myfun from 'xiaozhu/uniapp/js/myfun.js' //引入自定义方法
import filter from 'xiaozhu/uniapp/js/filter.js' //引入自定义方法
import myfun2 from './public/js/myfun.js' //引入自定义方法
import ajax from 'xiaozhu/uniapp/js/ajax.js' //引入自定义方法
import message from 'xiaozhu/uniapp/js/message.js' //引入自定义方法
import date from 'xiaozhu/uniapp/js/date.js' //引入自定义方法
import vaildate from 'xiaozhu/uniapp/js/vaildate.js' //引入自定义方法

import store from './vuex/index.js'
Vue.prototype.$store=store;


//全局组件
import myswiper from 'doxinui/components/swiper/swiper'
Vue.component(
	'myswiper',
	myswiper
);
import page from '@/components/default'
Vue.component(
	'page',
	page
);
import hasMore from 'xiaozhu/uniapp/components/hasMore'
Vue.component(
	'hasMore',
	hasMore
);
import authorize from 'xiaozhu/uniapp/components/authorize'
Vue.component(
	'authorize',
	authorize
);
import weui_input from 'xiaozhu/uniapp/components/weui_input'
Vue.component(
	'weui-input',
	weui_input
);
import myform from 'xiaozhu/uniapp/components/myform'
Vue.component(
	'myform',
	myform
);
import diag from 'xiaozhu/uniapp/components/diag'
Vue.component(
	'diag',
	diag
);
import dxAddress from "xiaozhu/uniapp/components/addressAndCity";
Vue.component(
	'dx-address',
	dxAddress
);

import floatBtn from 'xiaozhu/wechatapp/components/floatBtn'
Vue.component(
	'floatBtn',
	floatBtn
);

import dxIcon from 'doxinui/components/icon/icon'
Vue.component(
	'dxIcon',
	dxIcon
);

import dxPrice from "doxinui/components/price/price"
Vue.component(
	'dxPrice',
	dxPrice
);

import dxButton from "doxinui/components/button/button"
Vue.component(
	'dxButton',
	dxButton
);

Vue.config.productionTip = false
Vue.use(myfun);
Vue.use(ajax);
Vue.use(myfun2);
Vue.use(message);
Vue.use(date);
Vue.use(filter);
Vue.use(vaildate);


import 'provider.js';


uni.setStorageSync('siteName', 'https://appMarket.doxinsoft.com');
wx.setStorageSync('site_name', 456);
uni.removeStorageSync('jsdk');
uni.removeStorageSync('distribution');
uni.removeStorageSync('ztd');
uni.removeStorageSync('proid');
//uni.setStorageSync('openid', 'ohOO94sLnnf0bzJpqFqigfNxLSto');
App.mpType = 'app'
	setInterval(()=>{
		uni.getLocation({
			// type: 'gcj02', // 返回国测局坐标
			geocode: true,
			success: res=>{
				uni.setStorageSync('latitude',res.latitude);
				uni.setStorageSync('longitude',res.longitude);
				Vue.prototype.postAjax("/horse/updateHorseLocation",{latitude:res.latitude,longitude:res.longitude},"notloing");
			},
			fail: function(e) {
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '获取地址失败, 请检查是否开启定位权限~~'
				// })
			}
		})
	},1000);
				
const app = new Vue({
	...App
})
app.$mount()
