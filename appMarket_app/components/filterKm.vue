<template>
	<div>
		{{ currentValue }}
	</div>
</template>
<script type="text/javascript">
export default {
	props: ["value"],
	data() {
		return {
			getSiteName: this.getSiteName(),
		}
	},
	computed: {

		currentValue: {
			// 动态计算currentValue的值
			get: function() {

				if(this.value > 1000){
					this.value = this.value / 1000;
					return this.value = this.value.toFixed(1)+"km";
				}else{
					return this.value = this.value.toFixed(1)+"m";
				}
			},
			set: function(val) {
				this.$emit('input', val);
			}
		}
	}
}

</script>
