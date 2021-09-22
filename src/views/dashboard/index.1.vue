<template>
  <el-card class="card" style="height: calc(100vh - 70px)">
    <el-row :gutter="20">
      <!-- <el-col :span="8">
        <div id="main" style="height: 40vh;width: 100%;overflow: hidden;"></div>
      </el-col>
      <el-col :span="8">
        <div id="main1" style="height:40vh;width: 100%;overflow: hidden;"></div>
      </el-col> -->
      <el-col :span="8">
        <div
          id="main2"
          style="height: 40vh;width: 100%;overflow: hidden;"
        ></div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      options: {
        title: {
          text: '测试'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      data: {
        grid: {
          bottom: '3%',
          containLabel: true,
          left: '3%',
          right: '4%'
        },
        legend: {
          data: ['华东', '华南', '华北', '西部', '其他']
        },
        series: [
          {
            areaStyle: {
              normal: {}
            },
            data: [6000, 13111, 4100, 3565, 3528, 6000],
            name: '华东',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [5000, 6000, 6500, 6000, 6400, 7800],
            name: '华南',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {},
            data: [16888, 11000, 8010, 12321, 13928, 11000],
            name: '华北',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [7000, 8000, 7777, 12903, 13098, 14028],
            name: '西部',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [8000, 7000, 10241, 14821, 15982, 14091],
            name: '其他',
            stack: '总量',
            type: 'line'
          }
        ],
        title: {
          text: '用户来源'
        },
        tooltip: {
          axisPointer: {
            label: {
              backgroundColor: '#E9EEF3'
            },
            type: 'cross'
          },
          trigger: 'axis'
        },
        xAxis: [
          {
            data: [
              '2021-4-1',
              '2021-5-1',
              '2021-6-1',
              '2021-7-1',
              '2021-8-1',
              '2021-9-1'
            ],
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      options1: {
        title: {
          text: '测试1'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      data1: {
        grid: {
          bottom: '3%',
          containLabel: true,
          left: '3%',
          right: '4%'
        },
        legend: {
          data: ['上海', '北京', '广州', '深圳', '其他']
        },
        series: [
          {
            areaStyle: {
              normal: {}
            },
            data: [1999, 88888, 4545, 2444, 7755, 4420],
            name: '上海',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [5090, 2500, 55555, 6000, 6400, 7800],
            name: '北京',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {},
            data: [6888, 4000, 8010, 33333, 13928, 12984],
            name: '广州',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [9991, 4130, 7777, 100, 13098, 14028],
            name: '深圳',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [15212, 5800, 10241, 14821, 15982, 477],
            name: '其他',
            stack: '总量',
            type: 'line'
          }
        ],
        title: {
          text: '用户来源'
        },
        tooltip: {
          axisPointer: {
            label: {
              backgroundColor: '#E9EEF3'
            },
            type: 'cross'
          },
          trigger: 'axis'
        },
        xAxis: [
          {
            data: [
              '2021-4-1',
              '2021-5-1',
              '2021-6-1',
              '2021-7-1',
              '2021-8-1',
              '2021-9-1'
            ],
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      options2: {
        title: {
          // text: '测试2'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      data2: {
        grid: {
          bottom: '3%',
          containLabel: true,
          left: '3%',
          right: '4%'
        },
        legend: {
          data: [
            '咸镜道',
            '平安道',
            '黄海道',
            '京畿道',
            '江原道',
            '忠清道',
            '全罗道',
            '庆尚道'
          ]
        },
        series: [
          {
            areaStyle: {
              normal: {}
            },
            data: [2999, 23111, 41200, 35625, 3528, 4400],
            name: '咸镜道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [5480, 22500, 3400, 6000, 6400, 2400],
            name: '平安道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {},
            data: [64288, 24000, 8010, 12321, 13928, 4284],
            name: '黄海道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [9191, 24130, 7777, 12403, 13098, 44028],
            name: '京畿道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [1522, 25800, 10241, 14821, 15924, 14091],
            name: '江原道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {},
            data: [6888, 24000, 8010, 33333, 13928, 12984],
            name: '忠清道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [9991, 4130, 7777, 100, 13098, 14028],
            name: '全罗道',
            stack: '总量',
            type: 'line'
          },
          {
            areaStyle: {
              normal: {}
            },
            data: [15212, 5800, 10241, 14821, 15982, 477],
            name: '庆尚道',
            stack: '总量',
            type: 'line'
          }
        ],
        title: {
          // text: '用户来源'
        },
        tooltip: {
          axisPointer: {
            label: {
              backgroundColor: '#E9EEF3'
            },
            type: 'cross'
          },
          trigger: 'axis'
        },
        xAxis: [
          {
            data: [
              '2021-4-1',
              '2021-5-1',
              '2021-6-1',
              '2021-7-1',
              '2021-8-1',
              '2021-9-1'
            ],
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  mounted() {
    // var myChart = echarts.init(document.getElementById('main'))
    // var myChart1 = echarts.init(document.getElementById('main1'))
    var myChart2 = echarts.init(document.getElementById('main2'))
    // const res = this.$lodash.merge(this.data, this.options)
    // const res1 = this.$lodash.merge(this.data1, this.options1)
    const res2 = this.$lodash.merge(this.data2, this.options2)
    // myChart.setOption(res)
    // myChart1.setOption(res1)
    myChart2.setOption(res2)
  },
  methods: {
    async getReport() {}
  }
}
</script>
