<template>
  <div class="home-container">
    <div class="welcome-section">
      <h2 class="welcome-title">Hello, {{ user.nickname }} <span class="welcome-emoji">🐾</span></h2>
      <p class="welcome-subtitle">Pet Adoption Management System</p>
    </div>

    <div class="welcome-card">
      <el-card class="welcome-message-card">
        <div class="welcome-content">
          <div class="welcome-icon">🐕</div>
          <div class="welcome-text">
            <h3>Welcome to the Pet Adoption Management System</h3>
            <p class="system-description">We are dedicated to finding a warm home for every pet</p>
            <el-divider class="custom-divider" />
            <p class="slogan">In the name of love, finding forever homes for pets!</p>
          </div>
        </div>
      </el-card>
    </div>

    <div class="charts-section">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="chart-card">
            <div id="main" class="chart"></div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="chart-card">
            <div id="pie" class="chart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  mounted() {
    this.initLineChart();
    this.initPieChart();
  },
  methods: {
    initLineChart() {
      var option = {
        title: {
          text: 'Quarterly Adoption Application Statistics',
          subtext: 'Trend Chart',
          left: 'center',
          textStyle: {
            color: '#5D9CEC',
            fontSize: 18,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#97A8BE',
            fontSize: 14
          }
        },
        color: ['#FF9F43', '#5D9CEC'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%', // Extra bottom space for the legend
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderColor: '#E6EBF5',
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
          type: 'category',
          data: ["Q1", "Q2", "Q3", "Q4"],
          axisLine: {
            lineStyle: {
              color: '#E6EBF5'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Applications',
          nameTextStyle: {
            color: '#97A8BE'
          },
          axisLine: {
            lineStyle: {
              color: '#E6EBF5'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#F5F7FA',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'Adoption Applications',
            data: [],
            type: 'line',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(93, 156, 236, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(93, 156, 236, 0.1)'
                }
              ])
            }
          },
          {
            name: 'Application Count',
            data: [],
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            }
          }
        ],
        legend: {
          bottom: '5%', // Move legend down, away from x-axis labels
          left: 'center',
          data: ['Adoption Applications', 'Application Count'],
          textStyle: {
            color: '#666'
          },
          itemGap: 20, // Increase spacing between legend items
          itemWidth: 12,
          itemHeight: 12
        }
      };

      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);

      this.request.get("/echarts/members").then(res => {
        option.series[0].data = res.data;
        option.series[1].data = res.data;
        myChart.setOption(option);
      });

      // Responsive resize
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },

    initPieChart() {
      var pieOption = {
        title: {
          text: 'Adoption Applications by Quarter',
          subtext: 'Proportion Chart',
          left: 'center',
          textStyle: {
            color: '#5D9CEC',
            fontSize: 18,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#97A8BE',
            fontSize: 14
          }
        },
        color: ['#FF9F43', '#5D9CEC', '#37CE8A', '#F56C6C'],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderColor: '#E6EBF5',
          textStyle: {
            color: '#333'
          },
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'center',
          textStyle: {
            color: '#666'
          },
          itemGap: 12, // Increase vertical spacing between legend items
          itemWidth: 12,
          itemHeight: 12
        },
        series: [
          {
            name: 'Adoption Applications',
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['60%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      };

      var pieDom = document.getElementById('pie');
      var pieChart = echarts.init(pieDom);

      this.request.get("/echarts/members").then(res => {
        pieOption.series[0].data = [
          {name: "Q1", value: res.data[0]},
          {name: "Q2", value: res.data[1]},
          {name: "Q3", value: res.data[2]},
          {name: "Q4", value: res.data[3]},
        ];
        pieChart.setOption(pieOption);
      });

      // Responsive resize
      window.addEventListener('resize', () => {
        pieChart.resize();
      });
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-color: #F5F7FA;
  min-height: calc(100vh - 60px);
}

.welcome-section {
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #e0b4aa 0%, #e0b4aa 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(93, 156, 236, 0.2);
}

.welcome-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.welcome-emoji {
  font-size: 32px;
}

.welcome-subtitle {
  margin: 8px 0 0;
  font-size: 16px;
  opacity: 0.9;
}

.welcome-card {
  margin-bottom: 40px;
}

.welcome-message-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background: white;
}

.welcome-content {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.welcome-icon {
  font-size: 60px;
  flex-shrink: 0;
}

.welcome-text h3 {
  margin: 0 0 10px;
  color: #333;
  font-size: 22px;
}

.system-description {
  margin: 0 0 15px;
  color: #666;
  font-size: 16px;
}

.custom-divider {
  margin: 15px 0;
  background-color: #E6EBF5;
}

.slogan {
  margin: 0;
  color: #5D9CEC;
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
}

.charts-section {
  margin-top: 20px;
}

.chart-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  background: white;
}

.chart {
  width: 100%;
  height: 400px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-container {
    padding: 15px;
  }

  .welcome-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-icon {
    font-size: 50px;
  }

  .chart {
    height: 300px;
  }

  /* Adjust legend position on mobile */
  ::v-deep #main .echarts-legend {
    bottom: 8% !important;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 15px;
  }

  .welcome-title {
    font-size: 20px;
  }

  .chart {
    height: 250px;
  }

  /* Further adjust legend position on small screens */
  ::v-deep #main .echarts-legend {
    bottom: 10% !important;
  }
}
</style>
