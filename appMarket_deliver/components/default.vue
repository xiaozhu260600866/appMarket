<!-- 引用
<page :formAction='formAction'  :ajaxOnload="true"  ref="page" :data="data" @ajaxCallBack="ajax">
   <div slot="content" >
    <div v-if="data.show">
      内容
    </div>
   </div>
</page>
 -->
<template>
	<section>
		<slot name="content" />
		<pageHead v-if="pageHeadShow" ref="pageHead" :pageHeadData="pageHeadData"></pageHead>
		<div class="float-group" :style="Fbottom" v-if="parentData.show" style="position: fixed;z-index:15;right: 15px;bottom: 120px;">
			<slot name="floatBtn" />
			<backToIndex :myclass="backToIndexClass"></backToIndex>
		</div>
	</section>
</template>
<script type="text/javascript">
let source = uni.getStorageSync('source');

import pageHead from "xiaozhu/uniapp/components/pageHead";
import backToIndex from "xiaozhu/uniapp/components/backToIndex";

export default {
	props: ["ajaxOnload", 'pageHeadShow',"parentData", "ruleform", "vaildate", "otherData", "ajaxTimeOut", "formAction", 'Fbottom',
		'backToIndexClass',"pageHeadData"
	],
	data() {
		return {
			getSiteName: this.getSiteName(),
			wx: {},
		}
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		//"$route": "share"
	},
	methods: {
		share(title,logo,desc) {
			setTimeout(() => {
				let distribution = uni.getStorageSync("distribution");
			
				
				
				var args = new Object();
				var url1 = window.location.href;
				var url1 = url1.substr(url1.indexOf("?") + 1);
				var pairs = url1.split("&"); //在逗号处断开
				for (var i = 0; i < pairs.length; i++) {
				    let pos = pairs[i].indexOf('='); //查找name=value
				    if (pos == -1) { //如果没有找到就跳过
				        continue;
				    }
				    var argname = pairs[i].substring(0, pos); //提取name
				    var value = pairs[i].substring(pos + 1); //提取value
					if(argname !='openid' && argname !="nickname" && argname!="source" && argname!="headimgurl"){
						 args[argname] = unescape(value); //存为属性
					}
				   
				}
				 var pages=getCurrentPages();//页面指针数组 
				 var prepage=pages[pages.length-1];//上一页面指针 
				 var pages= '/'+prepage.route+'&';
				for (let key1 in args ) {
					pages+=key1 + '='+args[key1]+'&';
				}
				
				
				 let source = this.getSiteName + '/h5/';
				var url = this.getSiteName+'/openid?page='+pages+'&source='+source;
				if(distribution) url+= "&distribution=" + distribution.id;
				// let site_name = this.getSiteName;
				//  
				//  let url = "";
				//  let arg = window.location.href.split("#")[1];
				//  arg = arg.split("?");
				//  let page =arg[0];
				//  let scope = arg.length >= 1 ? arg[1] : '';
				//  if(scope){
				//  
				//  }else{
				//  	url = site_name+'/openid?page='+page+'&source='+source;
				//  }
				console.log(url);
				 
				/*if (url.indexOf('?') != -1) {
						url+="&shareSource=share";
					}else{
						url+="?shareSource=share";
				}*/
				if(distribution){
					if (url.indexOf('?') != -1) {
						url+="&distribution="+distribution;
					}else{
						url+="?distribution="+distribution;
					}
				}
				this.wx.ready(() => {
					this.wx.onMenuShareAppMessage({
						title: title,
						link: url,
						imgUrl:logo,
						desc:desc
					});
					this.wx.onMenuShareTimeline({
						title: title,
						link: url,
						imgUrl:logo,
						desc:desc
					});
					this.wx.showMenuItems({
						menuList: [
							'menuItem:copyUrl', // 复制链接,
							'menuItem:share:appMessage', // 发送给朋友
							'menuItem:share:timeline' // 发送给朋友圈
						],
						success: function(res) {
							//alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
						},
						fail: function(res) {
							alert(JSON.stringify(res));
						}
					});

				});

			}, 2000)

		},
	},
	mounted(options) {
		clearInterval(this.timer);
		let openid = uni.getStorageSync('openid');
	},
	components: {
		backToIndex,
		pageHead
	},
}
</script>