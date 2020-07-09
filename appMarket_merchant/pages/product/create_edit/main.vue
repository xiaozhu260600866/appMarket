<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb50 pro_edit" v-if="data.show">
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.name" placeholder="请输入产品标题" type="text" name="name" datatype="require" myclass="title"></weui-input>
				<weui-input v-model="ruleform.cover" label="上传产品图" type="upload" upurl='product' allowUpLoadNum="5" name="cover" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.content" placeholder="商品简介" type="textarea" name="content" datatype="require"></weui-input>
				<weui-input v-model="ruleform.price" label="单价" placeholder="￥0.00(包括包装费)" type="number" name="price" datatype="require"></weui-input>
				<weui-input v-model="ruleform.specs" label="规格" placeholder="0.00斤" type="number" name="specs" datatype="require"></weui-input>
				<weui-input v-model="ruleform.num" label="库存" placeholder="0" type="number" name="num" datatype="require"></weui-input>
				<weui-input v-model="ruleform.freshness" label="新鲜度" placeholder="0-10数字越大表示越新鲜" type="number" name="freshness" datatype="require"></weui-input>
				<weui-input v-model="ruleform.fclass" label="商品分类" name="fclass" changeField="value" type="select" datatype="require" dataKey="propertyArr"></weui-input>
				<weui-input v-model="ruleform.shell_date" label="售买时间" type="date" name="date"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.auto_group" label="拼团" type="switch" name="auto_group" ></weui-input>
				<weui-input v-if="ruleform.auto_group" v-model="ruleform.group_price" label="拼团价" placeholder="￥0.00(包括包装费)" type="number" name="group_price" datatype="require"></weui-input>
				<weui-input  v-if="ruleform.auto_group" v-model="ruleform.group_num" label="拼团人数" placeholder="0" type="number" name="group_num" datatype="require"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.is_index" label="店家推荐" type="switch" name="is_index" ></weui-input>
				<weui-input v-model="ruleform.auto_putaway" label="自动上架" type="switch" name="auto_putaway" ></weui-input>
				<weui-input v-if="ruleform.auto_putaway" v-model="ruleform.putaway_date" label="售买时间" type="date" name="putaway_date"></weui-input>
			</view>
			<view @click="submit"><dxftButton type="success" btnBg="#57C734" btnBd="#57C734">保存</dxftButton></view>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxftButton
		},
		data() {
			return {
				formAction: '',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				id:0,
				propertyArr:[]
			}
		},
		methods: {
			submit(){
				if(!this.ruleform.auto_group){
					delete this.vaildate.group_num;
					delete this.vaildate.group_price;
				}
				if(!this.ruleform.auto_putaway){
					delete this.vaildate.auto_putaway;
				
				}
				console.log(this.vaildate);
				
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.back();
							}
						});
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					if(msg.detail){
						this.ruleform = msg.detail;
						if(this.ruleform.cover) this.ruleform.cover = this.ruleform.cover.split(",");
						console.log(this.ruleform);
					}
					this.propertyArr = msg.productClass;
				});
			}
		},
		onLoad(options) {
			if(options.id){
				this.formAction = "/merchant/product/edit?id="+ options.id;
			}else{
				this.formAction = "/merchant/product/create";
			}
			this.ajax();
			
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import url('index.css')
</style>