<template>
	<div>
		<dx-table :data="data" :global-data="globalData" :operate-width="1" @createBeforeCallBack="createBeforeCallBack">
			
		</dx-table>
	</div>
</template>
<script type="text/javascript">
	import globalData from './layouts/platform.js'
	export default {
		components: {
			'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
		},
		data() {
			return {
				formAction: '/admin/merchant/lists',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData
			}
		},
		watch: {
			//'$route': 'ajax'
		},
		mounted() {
			//this.ajax()
		},
		methods: {
			ajax() {
				this.getAjax(this, {}, msg => {

				})
			}
		}
	}
</script>
