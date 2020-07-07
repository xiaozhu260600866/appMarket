<template>
	<div style="text-align: center;">
		<span :class="['category','category' + data.category]">{{ data.categoryName }}</span>
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

<style scoped>
.category{display: inline-block;height: 32px;padding: 0 10px;line-height: 30px;border-radius: 4px;font-size: 12px;}
.category1{background: #f3f3f3;color: #666;border: #ccc 1px solid;}
.category2{background: #fef0f0;color: #f56c6c;border: #fde2e2 1px solid;}
.category3{background: #f7f0fe;color: #8e1196;border: #ebb4f5 1px solid;}
</style>