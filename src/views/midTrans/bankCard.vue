<template>
  <el-card class="cards" :class="tableParams.full ? 'fullScreen' : ''">
    <div slot="header">
      <TableSetting
        :tableParams="tableParams"
        :tableSettings="tableSettings"
        @changeFull="changeFull"
        @normalFullFlagChanged="normalFullFlagChanged"
      ></TableSetting>
    </div>
    <el-row :gutter="0" style="margin-bottom:10px">
      <el-form
        ref="queryForm"
        :model="queryForm"
        :rules="queryFormRules"
        size="small"
        label-position="right"
        label-width="185px"
        class="queryForm"
      >
        <!-- 收单机构系统内部商户编码 -->
        <el-col
          :span="6"
          :style="{ display: 1 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="收单机构系统内部商户编码:" prop="joinCode1">
            <el-input
              v-model="queryForm.joinCode1"
              placeholder="请输入收单机构系统内部商户编码"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <!-- 交易日期 -->
        <el-col
          :span="6"
          :style="{ display: 2 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易日期:" prop="transDate">
            <el-date-picker
              type="daterange"
              v-model="queryForm.transDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 交易时间 -->
        <el-col
          :span="6"
          :style="{ display: 3 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易时间:" prop="transTime">
            <el-time-picker
              v-model="queryForm.transTime"
              :style="{ width: '100%' }"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :picker-options="{ selectableRange: '00:00:00-23:59:59' }"
              placeholder="请选择交易时间"
              clearable
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <!-- 交易金额 -->
        <el-col
          :span="6"
          :style="{ display: 4 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易金额:" prop="transAmt">
            <el-input
              v-model="queryForm.transAmt"
              placeholder="请输入交易金额"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 交易币种 -->
        <el-col
          :span="6"
          :style="{ display: 5 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易币种:" prop="transCurrcyCode">
            <el-select
              v-model="queryForm.transCurrcyCode"
              placeholder="请选择交易类型"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in transCurrcyCodeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 资金收付标识 -->
        <el-col
          :span="6"
          :style="{ display: 6 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="资金收付标识:" prop="lendFlag">
            <el-select
              v-model="queryForm.lendFlag"
              placeholder="请选择资金收付标识"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in lendFlagOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 交易类型 -->
        <el-col
          :span="6"
          :style="{ display: 7 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易类型:" prop="transType">
            <el-select
              v-model="queryForm.transType"
              placeholder="请选择交易类型"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in transTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="display:inline-block">
          <el-form-item label-width="40px">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="submitQueryForm"
            >
              查 询
            </el-button>
            <el-button
              type="warning"
              icon="el-icon-refresh-right"
              size="small"
              @click="resetQueryForm('queryForm')"
            >
              重 置
            </el-button>
            <el-button type="text" size="small" @click="toggle">
              {{ expand ? '收起' : '展开'
              }}<i
                style="margin-left: 3px;"
                :class="expand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              ></i>
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      :size="tableSettings.tableSize"
      :border="tableSettings.borderChecked"
      :stripe="tableSettings.stripeChecked"
      :height="!tableParams.full ? normalFull : fullFull"
      lazy
      highlight-current-row
      :header-cell-style="{ background: '#e8f4ff', color: '#909399' }"
      v-loading="tableLoading"
      ref="multipleTable"
      class="tables"
      style="width: 100%;box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)"
      fit
    >
      <af-table-column
        :fixed="tableSettings.fixedChecked"
        type="index"
      ></af-table-column>
      <af-table-column
        :key="index"
        v-for="(item, index) in tableLabel"
        :prop="index"
        :label="index"
        align="center"
      ></af-table-column>
    </el-table>
    <el-empty
      v-else
      :style="{
        height: expand ? 'calc(100vh - 314px)' : 'calc(100vh - 271px)'
      }"
    >
    </el-empty>
    <el-pagination
      v-if="tableData.length > 0"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryParams.offset"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <app-footer v-if="!tableParams.full"></app-footer>
  </el-card>
</template>

