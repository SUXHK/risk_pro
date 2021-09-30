<template>
  <div class="index-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <a target="_blank" href="https://github.com/SUXHK">
              <img
                style="margin-right: 10px"
                src="https://img.shields.io/badge/SUXH-%E8%8B%8F%E6%98%9F%E6%B2%B3-green"
              />
            </a>
            <p>
              Create By SUXH，<a target="_blank" href="https://github.com/SUXHK"
                >欢迎访问作者 Github</a
              >
            </p>
          </div>
        </el-alert>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <i class="el-icon-warning-outline" style="margin-right:5px"></i>
            <span>总交易</span>
          </div>
          <vab-chart autoresize theme="vab-echarts-theme" :option="fwl" />
          <div class="bottom">
            <span>
              总交易:
              <vab-count
                style="font-size:18px;font-weight:bold"
                :start-val="config1.startVal"
                :end-val="config1.endVal"
                :duration="config1.duration"
                :separator="config1.separator"
                :prefix="config1.prefix"
                :suffix="config1.suffix"
                :decimals="config1.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <i class="el-icon-warning-outline" style="margin-right:5px"></i>
            <span>交易次数</span>
          </div>
          <vab-chart autoresize theme="vab-echarts-theme" :option="sqs" />
          <div class="bottom">
            <span>
              交易次数:
              <vab-count
                style="font-size:18px;font-weight:bold"
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <plan></plan>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        style="margin-top:10px;"
      >
        <el-card shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <div style="text-align: center">
            <!-- <vab-colorful-icon style="font-size: 140px" icon-class="vab" /> -->
            <img src="~@/assets/images/sand.png" alt="" width="150px" />
            <h1 style="font-size: 30px">
              Copyright © Sand Risk Control Management System
            </h1>
          </div>
          <div v-for="(item, index) in noticeList" :key="index">
            <el-alert
              v-if="index !== 0"
              :title="item.title"
              :type="item.type"
              :closable="item.closable"
              >简介~</el-alert
            >
            <br />
          </div>
          <el-alert :closable="false" type="info" title="当前浏览器版本："
            ><strong
              ><h3>{{ userAgent }}</h3></strong
            ></el-alert
          >
        </el-card>
        <!-- <version-information></version-information> -->
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        style="margin-top:10px;"
      >
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>前端依赖信息</span>
            <!-- <div style="float: right"></div> -->
            <!-- <el-tag>部署时间:{{ updateTime }}</el-tag> -->
            <el-button style="float: right; padding: 3px 0" type="text"
              >前端部署时间：{{ updateTime }}</el-button
            >
          </div>
          <table class="table">
            <tr>
              <td>@vue/cli版本</td>
              <td>{{ devDependencies['@vue/cli-service'] }}</td>
              <td>vue版本</td>
              <td>{{ dependencies['vue'] }}</td>
            </tr>
            <tr>
              <td>vuex版本</td>
              <td>{{ dependencies['vuex'] }}</td>
              <td>vue-router版本</td>
              <td>{{ dependencies['vue-router'] }}</td>
            </tr>
            <tr>
              <td>element-ui版本</td>
              <td>{{ dependencies['element-ui'] }}</td>
              <td>axios版本</td>
              <td>{{ dependencies['axios'] }}</td>
            </tr>
            <tr>
              <td>eslint版本</td>
              <td>{{ devDependencies['eslint'] }}</td>
              <td>sass版本</td>
              <td>{{ devDependencies['sass'] }}</td>
            </tr>
            <tr>
              <td>dayjs版本</td>
              <td>{{ dependencies['dayjs'] }}</td>
              <td>lodash版本</td>
              <td>{{ dependencies['lodash'] }}</td>
            </tr>
            <tr>
              <td>v-fit-columns版本</td>
              <td>{{ dependencies['v-fit-columns'] }}</td>
              <td>svg-sprite版本</td>
              <td>{{ devDependencies['svg-sprite-loader'] }}</td>
            </tr>
          </table>
        </el-card>
        <el-card class="card" shadow="never" style="margin-top:10px;">
          <div slot="header">
            <span>后端依赖信息</span>
            <!-- <div style="float: right"></div> -->
            <!-- <el-tag>部署时间:{{ updateTime }}</el-tag> -->
            <el-button style="float: right; padding: 3px 0" type="text"
              >后端部署时间：Null</el-button
            >
          </div>
          <table class="table">
            <tr>
              <td>JDK版本</td>
              <td>1.8</td>
              <td>Nginx版本</td>
              <td>Null</td>
            </tr>
            <tr>
              <td>Spring版本</td>
              <td>Null</td>
              <td>SQL版本</td>
              <td>Null</td>
            </tr>
          </table>
        </el-card>
        <!-- <version-information></version-information> -->
      </el-col>
    </el-row>
    <app-footer class="footer"></app-footer>
  </div>
