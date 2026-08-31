<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 60px">
      <el-col :span="6">
        <el-card style="color: #409EFF">
          <div><i class="el-icon-user-solid" /> Total users</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            100
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #F56C6C">
          <div><i class="el-icon-money" /> Total sales</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            ￥ 1000000
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #67C23A">
          <div><i class="el-icon-bank-card" /> Total revenue</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            ￥ 300000
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #E6A23C">
          <div><i class="el-icon-s-shop" /> Total stores</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            20
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="main" style="width: 500px; height: 450px"></div>
      </el-col>

      <el-col :span="12">
        <div id="pie" style="width: 500px; height: 400px"></div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="12">
        <div id="candlestick" style="width: 500px; height: 450px"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "Home",
  data() {
    return {

    }
  },
  mounted() {  // Trigger after page elements are rendered
    const option = {
      title: {
        text: 'Quarterly member statistics',
        subtext: 'Trend chart',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      xAxis: {
        type: 'category',
        data: ["Q1", "Q2", "Q3", "Q4"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: "Starbucks",
          data: [],
          type: 'bar'
        },
        {
          name: "Starbucks",
          data: [],
          type: 'line'
        },
        {
          name: "Luckin Coffee",
          data: [],
          type: 'bar'
        },
        {
          name: "Luckin Coffee",
          data: [],
          type: 'line'
        }
      ]
    };

    // Pie chart

    const pieOption = {
      title: {
        text: 'Quarterly member statistics',
        subtext: 'Proportion chart',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: "Starbucks",
          type: 'pie',
          radius: '55%',
          center: ['25%', '70%'],
          label:{            // Text labels on pie chart
            normal:{
              show:true,
              position:'inner', // Label position
              textStyle : {
                fontWeight : 300 ,
                fontSize : 14,    // Font size
                color: "#fff"
              },
              formatter:'{c}({d}%)'
            }
          },
          data: [],  // Placeholder
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: "Luckin Coffee",
          type: 'pie',
          radius: '50%',
          center: ['75%', '50%'],
          label:{            // Text labels on pie chart
            normal:{
              show:true,
              position:'inner', // Label position
              textStyle : {
                fontWeight : 300 ,
                fontSize : 14,    // Font size
                color: "#fff"
              },
              formatter:'{d}%'
            }
          },
          data: [
            {name: "Q1", value: 5},
            {name: "Q2", value: 6},
            {name: "Q3", value: 7},
            {name: "Q4", value: 8}
            ],  // Placeholder
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],

    };

    const candlestickOption = {
      title: {text: 'XX Stock'},
      xAxis: {
        data: ['2022-1', '2022-2', '2022-3', '2022-4'],
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      dataZoom: {
        show: true,
        type: 'slider',
        startValue: 0,
        endValue: 100
      },
      series: [
        {
          type: 'candlestick',
          data: [
              [22, 23, 21, 19],
              [19, 21, 29, 31],
              [28, 18, 31, 20],
              [30, 27, 38, 18],
          ]
        }
      ]
    }


    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);

    var candlestickDom = document.getElementById('candlestick');
    var candlestickChart = echarts.init(candlestickDom);
    candlestickChart.setOption(candlestickOption)

    this.request.get("/echarts/members").then(res => {
      // Placeholder
      // option.xAxis.data = res.data.x
      option.series[0].data = res.data
      option.series[1].data = res.data

      option.series[2].data = [5,6,7,8]
      option.series[3].data = [5,6,7,8]
      // Set options after data is ready
      myChart.setOption(option);


      pieOption.series[0].data = [
        {name: "Q1", value: res.data[0]},
        {name: "Q2", value: res.data[1]},
        {name: "Q3", value: res.data[2]},
        {name: "Q4", value: res.data[3]},
      ]
      pieChart.setOption(pieOption)
    })
  }
}
</script>

<style scoped>

</style>
