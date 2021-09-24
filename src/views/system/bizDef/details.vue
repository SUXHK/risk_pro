<template>
  <el-card class="card-sys" :class="pageParams.full ? 'fullScreen' : ''">
    <div slot="header" class="clearfix">
      <el-page-header
        @back="goBack"
        title="返回业务表管理"
        content="业务表详情"
      >
      </el-page-header>

      <div class="header-action">
        <el-button
          plain
          icon="el-icon-refresh"
          size="mini"
          @click="refreshTable"
        >
          刷新表格
        </el-button>
        <el-button
          size="mini"
          @click="changeFull"
          :plain="!pageParams.full"
          :icon="
            pageParams.full ? 'el-icon-switch-button' : 'el-icon-full-screen'
          "
          :type="pageParams.full ? 'primary' : ''"
        >
          {{ pageParams.full ? '退出全屏' : '表格全屏' }}
        </el-button>
      </div>
    </div>
    <el-row :gutter="0" style="margin-bottom:10px">
      <el-form
        ref="queryForm"
        :model="queryForm"
        :rules="queryFormRules"
        size="small"
        label-position="right"
        class="queryForm"
        label-width="120px"
        style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
      >
        <!-- 部门名称 -->
        <div style="display:flex">
          <el-form-item label="业务列字段ID:" prop="columnName">
            <el-input
              v-model="queryForm.columnName"
              placeholder="请输入业务列字段ID"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label-width="20px">
            <div :style="{ width: '100%' }">
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
            </div>
          </el-form-item>
        </div>
        <div style="float:right" label-width="10px">
          <el-form-item label-width="10px">
            <el-button icon="el-icon-plus" type="primary" size="small"
              >添 加</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-row>

    <el-table
      :data="tableData"
      :size="tableSettings.tableSize"
      :border="tableSettings.borderChecked"
      :stripe="tableSettings.stripeChecked"
      :height="!pageParams.full ? pageParams.normalFull : pageParams.fullFull"
      highlight-current-row
      :header-cell-style="{
        background: pageParams.full ? '#e7eaff' : '',
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
      <el-table-column type="index" label="No." width="60"> </el-table-column>
      <af-table-column prop="alisa" label="alisa"> </af-table-column>
      <af-table-column prop="columnName" label="columnName"> </af-table-column>
      <af-table-column prop="context" label="context"> </af-table-column>
      <af-table-column prop="description" label="description">
      </af-table-column>
      <af-table-column prop="displayName" label="displayName">
      </af-table-column>
      <af-table-column prop="encryptFlag" label="encryptFlag">
      </af-table-column>
      <af-table-column prop="memo" label="memo"> </af-table-column>
      <af-table-column prop="orderNo" label="orderNo"> </af-table-column>
      <af-table-column prop="status" label="status"> </af-table-column>
      <af-table-column prop="tableId" label="tableId"> </af-table-column>
      <af-table-column prop="type" label="type"> </af-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryForm.offset"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="queryForm.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <app-footer class="footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="deptdialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
    <!-- <router-view /> -->
  </el-card>
</template>

<script>
import Dialog from './dialog.vue'
import { columnDefMgrList } from '@/api/system/bizDef'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: ' 详情'
      },
      // 页面参数
      pageParams: {
        // 表Title
        headerTitle: this.$route.meta.title,
        // 全屏
        full: false,
        // 全屏后的table高度
        fullFull: 'calc(100vh - 200px)',
        // 正常table高度
        normalFull: 'calc(100vh - 319px)'
      },
      // 表格加载
      tableLoading: true,
      // 树treeData
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
      // 查询表单
      queryForm: {
        // 分页偏移量
        offset: 1,
        // 分页大小
        limit: 20,
        columnName: '',
        tableId: ''
      },
      // 查询表单规则
      queryFormRules: {
        columnName: []
      }
    }
  },
  created() {
    const tableId = this.$route.query.tableId
    console.log(tableId)
    if (!tableId) {
      this.$message.error('请返回 `业务表管理` 后重新打开')
      setTimeout(() => {
        this.goBack()
      }, 3000)
      return
    }
    this.queryForm.tableId = tableId
    this.getList(this.queryForm)
  },
  mounted() {},
  computed: {
    tableSettings() {
      return this.$store.getters.tableSettings
    }
  },
  methods: {
    // 获取表格
    async getList({ offset, limit, columnName, tableId }) {
      this.tableLoading = true
      await columnDefMgrList({ offset, limit, columnName, tableId })
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.tableData = data.rows
            this.total = data.total
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    submitQueryForm() {},
    resetQueryForm() {},
    // 返回
    goBack() {
      // this.$router.go(-1)
      this.$router.push('/system/bizDef')
    },
    // 全屏
    changeFull() {
      this.pageParams.full = !this.pageParams.full
    },
    // 刷新表格
    refreshTable() {
      this.reload()
    },
    // 点击确定传来的值
    fetch(formData) {},
    // 监听pagesize改变的事件
    handleSizeChange(val) {
      console.log('🚀 ~ handleSizeChange ~ val', val)
      this.queryForm.limit = val
      this.queryForm.offset = 1
      this.getList(this.queryForm)
    },
    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.queryForm.offset = val
      console.log(this.queryForm.offset)
      this.getList(this.queryForm)
    },
    // 序号
    indexMethod(index) {
      return index + 1 + (this.queryForm.offset - 1) * this.queryForm.limit
    }
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
}
</style>
