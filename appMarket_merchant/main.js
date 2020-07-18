

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

import floatBtn from 'xiaozhu/uniapp/components/floatBtn'
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

import 'socket.js';




uni.setStorageSync('siteName', 'https://appMarket.doxinsoft.com');
wx.setStorageSync('site_name', 456);
uni.removeStorageSync('jsdk');
uni.removeStorageSync('distribution');
uni.removeStorageSync('ztd');
uni.removeStorageSync('proid');
uni.removeStorageSync('unionid')


//uni.setStorageSync('openid', 'ohOO94sLnnf0bzJpqFqigfNxLSto');
App.mpType = 'app'



const app = new Vue({
	...App
})
app.$mount()
