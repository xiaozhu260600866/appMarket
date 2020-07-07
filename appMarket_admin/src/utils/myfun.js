var rootElement = document.body;

var newElement = document.createElement("div");

newElement.id = "share-overlay";

//var newElementHtmlContent = document.createTextNode(share);
rootElement.appendChild(newElement);
var loading = '<div id="loadingToast" class="weui_loading_toast" style="display:none;">';
    loading+=' <div class="weui_mask_transparent"></div>';
    loading+=' <div class="weui_toast">';
    loading+=' <div class="weui_loading">';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_0"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_1"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_2"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_3"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_4"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_5"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_6"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_7"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_8"></div>';
    loading+='<div class="weui_loading_leaf weui_loading_leaf_9"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
    loading+='<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
    loading+='</div>';
    loading+='<p class="weui_toast_content">数据加载中</p>';
    loading+='</div>';
    loading+='</div>';
 $("body").append(loading);
const myfun = function() {};

myfun.install = (Vue, options) => {
    Vue.prototype.getTreeData = (data) => {        
        return getTreeData(data);
    }
    Vue.prototype.treeData2Single = (data) => {
        var a =treeData2Single(data);
        return a;
    }
    Vue.prototype.treeData2LevelStr = (data,v) => {        
        //var arr = treeData2Single(data);
        //console.log(123);
        //console.log(arr);
        return arr2LevelStr(data,v)
    }
    Vue.prototype.selectLists2IdStr = (data) => {        
        let idStr = "";
        for (let i = 0; i < data.length; i++) {
            idStr += data[i].id + ",";
        }
        return idStr;
    }
    Vue.prototype.getMath = (m, n) => {
        var num = Math.floor(Math.random() * (m - n) + n);
        return num;
    }
    Vue.prototype.getDate = (obj) => {
        return obj.getFullYear() + "-" + (obj.getMonth() + 1) + '-' + obj.getDate();
    }
    Vue.prototype.getNowDate = () => {
        var obj = new Date();
        return obj.getFullYear() + "-" + (obj.getMonth() + 1) + '-' + obj.getDate();
    }
    Vue.prototype.goto = function(url, openType) {
        if (openType && openType == 'navigate') {
            this.$store.commit('setTransition', 'turn-on');
        }
        this.$router.push({ path: url });
    }
    //取url其中一个参数
    Vue.prototype.getOptions = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var url = window.location.href;
        var r = url.substr(url.indexOf("?") + 1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    Vue.prototype.in_array = (search, array) => {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    }
    Vue.prototype.del_vuex = (item, index, that, action) => {
        if (!action) action = "/ajax/mydel";
        Vue.prototype.getConfirm("此操作将永久删除该文件, 是否继续?", () => {
            console.log(item);
            Vue.prototype.postAjax(action, { id: item.id, tablename: that.tableName }, msg => {
                that.data.lists.splice(index, 1);
                Vue.prototype.getSuccess("删除成功");
            });
        });
    }
    Vue.prototype.deleteAll = (that, action) => {
        if (!action) action = "/ajax/mydelall";
        let checkId = "";
        for (let i = 0; i < that.sels.length; i++) {
            checkId += that.sels[i].id + "|";
        }
        Vue.prototype.getConfirm("此操作将永久删除该文件, 是否继续?", () => {
            Vue.prototype.postAjax(action, { idstr: checkId, tablename: that.tableName }, msg => {
                that.data.token = Math.random() * 10;
                if( typeof that.ajax == "function"){
                    that.ajax();
                }else{
                    that.$parent.ajax();
                }

            });

        });
    }
    Vue.prototype.listsData = (that) => {
        return {
            total: 0,
            lists: [],
            //token: 10 * Math.random(),
            show: false,
            listLoading: true,
            //auth: Vue.prototype.authJson(),
            //query: getUrlArgObject(),
        }
    };
    Vue.prototype.listsDefault = (that) => {
        return {
            total: 0,
            lists: [],
            //token: 10 * Math.random(),
            show: false,
            listLoading: true,
            //auth: Vue.prototype.authJson(),
            //query: getUrlArgObject(),
        }
    };
    Vue.prototype.listQuery = (that,limit=10) => {
        return {
            page: 1,
            limit: limit
        }
    };
    Vue.prototype.queryDefault = (that,limit=10) => {
        return {
            page: 1,
            limit: limit
        }
    };


    Vue.prototype.orderStatusName = (status,name) => {
        let type = '';
        if(status==1) type = 'warning';
        if(status==3) type = 'success';
        if(status==0) type = 'info';
        return '<el-tag type="' + type + '">' + name + '</el-tag>';
    };

    Vue.prototype.amountFormat = (num) => {
        // 判断传进来的数字是否为非空数字
       if (!isNaN(parseFloat(num))) {
            var reg = /\./g
            var newNum = Number(Number(num).toFixed(2)).toLocaleString()
            // 判断转换后的数字是否带有小数
            if (reg.test(newNum)) {
                var numArr = newNum.split('.')
                // 判断小数点后数字长度为1，则自动补0
                numArr[1] = numArr[1].length === 1 ? numArr[1] + '0' : numArr[1]
                return numArr.join('.')
            } else {
                // 整数直接在后面补上0.00
                return newNum + '.00'
            }

        } else {
            return ''
        }
    };

    Vue.prototype.checkMoney = (rule, value, callback) => {
        if(!value) return callback(new Error('请输入金额'));
        var exp = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
        if(exp.test(value)) {
            callback();
        } else {
            callback(new Error('请输入正确的金额'));
        }
    };

}

function getTreeData(data){
  for(var i=0;i<data.length;i++){
    if(data[i].children.length<1){
      // children若为空数组，则将children设为undefined
      data[i].children=undefined;
    }else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);
    }
  }
  return data;
}
function treeData2Single(data){
  var res = [];
  for(var i=0;i<data.length;i++){
    var children = data[i].children;
    delete data[i].children;
    res.push(data[i]);
    if(children){
      res = res.concat(treeData2Single(children));
    }
  } 
  return res; 
}
function arr2LevelStr(arr,v){
    for(var i=0;i<arr.length;i++){
        if(arr[i].id == v){
            let resArr = [];
            resArr.push(arr[i].name);
            if(arr[i].fid>0){
                resArr.push(arr2LevelStr(arr,arr[i].fid));
            }
            resArr.reverse();
            return resArr.join(' / ');
        }
    };
    return '';
}

function getUrlArgObject() {

    var args = new Object();
    var url = window.location.href;
    var url = url.substr(url.indexOf("?") + 1);
    var pairs = url.split("&"); //在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value
        if (pos == -1) { //如果没有找到就跳过
            continue;
        }
        var argname = pairs[i].substring(0, pos); //提取name
        var value = pairs[i].substring(pos + 1); //提取value
        args[argname] = unescape(value); //存为属性
    }
    return args; //返回对象
}




export default myfun;
