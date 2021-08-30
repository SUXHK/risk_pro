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
        <!-- 业务种类 -->
        <el-col
          :span="6"
          :style="{ display: 1 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="129px" label="业务种类:" prop="profType">
            <el-select
              v-model="queryForm.profType"
              placeholder="请选择业务种类"
              clearable
              :style="{ width: '80%' }"
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
        <!-- 收单机构系统内部商户编码 -->
        <el-col
          :span="6"
          :style="{ display: 2 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="185px"
            label="收单机构系统内部商户编码:"
            prop="joinCode1"
          >
            <el-input
              v-model="queryForm.joinCode1"
              placeholder="请输入收单机构系统内部商户编码"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 特约商户名称 -->
        <el-col
          :span="6"
          :style="{ display: 3 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="121px"
            label="特约商户名称:"
            prop="accName"
          >
            <el-input
              v-model="queryForm.accName"
              placeholder="请输入特约商户名称"
              clearable
              :style="{ width: '80%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 商户类型 -->
        <el-col
          :span="6"
          :style="{ display: 4 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="101px" label="商户类型:" prop="accType">
            <el-select
              v-model="queryForm.accType"
              placeholder="请选择商户类型"
              clearable
              :style="{ width: '80%' }"
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
        <!-- 建立业务关系日期 -->
        <el-col
          :span="6"
          :style="{ display: 5 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="129px"
            label="建立业务关系日期:"
            prop="openTime"
          >
            <el-date-picker
              type="daterange"
              v-model="queryForm.openTime"
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
        <!-- 撤销（终止业务关系）日期 -->
        <el-col
          :span="6"
          :style="{ display: 6 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="185px"
            label="撤销（终止业务关系）日期:"
            prop="closeTime"
          >
            <el-date-picker
              type="daterange"
              v-model="queryForm.closeTime"
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
        <!-- 合作状态 -->
        <el-col
          :span="6"
          :style="{ display: 7 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item label-width="121px" label="合作状态:" prop="cooState">
            <el-select
              v-model="queryForm.cooState"
              placeholder="请选择合作状态"
              clearable
              :style="{ width: '80%' }"
            >
              <el-option
                v-for="(item, index) in cooStateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 所属地区代码 -->
        <el-col
          :span="6"
          :style="{ display: 8 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="101px"
            label="所属地区代码:"
            prop="addCode"
          >
            <el-input
              v-model="queryForm.addCode"
              placeholder="请输入所属地区代码"
              clearable
              :style="{ width: '80%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 商户联系方式 -->
        <el-col
          :span="6"
          :style="{ display: 9 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="129px"
            label="商户联系方式:"
            prop="contact"
          >
            <el-input
              v-model="queryForm.contact"
              placeholder="请输入商户联系方式"
              clearable
              :style="{ width: '80%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 商户收单结算账户类型 -->
        <el-col
          :span="6"
          :style="{ display: 10 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="185px"
            label="商户收单结算账户类型:"
            prop="selfacctype"
          >
            <el-select
              v-model="queryForm.selfacctype"
              placeholder="请选择商户收单结算账户类型"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in selfacctypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 商户拓展方式 -->
        <el-col
          :span="6"
          :style="{ display: 11 < count ? 'inline-block' : 'none' }"
        >
          <el-form-item
            label-width="121px"
            label="商户拓展方式:"
            prop="deptType"
          >
            <el-select
              v-model="queryForm.deptType"
              placeholder="请选择商户拓展方式"
              clearable
              :style="{ width: '80%' }"
            >
              <el-option
                v-for="(item, index) in deptTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="display:inline-block">
          <el-form-item label-width="0px">
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

    <!-- <el-table
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
        label="#"
        :index="indexMethod"
      ></af-table-column>
      <af-table-column
        v-for="item in tableLabel"
        :key="item"
        :prop="item"
        :label="item"
        align="center"
      >
      </af-table-column>
    </el-table> -->

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
        align="center"
        label="No."
        :index="indexMethod"
        width="100%"
      >
      </af-table-column>
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
      :page-sizes="[20, 50, 100, 200]"
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
// import { midIdentity } from '@/assets/selectoptions/typeOptions.json'
import { midIdentity } from '@/assets/selectoptions/mid/identity'
import TableSetting from '@/components/TableSetting'
// import { indexMethod } from '@/utils/reminder'
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
        // 分页偏移量 pageNum
        offset: 1,
        // 分页大小 pageSize
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
        profType: '', // 业务种类
        joinCode1: '', // 收单机构系统内部商户编码
        accName: '', // 特约商户名称
        accType: '', // 商户类型
        openTime: [], // 建立业务关系日期
        closeTime: [], // 撤销（终止业务关系）日期
        cooState: '', // 合作状态
        addCode: '', // 所属地区代码
        contact: '', // 商户联系方式
        selfacctype: '', // 商户收单结算账户类型
        deptType: '' // 商户拓展方式
      },
      queryFormRules: {
        profType: [],
        joinCode1: [],
        accName: [],
        accType: [],
        openTime: [],
        closeTime: [],
        cooState: [],
        addCode: [],
        contact: [],
        selfacctype: [],
        deptType: []
      },
      // 业务种类
      profTypeOptions: midIdentity.profTypeOptions,
      // 商户类型
      accTypeOptions: midIdentity.accTypeOptions,
      // 合作状态
      cooStateOptions: midIdentity.cooStateOptions,
      // 商户收单结算账户类型
      selfacctypeOptions: midIdentity.selfacctypeOptions,
      // 商户拓展方式
      deptTypeOptions: midIdentity.deptTypeOptions
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

          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.$once('hook:beforeDestroy', () => {
              window.clearTimeout(this.timerLoading)
            })
            this.tableData = data.rows

            // this.tableLabel = this.tableData[0]
            this.tableLabel = Object.keys(this.tableData[0])

            // this.tableData.forEach(row => {
            //   this.tableLabel = row
            // })
            this.total = data.total
            this.$message.success(
              '加载：' + this.queryParams.limit + '条/页，' + retMsg
            )
            if (this.total > 0) {
              this.tableParams.isExportDisabled = false
            } else {
              this.tableParams.isExportDisabled = true
            }
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
      this.queryParams.limit = val
      this.queryParams.offset = 1
      this.bizQuery()
    },
    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.queryParams.offset = val
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

      if (submitForm.openTime !== null) {
        if (submitForm.openTime.length !== 0) {
          submitForm.openTime =
            submitForm.openTime[0] + ',' + submitForm.openTime[1]
          // console.log(submitForm.openTime)
        }
      }
      if (submitForm.closeTime !== null) {
        if (submitForm.closeTime.length !== 0) {
          submitForm.closeTime =
            submitForm.closeTime[0] + ',' + submitForm.closeTime[1]

          // console.log(submitForm.closeTime)
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
        // 分页偏移量 pageNum
        offset: 1,
        // 分页大小 pageSize
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
