<template>
	<view class="proLists">
		<dx-products-pic v-for="item in data" :src="item.firstCover ?item.firstCover:'/static/nopropic.png'" :isList="true">
			<view class="title fs-16 fw-bold pr15">{{ item.name }}</view>
			<view class="grade flex-middle fc-3 fs-13 mt3">
				<view class="sales pr15">销量：<text class="Arial">53{{ item.sales }}</text></view>
				<view class="fresh">当前库存：<text class="Arial">{{ item.num  }}</text></view>
			</view>
			<view class="num flex mt3">
				<view class="nav">新鲜度：<text class="Arial">{{ item.freshness }}</text></view>
			</view>
			<view class="flex-between">
				<dx-price v-model="item.price" split :intSize="16" :decimalSize="12"></dx-price>
			</view>
			<view class="edit-nav flex-right" v-if="!type">
				<dx-button size="mini" @click="goto('/pages/product/create_edit/main?id='+item.id,1)">编辑</dx-button>
				<dx-button size="mini">下架</dx-button>
			</view>
			<!-- 优惠活动选择 -->
			<view class="select-icon" v-if="type && !operation">
				<checkbox-group @change="checkboxChange" :data-id="item.id" :data-name="item.name">
					<checkbox :value="item.id" ></checkbox>
				</checkbox-group>
			</view>
			<!-- 下架选择 -->
			<view class="select-icon" v-if="!type && operation">
				<checkbox-group @change="checkboxChange" :data-id="item.id" :data-name="item.name">
					<checkbox :value="item.id" ></checkbox>
				</checkbox-group>
			</view>
			<!-- 其他状态 -->
			<view class="del-icon" v-if="!type && !operation"><text class="dxi-icon dxi-icon-del" @click="del(item)"></text></view>
		</dx-products-pic>
	</view>
</template>
<script>
import dxProductsPic from "doxinui/components/products/pic"
	export default {
		components:{
			dxProductsPic
		},
		data(){
			return{
				chooseData: [],
				
				
			}
		},
		methods:{
			in_array(value, arr) {
				let res = false;
				if (!arr) return false;
				arr.forEach((v) => {
					if (v == value) {
						res = true;
					}
				});
				return res;
			},
			checkboxChange(e){
				console.log(e);
				let chooseArr = e.mp.detail.value[0];
				let name = e.mp.target.dataset.name;
				if(chooseArr && !this.in_array(chooseArr,this.chooseData)){
					this.chooseData.push({id:chooseArr,name:name});
				}else{
					let id = e.mp.target.dataset.id;
					for (let i = 0; i < this.chooseData.length; i++) {
						if(this.chooseData[i].id == id){
							this.chooseData.splice(i,1)
						}
					}
				}
				console.log(this.chooseData);

			},
			del(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个产品吗',
					success: res => {
						if (res.confirm) {
							this.postAjax('/ajax/mydel', {
								id: item.id,
								tablename: 'products'
							}).then(msg=>{
								if (msg.data.status == 2) {
									this.getParent(this).ajax();
								}
							});
						}
					},
				})
			},
		},
		props: ["data","type","operation"]
	}
</script>
<style scoped>
/* 左侧导航布局 start*/
/* 隐藏scroll-view滚动条*/
::-webkit-scrollbar {width: 0;height: 0;color: transparent;}
.tab-view {width: 180upx;position: fixed;left: 0;z-index: 10;}
.tab-bar-item {width: 180upx;height: 110upx;background: #f6f6f6;box-sizing: border-box;display: flex;align-items: center;justify-content: center;font-size: 26upx;color: #444;font-weight: 400;}
.active {position: relative;color: #000;font-size: 30upx;font-weight: 600;background: #fcfcfc;}
.active::before {content: "";position: absolute;border-left: 8upx solid #57C734;height: 30upx;left: 0;}
/* 左侧导航布局 end*/


.right-box {width: 100%;position: fixed;padding-left: 180upx;box-sizing: border-box;left: 0;}

.proLists .num .nav{background-color: rgba(87,199,52,0.1);color: #57C734;padding: 8upx 16upx;border-radius: 6upx;font-size: 24upx;line-height: 30upx;}

.edit-nav /deep/span{display: flex;}
.edit-nav /deep/.dxi-btn{margin: 20upx 0 0 20upx;}

/deep/.dxi_pic-lists{position: relative;}
.dxi-icon{position: absolute;top: 0;right: 0;width: 80upx;height: 80upx;text-align: center;line-height: 80upx;}

.select-icon{position: absolute;top: 0;right: 0;width: 80upx;height: 80upx;text-align: center;line-height: 80upx;}
.select-icon /deep/.uni-checkbox-input{zoom: 90%;}
.select-icon /deep/.uni-checkbox-input.uni-checkbox-input-checked{background-color: #57C734!important;color: #fff!important;border-color: #57C734;}
.select-icon /deep/.uni-checkbox-input:hover{border-color: #57C734;color: #fff!important;}
</style>
