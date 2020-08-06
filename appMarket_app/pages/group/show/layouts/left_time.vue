<!--  调用
 <star :position="5.0" v-model="ruleform['score3_' + v.id]" :disabled="v.quote.id >0 ? true:false"></star>
 -->
<template>
    <view class="downTime">
        <view v-if="type == 0">{{ formatDate }}</view>
        <view v-if="type == 1">
            <input class="weui-input fc-6 fs-14 nowrap"  :value="currentValue"  hidden/>
            <view class="time fs-12 fc-white flex-middle">
				<view><text class="num">{{ days ? days : '0' }}</text>天</view>
				<view><text class="num">{{ hours ? hours : '0' }}</text>时</view>
				<view><text class="num">{{ minutes ? minutes : '0'}}</text>分</view>
				<view><text class="num">{{ seconds ? seconds : '0' }}</text>秒</view>
			</view>
        </view>
    </view>
</template>
<script>
export default {
    props: [ 'value','type'],
    data() {
        return {
           formatDate:'',
           timer:'',
           days:'',
           hours:'',
           minutes:'',
           seconds:''
        }
    },
    methods: {
        
    },
    computed: {
        currentValue: {
            // 动态计算currentValue的值
            get: function() {
                this.timer =setInterval(()=>{
                this.value=this.value.replace(new RegExp(/-/gm) ,"/");
                let expire_date = new Date(this.value).getTime();
                let now_date = new Date().getTime();
                let date3 = expire_date - now_date;
                //
                //计算出相差天数
                let days = Math.floor(date3 / (24 * 3600 * 1000))
               
                this.days = days;
                //计算出小时数
                let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
                let hours = Math.floor(leave1 / (3600 * 1000))
                this.hours = hours;
                //计算相差分钟数
                //计算相差秒数
                let leave2 = leave1 % (3600 * 1000);
                let minutes = Math.floor(leave2 / (60 * 1000))
                this.minutes = minutes;
                let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
                let seconds = Math.round(leave3 / 1000)
                this.seconds = seconds;
                this.formatDate =   days +"天"+ hours + ": " + minutes + ":" + seconds + ""
                },1000);
            	
                
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    onUnload(){
        clearInterval(this.timer);
    }

}
</script>
<style>
.downTime{margin-left: -4px;}
.downTime .num{width: 20px;height: 18px;display: inline-block;background: #fff;border-radius: 3px;text-align: center;line-height: 18px;color: #ff4342;margin: 0 4px;}
</style>