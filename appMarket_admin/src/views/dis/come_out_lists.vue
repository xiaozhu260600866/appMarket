<template>
	<section>
		<dx-table :data="data" :globalData="globalData" operateWidth="280px">
			<div slot="append_table_payType" slot-scope="scope">
            	{{ scope.row.payType == 1 ? '微信' :'银行卡' }}
        	</div>
		</dx-table>
	</section>
</template>
<script type="text/javascript">
import globalData from "@/table/dis_income.js";
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/come-out-lists',
			data: this.formatData(this),
            globalData:globalData,
			siteName: this.getSiteName(),
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		ajax() {
			this.getAjax(this, { status: this.data.query.status }, msg => {});
		},
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
	},
	components: {
		 'dx-table': resolve => require(['xiaozhu/vue/components/admin/dx_table.vue'], resolve),
	}

}

</script>
