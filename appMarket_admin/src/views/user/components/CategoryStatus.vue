<template>
	<div style="text-align: center;">
		<el-tag v-if="data.category===0">-</el-tag>
		<el-tag type="success" v-else-if="data.category&&data.category_status">已认证</el-tag>
		<el-tag type="danger" v-else>未认证</el-tag>
	</div>
</template>

<script>
export default {
	props: {
		data:{
			type:Object,
			default:{}
		}
	}
}
</script>