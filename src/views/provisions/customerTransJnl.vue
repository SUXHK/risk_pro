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
        <!-- 账户账号 -->
        <el-col
          :span="6"
          :style="{ display: 1 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="账户账号:" prop="accNo">
            <el-input
              v-model="queryForm.accNo"
              placeholder="请输入账户账号"
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
              placeholder="请选择交易币种"
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
        <!-- 交易对方账号 -->
        <el-col
          :span="6"
          :style="{ display: 7 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易对方账号:" prop="partAccNo">
            <el-input
              v-model="queryForm.partAccNo"
              placeholder="请输入交易对方账号"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 交易对方账户开户银行 -->
        <el-col
          :span="6"
          :style="{ display: 8 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="交易对方账户开户银行:" prop="openBankName">
            <el-input
              v-model="queryForm.openBankName"
              placeholder="请输入交易对方账户开户银行"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 占位符 -->
        <el-col
          :span="6"
          :style="{ display: 9 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label=""> </el-form-item>
        </el-col>
        <!-- 占位符 -->
        <el-col
          :span="6"
          :style="{ display: 10 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label=""> </el-form-item>
        </el-col>
        <!-- 占位符 -->
        <el-col
          :span="6"
          :style="{ display: 11 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label=""> </el-form-item>
        </el-col>

        <el-col :span="6" style="display:inline-block">
          <el-form-item label-width="80px">
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
      :data="tableData"
      :size="tableSettings.tableSize"
      :border="tableSettings.borderChecked"
      :stripe="tableSettings.stripeChecked"
      :height="!tableParams.full ? normalFull : fullFull"
      highlight-current-row
      :header-cell-style="{
        background: tableParams.full ? '#e7eaff' : '',
        color: '#909399'
      }"
      v-loading="tableLoading"
      element-loading-text="表格加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      ref="multipleTable"
      class="tables"
      style="width: 100%;box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)"
    >
      <af-table-column
        v-if="total > 0"
        :fixed="tableSettings.fixedChecked"
        type="index"
        label="No."
        align="center"
        :index="indexMethod"
        width="100%"
      ></af-table-column>
      <af-table-column
        v-for="item in tableLabel"
        :key="item"
        :prop="item"
        :label="item"
        align="center"
      >
      </af-table-column>
    </el-table>
    <el-pagination
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
import { provisionsCustomerTransJnl } from '@/assets/selectoptions/provisions/customerTransJnl'
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
      fullFull: 'calc(100vh - 195px)',
      // 正常table高度
      normalFull: 'calc(100vh - 319px)',
      // 表单label
      tableLabel: {},
      queryForm: {
        accNo: '', // 账户账号 acc_no字符型60
        transDate: [], // 交易日期 trans_date日期型8
        transTime: '', // 交易时间 trans_time时间型6
        transAmt: '', // 交易金额 trans_amt数值型18
        transCurrcyCode: '', // 交易币种 trans_currcy_code数值型3
        lendFlag: '', // 资金收付标识 lend_flag字符型2
        partAccNo: '', // 交易对方账号 part_acc_no字符型60
        openBankName: '' // 交易对方账户开户银行 open_bank_name字符型80
      },
      queryFormRules: {
        accNo: [], // 账户账号acc_no字符型60
        transDate: [], // 交易日期trans_date日期型8
        transTime: [], // 交易时间trans_time时间型6
        transAmt: [], // 交易金额trans_amt数值型18
        transCurrcyCode: [], // 交易币种trans_currcy_code数值型3
        lendFlag: [], // 资金收付标识lend_flag字符型2
        partAccNo: [], // 交易对方账号part_acc_no字符型60
        openBankName: [] // 交易对方账户开户银行open_bank_name字符型80
      },
      // 交易类型
      transCurrcyCodeOptions: provisionsCustomerTransJnl.transCurrcyCodeOptions,
      // 资金收付标识
      lendFlagOptions: provisionsCustomerTransJnl.lendFlagOptions
    }
  },
  created() {
    this.bizQuery()
  },
  computed: {
    count() {
      return this.expand ? 12 : 4
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
          console.log(result)

          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.$once('hook:beforeDestroy', () => {
              window.clearTimeout(this.timerLoading)
            })
            this.tableData = data.rows

            // this.tableLabel = this.tableData[0]
            if (data.rows.length > 0) {
              this.tableLabel = Object.keys(this.tableData[0])
              this.$message.success(
                '加载：' + this.queryParams.limit + '条/页，' + retMsg
              )

              this.tableParams.isExportDisabled = false
            } else {
              this.tableParams.isExportDisabled = true
            }

            // this.tableData.forEach(row => {
            //   this.tableLabel = row
            // })
            this.total = data.total
            // if (this.total > 0) {
            //   this.tableParams.isExportDisabled = false
            // } else {
            //   this.tableParams.isExportDisabled = true
            // }
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
          if (this.normalFull === 'calc(100vh - 319px)') {
            this.normalFull = 'calc(100vh - 405px)'
          } else {
            this.normalFull = 'calc(100vh - 319px)'
          }
        }
      }
      if (this.tableParams.full) {
        if (this.fullFull === 'calc(100vh - 195px)') {
          // this.fullFull = 'calc(100vh - 283px)'
          this.fullFull = 'calc(100vh - 281px)'
        } else {
          this.fullFull = 'calc(100vh - 195px)'
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

      //     // console.log(submitForm.closeTime)
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
    },
    // 重置查询条件
    resetQueryForm(formName) {
      this.tableParams.queryExcel = false
      this.queryParams = {
        // 分页偏移量
        offset: 1,
        // 分页大小
        limit: 20
      }
      this.$refs[formName].resetFields()
      this.bizQuery()
    },
    // 子组件传来的表格全屏
    changeFull() {
      this.expand = false
      this.fullFull = 'calc(100vh - 195px)'
      if (this.tableParams.normalFullFlag) {
        console.log(123)
        this.normalFull = 'calc(100vh - 319px)'
      } else {
        this.normalFull = ''
      }
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
        this.normalFull = 'calc(100vh - 319px)'
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
