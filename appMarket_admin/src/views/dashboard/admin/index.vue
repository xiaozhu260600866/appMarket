<template>
  <div class="dashboard-editor-container">

    <panel-group :panelData="panelData" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" :x-axis="panelXAxis" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <transaction-table />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const a = {

    amountData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [20, 82, 91, 154, 62, 140, 145]

}

import { dashboard } from '@/api/base'
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
        panelData:[],
        panelXAxis:[],
        allChartData:{},
        lineChartData: {}
    }
  },
  mounted(){
    dashboard({}).then(res => {
        let tempData =  [];
        let tempChartData = {};
        let tempPanelData = [];
        this.allChartData.income = {name:'月收款总额',val:res.data.income};
        this.allChartData.order_num = {name:'月订单数',val:res.data.order_num};
        this.allChartData.order_amount = {name:'月销售订单总额',val:res.data.order_amount};
        this.lineChartData = this.allChartData.income;

        this.panelXAxis = res.data.month;

        tempPanelData[0] = res.data.income[res.data.income.length-1];
        tempPanelData[1] = res.data.order_num[res.data.order_num.length-1];
        tempPanelData[2] = res.data.order_amount[res.data.order_amount.length-1];
        this.panelData = tempPanelData
    })
    /*
    capitalDatas({data:'income_7months'}).then(res => {
        let tempData =  [];
        let tempChartData = {};
        let tempPanelData = [];
        res.data.income_7months.forEach((element,index)=>{
            if(index == 6) tempPanelData[0] = parseFloat(element.value);
            tempData.push(parseFloat(element.value));
        })
        tempChartData.income = {
            name: '月收入',
            val: tempData
        }
        this.allChartData.income = tempChartData.income
        this.lineChartData = this.allChartData.income;
        this.panelData = tempPanelData
    })
    orderDatas({data:'order_7months'}).then(res => {
        let tempData =  [];
        let tempChartData = {};
        let tempPanelData = [];
        res.data.order_7months.forEach((element,index)=>{
            if(index == 6) tempPanelData[1] = parseFloat(element.value);
            tempData.push(parseFloat(element.value));
        })
        tempChartData.order_num = {
            name: '月订单数',
            val: tempData
        }
        this.allChartData.order_num = tempChartData.order_num
        this.lineChartData = this.allChartData.order_num;
        this.panelData = tempPanelData
    })
    */
    
  },
  methods: {
    handleSetLineChartData(type) {
        if(type == 'income') this.lineChartData = this.allChartData.income
        else if(type == 'order_num') this.lineChartData = this.allChartData.order_num
        else if(type == 'order_amount') this.lineChartData = this.allChartData.order_amount
      
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
