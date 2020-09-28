<template>
  <section v-if="data.show" class="pt15">
    <div class="o-group">
      <div class="sec-title">订单信息</div>
      <div class="order-info bd-e">
        <div class="info-item">
          <p class="label">订单状态：</p>
          <p class="info Arial font_red">{{ data.detail.status_message }}</p>
        </div>
        <div class="info-item">
          <p class="label">订单编号：</p>
          <p class="info Arial">{{ data.detail.order_no }}</p>
        </div>
        <div class="info-item">
          <p class="label">会员信息：</p>
          <div class="info">
            <p><span class="Arial">ID：{{ data.detail.user_id }}</span> / 姓名：{{ data.detail.addr_name }} <span v-if="data.detail.user">/ 昵称：{{ data.detail.user.nickname }}</span></p>
          </div>
        </div>
        <div class="info-item">
          <p class="label">下单时间：</p>
          <p class="info Arial">{{ data.detail.created_at }}</p>
        </div>
        <div class="info-item">
          <p class="label">订单总价：</p>
          <div class="info">
            <p class="Arial">{{ data.detail.integral }}积分</p>
            <el-button v-if="data.detail.status>=3&&data.detail.status<9" type="primary" size="mini" @click="changePrice">修改价格</el-button>
          </div>
        </div>
        <div class="info-item">
          <p class="label">收件人信息：</p>
          <div class="info">
            <p>{{ data.detail.addr_name }}，{{ data.detail.addr_phone }}</p>
            <p>{{ data.detail.addr_province }} {{ data.detail.addr_city }} {{ data.detail.addr_area }}{{ data.detail.addr_address }}</p>
            <el-button v-if="data.detail.status<5" type="primary" size="mini" @click="changeAddress">修改地址</el-button>
          </div>
        </div>
        <div class="info-item">
          <p class="label">配送方式：</p>
          <p class="info">{{ data.detail.getShipping }}</p>
        </div>
        <div class="info-item">
          <p class="label">客户留言：</p>
          <p class="info">{{ data.detail.remark }}</p>
        </div>
        <div v-if="data.detail.is_bill" class="info-item">
          <p class="label">发票信息：</p>
          <div class="info">
            <p>单位：{{ data.detail.unit_name }}</p>
            <p>纳税人识别号：<span class="Arial">{{ data.detail.bill_no }}</span></p>
          </div>
        </div>
        <div class="info-item">
          <p class="label">快递信息：</p>
          <div class="info">
            <p>快递公司：{{ data.detail.express_name }}</p>
            <p>快递单号：<span class="Arial">{{ data.detail.express_no }}</span></p>
            <p>发货时间：<span class="Arial">{{ data.detail.express_at }}</span></p>
          </div>
        </div>
        <div class="info-item">
          <p class="label" />
          <div class="info">
            <el-button v-if="data.detail.status == 2 || data.detail.status == 3" type="primary" size="small" @click="changeDelivery">发货</el-button>
            <el-button v-if="data.detail.status != 0" size="small" @click="changeStatus(0)">关闭订单</el-button>
            <el-button v-if="data.detail.status == 5" type="primary" size="small" @click="changeStatus(9)">收货</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="o-group pt15">
      <div class="sec-title">产品信息</div>
      <div class="bd-e p15 pro-table">
        <el-table ref="multipleTable" :data="productArr" border tooltip-effect="dark" style="width: 100%">
          <el-table-column align="center" label="产品编号" width="80">
            <template scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="产品名称" min-width="180">
            <template scope="scope">
              <img :src="scope.row.firstCover" height="30" width="30" class="mr15">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="价格" width="120">
            <template scope="scope">{{ scope.row.integral }}</template>
          </el-table-column>
          <el-table-column align="center" label="数量" width="120">
            <template scope="scope">{{ data.detail.num }}</template>
          </el-table-column>
          <el-table-column align="center" label="小计" width="150">
            <template scope="scope">{{ scope.row.integral }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    <info ref="info" :type="type" :title="title" :rule-form="data.detail" form-action="/admin/integral/modify" />
  </section>
</template>
<script type="text/javascript">
export default {
	components: {
		'info': resolve => require(['./layouts/info'], resolve)
	},
	data() {
		return {
			formAction: '/admin/integral/info',
			data: this.formatData(this),
			title: '',
			type: 0,
			productArr: [],
			siteName: this.getSiteName()
		}
	},
	mounted() {
		this.ajax()
	},
	methods: {
		ajax() {
			this.getAjax(this, { id: this.getOptions('id') }, msg => {
				this.productArr.push(msg.detail.products)
			})
		},
		changeStatus(status) {
			const title = status === 0 ? '关闭订单' : '确认收货'
			this.getConfirm(title, () => {
				this.postAjax('/admin/integral/change-order-status', { id: this.data.detail.id, status: status }, msg => {
					if (msg.data.status === 2) {
						this.ajax()
					}
				})
			})
		},
		changePrice() {
			this.type = 0
			this.$refs.info.ajax()
			this.title = '修改价格'
		},
		changeAddress() {
			this.type = 1
			this.$refs.info.ajax()
			this.title = '修改地址'
		},
		changeDelivery() {
			this.type = 2
			this.$refs.info.ajax()
			this.title = '发货'
		},
		goodsAfter(item) {
			this.$refs.goodsAfter.dialogVisible = true
			item.type = item.type === 1 ? '退货' : '退货'
			this.$refs.goodsAfter.ruleForm = item
			// if (item.pic) this.$refs.goodsAfter.fileList = splitCover(item.pic, 'product')
			console.log(this.$refs.goodsAfter.ruleForm)
		}
	}
}

</script>

<style type="text/css" scoped="">
.sec-title{height: 40px;line-height: 40px;background: #f5f5f5;padding: 0 15px;}
.order-info{padding: 10px 0;}
.info-item{display: flex;line-height: 20px;padding: 8px 0;color: #666;}
.info-item .label{width: 150px;text-align: right;padding-right: 5px;font-weight: bold;}
.info-item .info{flex: 1;overflow: hidden;}

.pro-table .el-table__header-wrapper th{background: #fff;}

.pr-info{display: flex;border: 0;}
.pr-info .name{ text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;line-height: 20px;height: 40px;}
.pr-info .num{line-height: 16px;color: #999;margin-top: 4px;}
.order-info-left .lname{width: 110px;}
</style>
