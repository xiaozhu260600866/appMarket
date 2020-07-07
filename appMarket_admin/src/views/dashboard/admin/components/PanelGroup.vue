<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('income')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="dx-finance" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月收款总额
          </div>
          <count-to :start-val="0" :end-val="tPanelData[0]" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('order_num')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="dx-purchase1" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月订单数
          </div>
          <count-to :start-val="0" :end-val="tPanelData[1]" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('order_amount')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="dx-sales-order" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本月销售订单总额
          </div>
          <count-to :start-val="0" :end-val="tPanelData[2]" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="dx-finance-receivable" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            应收账款总额
          </div>
          <count-to :start-val="0" :end-val="parseFloat(receivable_today_amount)" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { datas } from '@/api/finance/bill'
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props:{
    panelData: {
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      tPanelData:this.panelData,
      receivable_today_amount:0
    }
  },
  watch: {
    panelData: {
      deep: true,
      handler(val) {
        console.log(val)
        this.tPanelData = val;
      }
    }
  },
  mounted(){
    datas({data:'receivable_today_amount'}).then(res => {
        this.receivable_today_amount = res.data.receivable_today_amount;
    })
    
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #f4516c;
      }

      .icon-message {
        background: #f4516c;
      }

      .icon-money {
        background: #ff9614;
      }

      .icon-shopping {
        background: #36a3f7
      }
    }

    .icon-people {
      color: #f4516c;
    }

    .icon-message {
      color: #f4516c;
    }

    .icon-money {
      color: #ff9614;
    }

    .icon-shopping {
      color: #36a3f7
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 28px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
