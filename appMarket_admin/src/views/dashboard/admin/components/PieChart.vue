<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { salesRanking } from '@/api/sales/order'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      cdata:[]
    }
  },
  mounted() {
    let d = [];
    salesRanking(this.listQuery).then(res => {
      res.data.lists.forEach((element)=>{
        d.push({value:element.value,name:element.name})
      });
      this.cdata = d;
      this.$nextTick(() => {
        this.initChart()
      })
    })
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
          {
            name: '产品销售比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: this.cdata,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
