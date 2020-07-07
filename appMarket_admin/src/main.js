import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import '@/styles/custom.scss'
import '@/styles/iconfont.css'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

//xiaozhu start
import globalJs from 'xiaozhu/js/global.js' //引入自定义方法
Vue.use(globalJs)
import 'xiaozhu/wechatapp/css/flex.css'
import  './utils/weui.css' //引入自定义方法
import message from 'xiaozhu/vue/packages/admin/message.js' //引入自定义方法
Vue.use(message)
import myfunxiaozhu from 'xiaozhu/vue/packages/admin/myfun.js' //引入自定义方法
Vue.use(myfunxiaozhu)
import axios from 'axios'
Vue.prototype.$http = axios
import ajax from 'xiaozhu/vue/packages/admin/ajax.js' //引入自定义方法
Vue.use(ajax)
let domain = document.domain;
if (domain == "localhost" || domain == "192.168.1.107") {
    localStorage.setItem("siteName", 'https://appMarket.doxinsoft.com');
} else {
    localStorage.setItem("siteName", 'https://' + domain );
}
import myupload from 'xiaozhu/vue/components/admin/uploadPic.vue';
Vue.component(
    'my-upload',
    myupload
);

//xiaozhu end

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

import tytrock from '@/components/Tytrock/components' //引入自定义组件
Vue.use(tytrock);

import myfun from './utils/myfun.js' //引入自定义方法
Vue.use(myfun)

import tytFun from '@/components/Tytrock/js/fun.js' //引入自定义方法
Vue.use(tytFun)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
