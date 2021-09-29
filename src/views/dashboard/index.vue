<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="12">
      <el-col
        :sm="24"
        :xs="24"
        :md="6"
        :xl="6"
        :lg="6"
        :style="{ marginBottom: '8px' }"
      >
        <chart-card title="金额" total="￥126,560">
          <el-tooltip
            slot="action"
            class="item"
            effect="dark"
            content="指标说明"
            placement="top-start"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <trend flag="top" style="margin-right: 16px;" rate="12">
              <span slot="term">周同比</span>
            </trend>
            <trend flag="bottom" rate="11">
              <span slot="term">日同比</span>
            </trend>
          </div>
          <template slot="footer">全部金额<span>￥ 234.56</span></template>
        </chart-card>
      </el-col>
      <el-col
        :sm="24"
        :xs="24"
        :md="6"
        :xl="6"
        :lg="6"
        :style="{ marginBottom: '8px' }"
      >
        <chart-card title="访问量" :total="8846">
          <el-tooltip
            slot="action"
            class="item"
            effect="dark"
            content="指标说明"
            placement="top-start"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <!-- <mini-area /> -->
          </div>
          <template slot="footer"
            >日访问量<span> {{ '1234' }}</span></template
          >
        </chart-card>
      </el-col>
      <el-col
        :sm="24"
        :xs="24"
        :md="6"
        :xl="6"
        :lg="6"
        :style="{ marginBottom: '8px' }"
      >
        <chart-card title="支付笔数" :total="6560">
          <el-tooltip
            slot="action"
            class="item"
            effect="dark"
            content="指标说明"
            placement="top-start"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-bar />
          </div>
          <template slot="footer">转化率 <span>60%</span></template>
        </chart-card>
      </el-col>
      <el-col
        :sm="24"
        :xs="24"
        :md="6"
        :xl="6"
        :lg="6"
        :style="{ marginBottom: '8px' }"
      >
        <chart-card title="运营活动效果" total="78%">
          <el-tooltip
            slot="action"
            class="item"
            effect="dark"
            content="指标说明"
            placement="top-start"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <mini-progress
              color="rgb(19, 194, 194)"
              :target="80"
              :percentage="78"
              height="8px"
            />
          </div>
          <template slot="footer">
            <trend flag="top" style="margin-right: 16px;" rate="12">
              <span slot="term">同周比</span>
            </trend>
            <trend flag="bottom" rate="80">
              <span slot="term">日环比</span>
            </trend>
          </template>
        </chart-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="card" shadow="never">
          <div
            slot="header"
            style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
          >
            <span
              style="color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;"
              >依赖信息</span
            >
            <el-tag>前端部署时间：{{ updateTime }}</el-tag>
            <!-- <div style="float: right">部署时间:{{ updateTime }}</div> -->
          </div>
          <div class="bottom-btn"></div>
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
      </el-col>
      <el-col :span="12">
        <el-card>
          <rank-list title="地区分布" :list="rankList" />
        </el-card>
      </el-col>
    </el-row>
    正再做...
    <el-card class="footer-card">
      <app-footer class="top-footer"></app-footer>
    </el-card>
  </div>
</template>

<script>
// import VCharts from 'v-charts'
import ChartCard from './ChartCard.vue'
import Trend from './Trend.vue'
// import MiniArea from './MiniArea.vue'
import MiniBar from './MiniBar.vue'
import MiniProgress from './MiniProgress.vue'
import RankList from './RankList.vue'
import { dependencies, devDependencies } from '../../../package.json'
// import Bar from './Bar.vue'
// import VabChart from '@/plugins/echarts'
// import VabCount from 'zx-count'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '上海分公司 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'DashboardAdmin',
  components: {
    // VCharts,
    ChartCard,
    Trend,
    // MiniArea,
    MiniBar,
    MiniProgress,
    RankList
    // VabCount,
    // VabChart
    // Bar
  },
  data() {
    return {
      barData,
      barData2,
      rankList,
      devDependencies: devDependencies,
      dependencies: dependencies,
      updateTime: process.env.VUE_APP_UPDATE_TIME
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.top-footer {
  margin-top: 0 !important;
}
.footer-card {
  .el-card__body {
    padding: 0 !important;
  }
}
.dashboard-editor-container {
  // height: 100vh;
  // padding: 8px 9px;
  // padding: 5px;
  background-color: rgb(240, 242, 245);
  // position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

// /deep/ .el-tabs__item {
//   padding-left: 16px !important;
//   height: 50px;
//   line-height: 50px;
// }

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
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
</style>
