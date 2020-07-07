const fun = function() {};

fun.install = (Vue, options) => {
	Vue.prototype.tytConfirm = (opt,that) => {
        return new Promise((resolve, reject) => {
			that.$msgbox({
				title: '提示',
				type: 'warning',
				message: opt.msg,
				showInput: opt.showInput,
				inputPlaceholder: opt.inputPlaceholder,
				inputType:opt.inputType,
				inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				inputErrorMessage: '邮箱格式不正确',
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				confirmButtonLoading : false,
				beforeClose: (act, instance, done) => {
		    		if (act === 'confirm') {
		    			//console.log(instance);
		    			if(opt.showInput){
		    				if(!instance.inputValue){
			    				that.$message.error(opt.inputPlaceholder);
			    				return;
			    			}
		    			}
		            	instance.confirmButtonLoading = true;
		            	instance.confirmButtonText = '操作中...';

						resolve({done:done,instance:instance});
						
		    //         	action({action:'to-examine',id:this.detailData.id}).then(res => {
		    //         		instance.confirmButtonLoading = false;
						// 	this.$message.success(res.msg);
						// 	this.detailData = res.data.data;
						// 	done();
						// })
		    		} else {
		    			done();
		    		}
		  		}
			}).then(act => {
				reject();
			}).catch(() => {
				
	        });
		})
    }

    Vue.prototype.msgSuccess = (msg,that) => {
    	that.$message.success(msg);
    }
    Vue.prototype.msgError = (msg,that) => {
    	that.$message.error(msg);
    }
}

export default fun;