<template>
	<view class="content">
		<view>
		<!-- 	<button @click="openDefault" >打开默认蓝牙搜索</button>
			<button @click="open" >打开自定义蓝牙搜索页面</button>
			<button @click="connectIP" >端口ip连接打印机</button>
			<button @click="printer" >打印小票</button>
			<button @click="printerLable" >打印标签</button>	
			<button @click="state" >打印机状态</button>		
			<button @click="dis" >断开打印机</button>

			<text>{{tip}}</text> -->
		</view>
	</view>
</template>


<script>

	const plug= uni.requireNativePlugin('Html5app-Gprinter'); 
	export default {
		data() {
			return {
				tip: '',
				order:{}
			}
		},
		methods: {
			openDefault(order)
			{
				//蓝牙连接打印机
				const _this=this;
				this.order = order;
				plug.BluetoothPort({setBackgroundColor:"#2088d2"},result=>{
				   //_this.tip=JSON.stringify(result);
				   _this.printer();
				});
				
			},
			open(){
				
				uni.navigateTo({
					"url":"./Bluetooth"
				});
				
			},
			connectIP()
			{
				//端口网络连接
				let _this=this;
				plug.connectIP({},ret=>{	
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
					
					
				});
				
			},
			state(){
				
				//查询打印机状态
				let _this=this;
				plug.state({},ret=>{
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
					
				});
				
			},
			dis()
			{
				//断开打印机
				let _this=this;
				plug.disconnect({},ret=>{	
					_this.tip=JSON.stringify(ret);
				});
				
			},
			printer(){
				//打印机小票
				const _this=this;
				plug.printer({"ESC":_this.setDate()},ret=>{
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
				});
				
			},
			printerLable(){
				//打印标签
				const _this=this;
				plug.printer({"TSC":_this.Lable()},ret=>{
					
					_this.tip=JSON.stringify(ret);
				});
				
			}
			,
			setDate()
			{
				//打印小票
				const _this=this;
				
				//制作小票格式， 
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				
				// //加入logo图片
				// var Path="static/gprinter.png"; 
				// line.image=Path;
				// line.width="350";
				// line.center="center";
				// line.bottom="1";
				// data.push(line);
				
				line={};
				line.text="同城菜场";
				line.center="center";
				line.font="max";
				line.bottom="3";
				data.push(line); //每添加一个，代表一行字
				
				line={};
				line.text="电子票消费明细";
				line.center="center";
				line.font="max";
				line.bottom="3";
				data.push(line); //每添加一个，代表一行字
	
				line={};
				line.text="姓名:"+this.order.addr_name;
				line.center="left";
				line.font="bold";
				line.bottom="2";
				data.push(line);
				
				line={};  
				line.text="地址:"+this.order.addr_address;
				line.center="left";
				line.font="bold";
				line.bottom="2";
				data.push(line);
				
				line={};  
				line.text="下单日期："+this.order.payed_at;
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="订单编号："+this.order.order_no;
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				line={};
				line.text="联系电话："+this.order.addr_phone;
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				//商品列表，示例
				for(let i=0;i<this.order.products.length;i++)
				{
				   let v = this.order.products[i];            
					line={};
					line.text="商品名称："+v.getProduct.name;
					line.center="left";
					line.font="normal";
					line.bottom="1";
					data.push(line);
				
					line={};
					line.title=["数量："+v.num+",单价："+v.price+",金额："+v.amount];
					line.left=[0,30,60];
					line.center="left";
					line.font="normal";
					line.bottom="2";
					data.push(line);
									
				}
				
				line={}; //清空一下
				
				line.text="------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				line={};
				line.text="数量："+this.order.num+" ,金额：￥"+this.order.amount;
				line.center="left";
				line.font="bold";
				line.bottom="1";
				data.push(line);
				
				
				
				
				
				
				
				
				
				
				// //加入条型码
				// line={};
				// line.barcode="2019563352660";
				// line.type="CODE128";
				// line.height="100";
				// line.position="BELOW";
				// line.width="2";
				// line.center="center";
				// line.bottom="2";
				// data.push(line);
				
				
				//  //加入二维码
				// line={};
				// line.qrcode="d68242b5e540aa7f21173c2d65b2c5ad";
				// line.size="10";
				// line.center="center";
				// line.bottom="0";
				// line.errorlevel="L";
				
				
				// data.push(line);
				
				// line={};
				// //加入图片
				// line.image="http://www.html5-app.com/uploads/file/20190307/20190307172436572807.png";
				// line.width="150";
				// line.center="center";
				// line.bottom="3";
				// data.push(line);
				
				console.log("printdata:"+JSON.stringify(data));
				
				return data;
				
			},
			Lable(){
				
				//制作标签格式， 
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				//设置标签纸大小
				line={};
				line.width=40; //mm
				line.height=30; //mm
				line.gap=3; //标签纸之间，间隙长度 mm
				line.page=1; //打印几份
				data.push(line); //每添加一个，代表一行字

				//添加图片
				line={};
				line.image="http://www.html5-app.com/gprinter.png";
				line.x=30;
				line.y=20;
				line.width=70;
				data.push(line);
				
				
					//添加文字
				line={};
				line.text="HTML5+混合APP开发社区";
				line.rotation=0;
				line.x=30;
				line.y=100;
				line.xscal=1;
				line.yscal=1;
				data.push(line); //每添加一个，代表一行字
				
				//添加条型码
				line={};
				line.barcode="2019563352660";
				line.x=30;
				line.y=160;
				line.type="CODE128";
				line.height=50;
				line.readable=true;
				line.rotation=0;
				data.push(line);
				
				 //加入二维码
				line={};
				line.qrcode="1234566";	
				line.x=190;
				line.y=20;
				line.width=3
				line.rotation=0;
				data.push(line);
				
				return data;
			}
			

		}
	}
</script>

<style>
	.content {
		margin: 10px;
		margin-top:30px;
	}
	button{ margin-bottom: 25px;}
</style>