</template>

<script>
import VabChart from '@/plugins/echarts'
import { dependencies, devDependencies } from '../../../package.json'
import Plan from './components/Plan'
// import VersionInformation from './components/VersionInformation'

export default {
  name: 'Index',
  components: {
    VabChart,
    Plan
    // VersionInformation
  },
  data() {
    return {
      timer: 0,
      updateTime: process.env.VUE_APP_UPDATE_TIME,
      nodeEnv: process.env.NODE_ENV,
      dependencies: dependencies,
      devDependencies: devDependencies,
      config1: {
        startVal: 0,
        endVal: this.$lodash.random(20000, 60000),
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 8000
      },
      config2: {
        startVal: 0,
        endVal: this.$lodash.random(1000, 20000),
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 8000
      },
      config3: {
        startVal: 0,
        endVal: this.$lodash.random(1000, 20000),
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 8000
      },

      // 访问量
      fwl: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '访问量',
            type: 'line',
            data: [],
            smooth: true,
            areaStyle: {}
          }
        ]
      },
      // 测试
      sqs: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // /*boundaryGap: false,*/
            data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量（测试）',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 20, 33, 39, 33, 22]
          }
        ]
      },
      // 词云
      cy: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%'
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 15,
            sizeRange: [12, 40],
            rotationRange: [0, 0],
            width: '100%',
            height: '100%',
            textStyle: {
              normal: {
                color() {
                  const arr = [
                    '#6672fb',
                    '#91cc75',
                    '#fac858',
                    '#ee6666',
                    '#73c0de',
                    '#975FE5'
                  ]
                  // eslint-disable-next-line prefer-const
                  let index = Math.floor(Math.random() * arr.length)
                  return arr[index]
                }
              }
            },
            data: [
              {
                name: 'vue-admin-beautiful',
                value: 15000
              },
              {
                name: 'element',
                value: 10081
              },
              {
                name: 'beautiful',
                value: 9386
              },

              {
                name: 'vue',
                value: 6500
              },
              {
                name: 'chuzhixin',
                value: 6000
              },
              {
                name: 'good',
                value: 4500
              },
              {
                name: 'success',
                value: 3800
              },
              {
                name: 'never',
                value: 3000
              },
              {
                name: 'boy',
                value: 2500
              },
              {
                name: 'girl',
                value: 2300
              },
              {
                name: 'github',
                value: 2000
              },
              {
                name: 'hbuilder',
                value: 1900
              },
              {
                name: 'dcloud',
                value: 1800
              },
              {
                name: 'china',
                value: 1700
              },
              {
                name: '1204505056',
                value: 1600
              },
              {
                name: '972435319',
                value: 1500
              },
              {
                name: 'young',
                value: 1200
              },
              {
                name: 'old',
                value: 1100
              },
              {
                name: 'vuex',
                value: 900
              },
              {
                name: 'router',
                value: 800
              },
              {
                name: 'money',
                value: 700
              },
              {
                name: 'qingdao',
                value: 800
              },
              {
                name: 'yantai',
                value: 9000
              },
              {
                name: 'author is very cool',
                value: 9200
              }
            ]
          }
        ]
      },

      // 更新日志
      reverse: true,
      activities: [],
      noticeList: [],
      // 其他信息
      userAgent: navigator.userAgent,

      getList: [
        {
          content: '凌晨两点，我累了，移除无用组件，精简package',
          timestamp: '2020-10-02'
        },
        {
          content: '富文本编辑器支持精细化配置',
          timestamp: '2020-10-20'
        },
        {
          content: '公共布局支持自动导出',
          timestamp: '2020-10-23'
        },
        {
          content: '遮罩添加高斯模糊',
          timestamp: '2020-10-25'
        },
        {
          content: 'vue3.0 + element-plus版本正式上线',
          timestamp: '2020-12-5'
        },
        {
          content: '完成首页重构，跟进echarts 5.0',
          timestamp: '2020-12-7'
        },
        {
          content: '更新sass版本至最新',
          timestamp: '2021-1-7'
        },
        {
          content: '更新vue-echarts版本至最新,options变更为option',
          timestamp: '2021-2-23'
        },
        {
          content: '开源版品牌名升级为vue-admin-beautiful-pro，',
          timestamp: '最近更新'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted() {
    // eslint-disable-next-line prefer-const
    let base = +new Date(2020, 1, 1)
    // eslint-disable-next-line prefer-const
    let oneDay = 24 * 3600 * 1000
    // eslint-disable-next-line prefer-const
    let date = []

    // eslint-disable-next-line prefer-const
    let data = [Math.random() * 1500]
    let now = new Date(base)

    const addData = shift => {
      now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      date.push(now)
      data.push(this.$lodash.random(20000, 60000))

      if (shift) {
        date.shift()
        data.shift()
      }

      now = new Date(+new Date(now) + oneDay)
    }

    for (let i = 1; i < 6; i++) {
      addData()
    }
    addData(true)
    this.fwl.xAxis[0].data = date
    this.fwl.series[0].data = data
    this.timer = setInterval(() => {
      addData(true)
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
    }, 3000)
    setInterval(() => {
      this.sqs.series[0].data = [
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100,
        Math.floor(Math.random() * (100 - 1)) + 100
      ]
    }, 3000)
    setInterval(() => {
      this.config1.endVal = Math.floor(Math.random() * (1000 - 1)) + 1000
      this.config2.endVal = Math.floor(Math.random() * (1000 - 1)) + 1000
    }, 16000)
  },
  methods: {
    handleClick(e) {
      this.$message.success(`点击了${e.name},这里可以写跳转`)
    },
    handleZrClick(e) {},
    handleChangeTheme() {
      // this.$baseEventBus.$emit('theme')
    },
    async fetchData() {
      const data = this.getList
      data.map((item, index) => {
        if (index === data.length - 1) {
          item.color = '#0bbd87'
        }
      })
      this.activities = data

      this.noticeList = [
        {
          _id: '60fd73529b33ed00017eac32',
          title:
            "温馨提示：集成版虽功能丰富，但冗余依赖过多，建议开发时使用基础版进行开发， 中秋特惠：<a target='_blank' href='http://vue-admin-beautiful.com/authorization'>点我获取优惠福利</a>",
          closable: true,
          type: 'success'
        },

        {
          _id: '60fd73a33a9af40001fb586b',
          title: '欢迎使用杉德风控管理系统！',
          closable: false,
          type: 'success'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  ::v-deep {
    .el-alert {
      padding: $base-padding;

      &--info.is-light {
        min-height: 82px;
        padding: $base-padding;
        margin-bottom: 10px;
        color: #909399;
        background-color: $base-color-white;
        border: 1px solid #ebeef5;
      }
    }

    .el-card__body {
      .echarts {
        width: 100%;
        height: 160px;
      }
    }
  }

  .card {
    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
      }
    }
  }

  .bottom {
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid $base-border-color;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }

  .icon-panel {
    height: 117px;
    text-align: center;
    cursor: pointer;

    svg {
      font-size: 40px;
    }

    p {
      margin-top: 10px;
    }
  }

  .bottom-btn {
    button {
      margin: 5px 10px 15px 0;
    }
  }
}
</style>
