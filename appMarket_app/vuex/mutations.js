import {
    AJAX,
    LOADMORE,
    CHANGESTATUS
} from './types'
import getters from './getters'

const state = {
    data: [], //ajax返回的全部数据
    hasMore: false,
    thisPage: 1,
    lastPage: 1,
    nextPage:1,
    lists: [],
    busy: false,
    status: 12,
    formAction: '',
    url:'',
    canLoadMore:true,
    getUser:wx.getStorageSync('userInfo')

};

const mutations = {
    [AJAX](state, msg) { /*ajax取参数*/
        state.data = msg;
        if ('lists' in msg) {
            if ('current_page' in msg.lists) {
                state.listData = msg.lists.data;
                state.thisPage = msg.lists.current_page;
                state.lastPage = msg.lists.last_page;
                if (state.thisPage < state.lastPage) {
                    //state.hasMore = "正在加载";
                     state.hasMore = "不显示";
                } else {
                   if( state.listData.length == 0){
                       state.hasMore = "暂无数据";  
                   }else{
                        state.hasMore = "不显示";
                   }
                }
                state.busy = false;
            }
              $(".weui-loadmore").remove();
        }

    },
    [LOADMORE](state, msg, busy) { /*加载分页*/
        state.thisPage = msg.lists.current_page;
        state.lastPage = msg.lists.last_page;
        for (var i = 0; i < msg.lists.data.length; i++) {
            state.listData.push(msg.lists.data[i]);
        }
        if (state.thisPage < state.lastPage) {
            state.hasMore = "正在加载";
        } else state.hasMore = "没有更多数据了"; 
        state.busy = false;
       
    },
    [CHANGESTATUS](state, msg) { /*改变状态*/
        state.data = msg;
        if ('lists' in msg) {
            if ('current_page' in msg.lists) {
                state.listData = msg.lists.data;
                state.thisPage = msg.lists.current_page;
                state.lastPage = msg.lists.last_page;
                if (state.thisPage < state.lastPage) {
                    state.hasMore = true;
                } else state.hasMore = false;
                state.busy = false;
            }
        }

    }
};

export default {
    state,
    mutations,
    getters
}