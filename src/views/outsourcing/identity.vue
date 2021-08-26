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
        label-width="210px"
        class="queryForm"
      >
        <!-- 外包服务业务种类 -->
        <el-col
          :span="6"
          :style="{ display: 1 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="外包服务业务种类:" prop="profType">
            <el-select
              v-model="queryForm.profType"
              placeholder="请选择外包服务业务种类"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in profTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 外包服务机构名称 -->
        <el-col
          :span="6"
          :style="{ display: 2 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="外包服务机构名称:" prop="contrName">
            <el-input
              v-model="queryForm.contrName"
              placeholder="请输入外包服务机构名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 外包服务机构类型 -->
        <el-col
          :span="6"
          :style="{ display: 3 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="外包服务机构类型:" prop="accType">
            <el-select
              v-model="queryForm.accType"
              placeholder="请选择外包服务机构类型"
              clearable
              :style="{ width: '100%' }"
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
        <!-- 依法设立或经营登记证件号码 -->
        <el-col
          :span="6"
          :style="{ display: 4 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="依法设立或经营登记证件号码:" prop="license">
            <el-input
              v-model="queryForm.license"
              placeholder="请输入依法设立或经营登记证件号码"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 依法设立或经营登记证件有效期截止日 -->
        <el-col
          :span="6"
          :style="{ display: 5 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="建立业务关系日期:" prop="licenseDeadline">
            <el-date-picker
              type="daterange"
              v-model="queryForm.licenseDeadline"
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
        <!-- 法定代表人或负责人姓名 -->
        <el-col
          :span="6"
          :style="{ display: 6 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="法定代表人或负责人姓名:" prop="idName">
            <el-input
              v-model="queryForm.idName"
              placeholder="请输入法定代表人或负责人姓名"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 法定代表人或负责人证件有效期截止日 -->
        <el-col
          :span="6"
          :style="{ display: 7 < count ? 'inline-block' : 'none' }"
          class="queryForm-one-txt-cut"
          title="法定代表人或负责人证件有效期截止日"
        >
          <el-form-item
            label="法定代表人或负责人证件有效期截止日:"
            prop="idDeadline"
            label-width="254px"
          >
            <el-date-picker
              type="daterange"
              v-model="queryForm.idDeadline"
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
        <!-- 建立业务关系日期 -->
        <el-col
          :span="6"
          :style="{ display: 8 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="建立业务关系日期:" prop="creationTime">
            <el-date-picker
              type="daterange"
              v-model="queryForm.creationTime"
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
        <!-- 撤销（终止业务关系）日期 -->
        <el-col
          :span="6"
          :style="{ display: 9 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label="撤销（终止业务关系）日期:" prop="cancelTime">
            <el-date-picker
              type="daterange"
              v-model="queryForm.cancelTime"
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
        <!-- 外包服务机构分润结算账户类型 -->
        <el-col
          :span="6"
          :style="{ display: 10 < count ? 'inline-block' : 'none' }"
          class="queryForm-one-txt-cut"
          title="外包服务机构分润结算账户类型"
        >
          <el-form-item label="外包服务机构分润结算账户类型:" prop="cooAccType">
            <el-select
              v-model="queryForm.cooAccType"
              placeholder="请选择外包服务机构分润结算账户类型"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in cooAccTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
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
      lazy
      highlight-current-row
      :header-cell-style="{
        background: tableParams.full ? '#e7eaff' : '',
        color: '#909399'
      }"
      v-loading="tableLoading"
      ref="multipleTable"
      class="tables"
      style="width: 100%;box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)"
      fit
    >
      <af-table-column
        v-if="total > 0"
        :fixed="tableSettings.fixedChecked"
        type="index"
        label="#"
        :index="indexMethod"
      ></af-table-column>
      <af-table-column
        :key="index"
        v-for="(item, index) in tableLabel"
        :prop="index"
        :label="index"
        align="center"
      ></af-table-column>
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
import { outsourcingIdentity } from '@/assets/selectoptions/outsourcing/identity'
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
        profType: '', // 外包服务业务种类 字符型 2
        contrName: '', // 外包服务机构名称 字符型 80
        accType: '', // 外包服务机构类型 字符型 2
        license: '', // 依法设立或经营登记证件号码 字符型 50
        licenseDeadline: [], // 依法设立或经营登记证件有效期截止日 日期型 8
        idName: '', // 法定代表人或负责人姓名 字符型 50
        idDeadline: [], // 法定代表人或负责人证件有效期截止日 日期型 8
        creationTime: [], // 建立业务关系日期 日期型 8
        cancelTime: [], // 撤销（终止业务关系）日期 日期型 8
        cooAccType: '' // 外包服务机构分润结算账户类型 字符型 2
      },
      queryFormRules: {
        profType: [], // 外包服务业务种类 字符型 2
        contrName: [], // 外包服务机构名称 字符型 80
        accType: [], // 外包服务机构类型 字符型 2
        license: [], // 依法设立或经营登记证件号码 字符型 50
        licenseDeadline: [], // 依法设立或经营登记证件有效期截止日 日期型 8
        idName: [], // 法定代表人或负责人姓名 字符型 50
        idDeadline: [], // 法定代表人或负责人证件有效期截止日 日期型 8
        creationTime: [], // 建立业务关系日期 日期型 8
        cancelTime: [], // 撤销（终止业务关系）日期 日期型 8
        cooAccType: [] // 外包服务机构分润结算账户类型 字符型 2
      },
      // 外包服务业务种类
      profTypeOptions: outsourcingIdentity.profTypeOptions,
      // 外包服务机构类型
      accTypeOptions: outsourcingIdentity.accTypeOptions,
      // 外包服务机构分润结算账户类型
      cooAccTypeOptions: outsourcingIdentity.cooAccTypeOptions
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

          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.$once('hook:beforeDestroy', () => {
              window.clearTimeout(this.timerLoading)
            })
            this.tableParams.isExportDisabled = false
            this.tableData = data.rows
            this.tableLabel = this.tableData[0]
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
      if (submitForm.licenseDeadline !== null) {
        if (submitForm.licenseDeadline.length !== 0) {
          submitForm.licenseDeadline =
            submitForm.licenseDeadline[0] + ',' + submitForm.licenseDeadline[1]
          console.log(submitForm.licenseDeadline)
        }
      }
      if (submitForm.idDeadline !== null) {
        if (submitForm.idDeadline.length !== 0) {
          submitForm.idDeadline =
            submitForm.idDeadline[0] + ',' + submitForm.idDeadline[1]
          console.log(submitForm.idDeadline)
        }
      }
      if (submitForm.creationTime !== null) {
        if (submitForm.creationTime.length !== 0) {
          submitForm.creationTime =
            submitForm.creationTime[0] + ',' + submitForm.creationTime[1]
          console.log(submitForm.creationTime)
        }
      }
      if (submitForm.cancelTime !== null) {
        if (submitForm.cancelTime.length !== 0) {
          submitForm.cancelTime =
            submitForm.cancelTime[0] + ',' + submitForm.cancelTime[1]
          console.log(submitForm.cancelTime)
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
.el-col {
  margin: 0px;
  padding: 0px;
  height: 43px;
  overflow: hidden;
}
</style>
