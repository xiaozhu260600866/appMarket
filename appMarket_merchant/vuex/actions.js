import * as types from './types'
import mutations from './mutations'
export default {
  
  ajax:(commit,data)=>{
    /*清空数据*/
   /* let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length - 1] //获取当前页面的对象
    mutations.state.url = currentPage.route;*/
 
    if( mutations.state.url && data.url != mutations.state.url){
         mutations.state.data=[];
         mutations.state.nextPage=1;
    }
   
    let user = mutations.state.getUser;
    let nextPage = mutations.state.nextPage;
    if(nextPage){
        mutations.state.canLoadMore = false;
        mutations.state.thisPage = nextPage;
    }
    if(nextPage == 1){
         wx.showLoading({
            title: '加载中',
        })
    }
   
    let url = urlApendOpenid(data.url);
        wx.request({
        url: wx.getStorageSync('siteName') + url,
        method: data.method,
        data: data.data,
        header: {
            'Accept': 'application/json'
        },
        success: function(msg) {
            wx.hideLoading();
            if ("lists" in msg.data && "current_page" in msg.data.lists) { //判断是否有分页
                let lastPage = msg.data.lists.last_page;
                let nextPage = parseInt(msg.data.lists.current_page) + 1;
                mutations.state.nextPage = nextPage;
                if (lastPage >= nextPage) { //如果还有下一页
                    mutations.state.hasMore = true;
                } else {
                    mutations.state.hasMore = false;
                }
                if(nextPage > 2 ){
                    msg.data.lists.data.forEach((v, i) => {
                         mutations.state.lists.push(v);
                    });
                }else{
                   mutations.state.lists = msg.data.lists.data; 
                }

            }
            mutations.state.canLoadMore = true;
            mutations.state.url = data.url;

            if(nextPage <2){
                mutations.state.data = msg.data;  
            }
            data.fun(msg.data);
        }
    })

  }
}
function urlApendOpenid(url) {
    var openid = wx.getStorageSync('openid')
    var userinfo = wx.getStorageSync('userInfo');
    userinfo = JSON.stringify(userinfo);
    if (url.indexOf('?') != -1) {

        url += "&openid=" + openid + "&source=wechatapp&userinfo=" + userinfo
    } else {
        url += "?openid=" + openid + "&source=wechatapp&userinfo=" + userinfo
    }
    if (mutations.state.nextPage) {
        url += "&page=" +  mutations.state.nextPage;
    }
    return url;
}