<script>
import { bizQuery } from '@/api/dynamic/biz'
import TableSetting from '@/components/TableSetting'
import { midTransBankCard } from '@/assets/typeOptions.json'
export default {
  components: {
    TableSetting
  },
  data() {
    return {
      tableParams: {
        // 业务标识
        bizAlias: this.$route.meta.bizAlias,
        // 表Title
        headerTitle: this.$route.meta.title,
        // table全屏状态
        full: false,
        // 查询后的导出按钮
        queryExcel: false,
        // 导入导出是否禁用
        isExportDisabled: false,
        // 便于下载使用的表单
        exportQueryForm: {},
        // 是否固定表格高度
        normalFullFlag: true
      },
      // 表格加载
      tableLoading: true,
      // 表格数据
      tableData: [],
      // 分页默认值
      total: 0,
      // 查询参数
      queryParams: {
        // 分页偏移量
        offset: 1,
        // 分页大小
        limit: 20
      },
      // 搜索项合并
      expand: false,
      // 全屏后的table高度
      fullFull: 'calc(100vh - 202px)',
      // 正常table高度
      normalFull: 'calc(100vh - 323px)',
      // 表单label
      tableLabel: {},
      queryForm: {
        joinCode1: '', // 收单机构系统内部商户编码 字符型 50
        transDate: [], // 交易日期 日期型 8
        transTime: '', // 交易时间 时间型 6
        transAmt: '', // 交易金额 数值型 18
        transCurrcyCode: '', // 交易币种 数值型 3
        lendFlag: '', // 资金收付标识 字符型 2
        transType: '' // 交易类型 字符型 2
      },
      queryFormRules: {
        joinCode1: [],
        transDate: [],
        transTime: [],
        transAmt: [],
        transCurrcyCode: [],
        lendFlag: [],
        transType: []
      },
      // 交易币种
      transCurrcyCodeOptions: midTransBankCard.transCurrcyCodeOptions,
      // 资金收付标识
      lendFlagOptions: midTransBankCard.lendFlagOptions,
      // 交易类型
      transTypeOptions: midTransBankCard.transTypeOptions
    }
  },
  created() {
    this.bizQuery()
  },
  // watch: {
  //   '$store.getters.tableSettings.normalFullFlag': {
  //     handler(val, oldval) {
  //       if (!val) {
  //         this.normalFull = 'auto'
  //         console.log(456)
  //         // this.tableData.length > 0 ? 'calc(100vh - 323px)' : ''
  //       } else {
  //         this.expand = false
  //         this.normalFull = 'calc(100vh - 323px)'
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  computed: {
    count() {
      return this.expand ? 8 : 4
    },
    tableSettings() {
      return this.$store.getters.tableSettings
    }
  },
  methods: {
    // 表格初始化查询
    async bizQuery() {
      this.tableLoading = true
      await bizQuery(this.tableParams.bizAlias, this.queryParams)
        .then(result => {
          const { data, retCode, retMsg } = result.data

          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.$once('hook:beforeDestroy', () => {
              window.clearTimeout(this.timerLoading)
            })
            this.tableParams.isExportDisabled = false
            this.tableData = data.rows
            this.tableData.forEach(row => {
              this.tableLabel = row
            })
            this.total = data.total
            this.$message.success(
              '加载：' + this.queryParams.limit + '条/页，' + retMsg
            )
          } else {
            this.$message.error(retMsg)
            this.tableParams.isExportDisabled = true
          }
        })
        .catch(() => {
          this.$message.error(
            '业务标识：' +
              this.tableParams.bizAlias +
              '，表Title：' +
              this.tableParams.headerTitle +
              '查询失败'
          )
          this.tableParams.isExportDisabled = true
        })
    },
    // 监听pagesize改变的事件
    handleSizeChange(val) {
      console.log('🚀 ~ handleSizeChange ~ val', val)
      this.queryParams.limit = val
      this.queryParams.offset = 1
      this.bizQuery()
    },
    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.queryParams.offset = val
      console.log(this.queryParams.offset)
      this.bizQuery()
    },
    // 序号
    indexMethod(index) {
      return index + 1 + (this.queryParams.offset - 1) * this.queryParams.limit
    },

    // 查询切换收起展开
    toggle() {
      if (!this.tableParams.full) {
        if (this.tableParams.normalFullFlag) {
          if (this.normalFull === 'calc(100vh - 323px)') {
            this.normalFull = 'calc(100vh - 366px)'
          } else {
            this.normalFull = 'calc(100vh - 323px)'
          }
        } else {
          this.normalFull = ''
        }
      }
      if (this.tableParams.full) {
        if (this.fullFull === 'calc(100vh - 202px)') {
          this.fullFull = 'calc(100vh - 245px)'
        } else {
          this.fullFull = 'calc(100vh - 202px)'
        }
      }
      this.expand = !this.expand
    },
    // 查询按钮
    submitQueryForm() {
      const submitForm = this.$lodash.cloneDeep(this.queryForm)
      console.log(submitForm)
      if (submitForm.transDate !== null) {
        if (submitForm.transDate.length !== 0) {
          submitForm.transDate =
            submitForm.transDate[0] + ',' + submitForm.transDate[1]
          console.log(submitForm.transDate)
        }
      }
      // if (submitForm.closeTime !== null) {
      //   if (submitForm.closeTime.length !== 0) {
      //     submitForm.closeTime =
      //       submitForm.closeTime[0] + ',' + submitForm.closeTime[1]
      //   }
      // }
      // 便于查询后下载使用
      this.tableParams.exportQueryForm = submitForm
      console.log(
        'this.tableParams.exportQueryForm',
        this.tableParams.exportQueryForm
      )

      this.queryParams = this.$lodash.merge(this.queryParams, submitForm)

      console.log('submitForm', submitForm)
      console.log('queryParams', this.queryParams)
      this.bizQuery()
      this.tableParams.queryExcel = true

      // const serachForm = this.$lodash.omitBy(submitForm, e => e === '')

      // console.log(Object.keys(serachForm))
      // if (Object.keys(serachForm).length !== 0) {
      //   this.queryExcel = true
      // } else {
      //   this.queryExcel = false
      // }
    },
    // 重置查询条件
    resetQueryForm(formName) {
      this.tableParams.queryExcel = false
      this.queryParams = {
        // 分页偏移量
        offset: 0,
        // 分页大小
        limit: 20
      }
      this.$refs[formName].resetFields()
      this.bizQuery()
    },
    // 子组件传来的表格全屏
    changeFull() {
      this.expand = false
      this.fullFull = 'calc(100vh - 202px)'
      // this.normalFull = 'calc(100vh - 323px)'
      if (this.tableParams.normalFullFlag) {
        this.normalFull = 'calc(100vh - 323px)'
      } else {
        this.normalFull = ''
      }
      // this.normalFullFlagChanged()
      this.tableParams.full = !this.tableParams.full
    },
    // 设置是否固定高度
    normalFullFlagChanged(e) {
      // console.log(123)
      console.log(e)
      this.tableParams.normalFullFlag = e
      console.log(this.tableParams.normalFullFlag)
      // console.log(this.tableParams.normalFullFlag)
      if (this.tableParams.normalFullFlag) {
        this.expand = false
        this.normalFull = 'calc(100vh - 323px)'
      } else {
        this.normalFull = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
}
</style>
