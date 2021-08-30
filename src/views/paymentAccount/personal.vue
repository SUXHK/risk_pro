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
        class="queryForm"
      >
        <!-- 客户编号 -->
        <el-col
          :span="6"
          :style="{ display: 1 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="129px" label="客户编号:" prop="joinCode1">
            <el-input
              v-model="queryForm.joinCode1"
              placeholder="请输入客户编号"
              clearable
              :style="{ width: '80%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 账户名称 -->
        <el-col
          :span="6"
          :style="{ display: 2 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="213px" label="账户名称:" prop="accName">
            <el-input
              v-model="queryForm.accName"
              placeholder="请输入账户名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 账户账号 -->
        <el-col
          :span="6"
          :style="{ display: 3 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="160px" label="账户账号:" prop="accNo">
            <el-input
              v-model="queryForm.accNo"
              placeholder="请输入账户账号"
              clearable
              :style="{ width: '90%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 账户类型 -->
        <el-col
          :span="6"
          :style="{ display: 4 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="73px" label="账户类型:" prop="accType">
            <el-select
              v-model="queryForm.accType"
              placeholder="请选择账户类型"
              clearable
              :style="{ width: '70%' }"
            >
              <el-option
                v-for="(item, index) in accTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 开户日期 -->
        <el-col
          :span="6"
          :style="{ display: 5 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="129px" label="开户日期:" prop="openDate">
            <el-date-picker
              type="daterange"
              v-model="queryForm.openDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '80%' }"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 开户时间 -->
        <el-col
          :span="6"
          :style="{ display: 6 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="213px" label="开户时间:" prop="openTime">
            <el-time-picker
              v-model="queryForm.openTime"
              :style="{ width: '100%' }"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :picker-options="{ selectableRange: '00:00:00-23:59:59' }"
              placeholder="请选择开户时间"
              clearable
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <!-- 销户日期 -->
        <el-col
          :span="6"
          :style="{ display: 7 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="160px" label="销户日期:" prop="closeDate">
            <el-date-picker
              type="daterange"
              v-model="queryForm.closeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '90%' }"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 销户时间 -->
        <el-col
          :span="6"
          :style="{ display: 8 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="73px" label="销户时间:" prop="closeTime">
            <el-time-picker
              v-model="queryForm.closeTime"
              :style="{ width: '70%' }"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :picker-options="{ selectableRange: '00:00:00-23:59:59' }"
              placeholder="请选择销户时间"
              clearable
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <!-- 账户状态 -->
        <el-col
          :span="6"
          :style="{ display: 9 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="129px" label="账户状态:" prop="accState">
            <el-select
              v-model="queryForm.accState"
              placeholder="请选择账户状态"
              clearable
              :style="{ width: '80%' }"
            >
              <el-option
                v-for="(item, index) in accStateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 身份证件号码 -->
        <el-col
          :span="6"
          :style="{ display: 10 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="213px" label="身份证件号码:" prop="idNo">
            <el-input
              v-model="queryForm.idNo"
              placeholder="请输入身份证件号码"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 客户所属国家(地区) -->
        <el-col
          :span="6"
          :style="{ display: 11 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="160px"
            label="客户所属国家(地区):"
            prop="nation"
          >
            <el-select
              v-model="queryForm.nation"
              placeholder="请选择客户所属国家(地区)"
              clearable
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="(item, index) in nationOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 绑定标识 -->
        <el-col
          :span="6"
          :style="{ display: 12 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="73px"
            label="绑定标识:"
            prop="connectSymbol"
          >
            <el-select
              v-model="queryForm.connectSymbol"
              placeholder="请选择绑定标识"
              clearable
              :style="{ width: '70%' }"
            >
              <el-option
                v-for="(item, index) in connectSymbolOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 绑定银行账户日期 -->
        <el-col
          :span="6"
          :style="{ display: 13 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="129px"
            label="绑定银行账户日期:"
            prop="connectDate"
          >
            <el-date-picker
              type="daterange"
              v-model="queryForm.connectDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '80%' }"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="-"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 已解除绑定的银行账户解绑日期 -->
        <el-col
          :span="6"
          :style="{ display: 14 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="213px"
            label="已解除绑定的银行账户解绑日期:"
            prop="unboundDate"
          >
            <el-date-picker
              type="daterange"
              v-model="queryForm.unboundDate"
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

        <!-- 占位符 -->
        <el-col
          :span="6"
          :style="{ display: 15 < count ? 'inline-block' : 'none' }"
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
import { paymentAccountPersonal } from '@/assets/selectoptions/paymentAccount/personal'
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
        joinCode1: '', // 客户编号 字符型 50
        accName: '', // 账户名称 字符型 80
        accNo: '', // 账户账号 字符型 60
        accType: '', // 账户类型 字符型 2
        openDate: [], // 开户日期 日期型 8
        openTime: '', // 开户时间 时间型 6
        closeDate: [], // 销户日期 日期型 8
        closeTime: '', // 销户时间 时间型 6
        accState: '', // 账户状态 字符型 2
        idNo: '', // 身份证件号码 字符型 50
        nation: '', // 客户所属国家(地区) 字符型 3
        connectSymbol: '', // 绑定标识 字符型 2
        connectDate: [], // 绑定银行账户日期 日期型 134
        unboundDate: [] // 已解除绑定的银行账户解绑日期 日期型 134
      },
      queryFormRules: {
        joinCode1: [], // 客户编号 字符型 50
        accName: [], // 客户编号 字符型 80
        accNo: [], // 账户账号 字符型 60
        accType: [], // 账户类型 字符型 2
        openDate: [], // 开户日期 日期型 8
        openTime: [], // 开户时间 时间型 6
        closeDate: [], // 销户日期 日期型 8
        closeTime: [], // 销户时间 时间型 6
        accState: [], // 账户状态 字符型 2
        idNo: [], // 身份证件号码 字符型 50
        nation: [], // 客户所属国家(地区) 字符型 3
        connectSymbol: [], // 绑定标识 字符型 2
        connectDate: [], // 绑定银行账户日期 日期型 134
        unboundDate: [] // 已解除绑定的银行账户解绑日期 日期型 134
      },
      // 账户类型
      accTypeOptions: paymentAccountPersonal.accTypeOptions,
      // 账户状态
      accStateOptions: paymentAccountPersonal.accStateOptions,
      // 客户所属国家(地区)
      nationOptions: paymentAccountPersonal.nationOptions,
      // 绑定标识
      connectSymbolOptions: paymentAccountPersonal.connectSymbolOptions
    }
  },
  created() {
    this.bizQuery()
  },
  computed: {
    count() {
      return this.expand ? 16 : 4
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
            this.tableLabel = Object.keys(this.tableData[0])
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
          if (this.normalFull === 'calc(100vh - 319px)') {
            this.normalFull = 'calc(100vh - 448px)'
          } else {
            this.normalFull = 'calc(100vh - 319px)'
          }
        }
      }
      if (this.tableParams.full) {
        if (this.fullFull === 'calc(100vh - 195px)') {
          // this.fullFull = 'calc(100vh - 283px)'
          this.fullFull = 'calc(100vh - 324px)'
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
      if (submitForm.openDate !== null) {
        if (submitForm.openDate.length !== 0) {
          submitForm.openDate =
            submitForm.openDate[0] + ',' + submitForm.openDate[1]
          console.log(submitForm.openDate)
        }
      }
      if (submitForm.closeDate !== null) {
        if (submitForm.closeDate.length !== 0) {
          submitForm.closeDate =
            submitForm.closeDate[0] + ',' + submitForm.closeDate[1]
          console.log(submitForm.closeDate)
        }
      }
      if (submitForm.connectDate !== null) {
        if (submitForm.connectDate.length !== 0) {
          submitForm.connectDate =
            submitForm.connectDate[0] + ',' + submitForm.connectDate[1]
          console.log(submitForm.connectDate)
        }
      }
      if (submitForm.unboundDate !== null) {
        if (submitForm.unboundDate.length !== 0) {
          submitForm.unboundDate =
            submitForm.unboundDate[0] + ',' + submitForm.unboundDate[1]
          console.log(submitForm.unboundDate)
        }
      }

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
