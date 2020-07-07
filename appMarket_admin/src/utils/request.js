import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

import encry from '@/utils/encry.js' //引入加密自定义方法

//var loadingInstance;
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {'Content-Type': 'application/json;charset=UTF-8',},

  // 用于请求之前对请求数据进行操作
  // 只用当请求方法为‘PUT’，‘POST’和‘PATCH’时可用
  // 最后一个函数需return出相应数据
  // 可以修改headers
  transformRequest: [function (data) {

      // 可以对data做任何操作
      data = data?data:{}
      delete data.sign;
      console.log(data)
      if (store.getters.token) data.token = store.getters.token;
      if (store.getters.client_id) data.client_id = store.getters.client_id;
      data.apiId = process.env.VUE_APP_API_ID;

      let newData = data;
      newData.apiSecret = process.env.VUE_APP_API_SECRET;
      let arr=[];
      for(var key in newData){
      	arr.push(key)
      }
      arr.sort();
      let str='';
      for(var i in arr){
      	str +=arr[i]+newData[arr[i]]
      }
      str = encry.sha1(str);
      let sign = str.toUpperCase();
      data.sign = sign;
      delete data.apiSecret;

      let resData = new FormData()
      for (const key of Object.keys(data)) {
        var val = data[key]===null?'':data[key];
        resData.append(key, val)
      }
      //console.log(typeof resData)
      return resData
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    //loadingInstance = Loading.service({fullscreen:false,lock:false,text:'操作中'});
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //console.log("request token")
      //console.log(store.getters.token)
      //config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {


    // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。
    var token = response.headers.authorization
    if (token) {
      let tokenArr = token.split(" ");
      token = tokenArr[tokenArr.length-1];
        // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
        store.dispatch('user/refreshToken', token)
    }

    const res = response.data

    //console.log(loadingInstance)
    //loadingInstance.close();

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    //如果服务端返回401，则退出
    if(error.response.status === 401){
      return store.dispatch('user/out')
    }
    Message({
      message: '服务错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
