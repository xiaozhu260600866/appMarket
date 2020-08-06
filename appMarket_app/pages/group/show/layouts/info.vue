<template>
    <section>
		<view class="share-overlay" @click="toggleInfoDiag" v-if="infoDiag"></view>
		<div v-if="infoDiag">
			<view class="bd-t infoanimation choose">
				<view class="choose-floor">
					<view class="choose-sit">
						<view class="pro-img">
							<image :src="siteName+'/upload/images/product/'+info.pic" class="info-pic"></image>
						</view>
						<view class="choose-del" @click="toggleInfoDiag">
							<span class="iconfont icon-OFF"></span>
						</view>
						<view class="choose-detail">
							<view class="pro-price w-b100 Arial">￥{{ info.price }}</view>
							<view class="pro-stock w-b100">库存
								<text class="info-num pl5 Arial">{{ info.num }}</text>
							</view>
						</view>
					</view>
					<scroll-view scroll-y class="choose-scroll">
						<view class="pb30" style="overflow: hidden auto;">
							<view class="choose-class" v-for="(parent,parentIndex) in infoArr2">
								<view class="class-h4">{{ parent.name }}</view>
								<view class="arr-box">
									<block v-for="(item,key) in parent.children" >
										<!-- <span class="item no-num" v-if="info.num == 0">{{ item.name }}</span> -->
										<span :class="['item',key==infokeyArr[parentIndex] ?  'yes-act' :'']"
										 @click="changeInfoKey(parentIndex,key)">{{ item.name }}</span>
									</block>
								</view>
							</view>
							<div class="buy-num pt10 flex-between bg-f">
								<div class="fs-13 fw-bold fc-3 lh-30">数量</div>
								<tui-numberbox v-model="infonum" :max="info.num"></tui-numberbox>
							</div>
						</view>
					</scroll-view>
				</view>
				<view class="button">
					<view class="no-btn" v-if='info.num == 0'>确认</view>
					<view class="sure-btn" @click="infoSubmit" v-else>确认</view>
				</view>
			</view>
		</div>
    </section>
</template>
<script>
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox";
export default {
    props: ["productInfo",'infoArr','infoArr2'],
	components: {
		tuiNumberbox
	},
    data() {
        return {
            infokey: 0,
			infokeyArr:[0,0,0],
            infonum: 1,
			info:{},
            infoDiag: false,
            siteName: this.getSiteName(),
            cartNum: 0,
            showType: ''
        }
    },
    onLoad() {
        this.infoDiag = false;
    },
    methods: {
		changeInfoKey(parentIndex,key){
			let arr = this.infokeyArr;
			arr[parentIndex] = key;
			this.infokeyArr = [];
			this.$set(this.$data,'infokeyArr',arr);
			this.getInfo();
		},
        infoSubmit() {
            let info = this.info;
            info.bnum = this.infonum;
            this.addCartAjax({ infoId: info.id, num: info.bnum, type: "add", is_info: 1 });
        },
        addCartAjax(data) {
            let showType = this.showType;
            let url = "";
            if (showType == "addCart") {
                url = "/shop/cart/to-add-cart"
            } else {
                url = "/shop/product/show";
            }
			this.postAjax(url,data).then(msg=>{
				if (msg.data.status == 2) {
				    if (showType != "addCart") {
				        this.infoDiag = false;
				        this.goto('/pages/shop/order/buy/index?order_no=' + msg.data.order_no,1);
				        return false;
				    }
				    this.cartNum = msg.data.num;
				    if (this.infoArr2.length > 0) {
				        this.toggleInfoDiag();
				    }
				    this.$emit('callback', this.cartNum);
				}
			});
           
        },
		getObjectLength(obj){
			let count = 0;
			for (let var1 in obj) {
				count++;
			}
			return count;
		},
		getInfo(){
			let arr = [];
			this.infoArr2.forEach((v,index)=>{
				arr[v.name] = v.children[this.infokeyArr[index]].name;
			});
			let info = {};
			this.infoArr.forEach((v,index)=>{
				var infoNum = 0;
			    for (let objectKey in arr) {
					if(arr[objectKey] == v[objectKey]){
						infoNum++;
					}
					if(infoNum >=this.getObjectLength(arr)){
						info =v;
					}
					
			    } 
			});
			this.info = info;
		},
        toggleInfoDiag() {
			this.getInfo();
            this.infoDiag = !this.infoDiag;
        }
    }

}
</script>
<style scoped>
@import url("info.css");
</style>