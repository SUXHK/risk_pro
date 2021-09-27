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
          <el-form-item label="业务字段名:" prop="columnName">
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
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="control('add')"
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
      <el-table-column
        v-if="total > 0"
        type="index"
        label="No."
        :index="indexMethod"
        width="60"
      >
      </el-table-column>
      <el-table-column prop="alisa" label="字段别名" width="150">
        <template slot-scope="scope">
          <el-popover
            width="250"
            placement="top-start"
            trigger="hover"
            :content="scope.row.alisa"
          >
            <span slot="reference" class="one-txt-cut">{{
              scope.row.alisa
            }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="columnName" label="业务字段名" width="150"
        ><template slot-scope="scope">
          <el-popover
            width="250"
            placement="top-start"
            trigger="hover"
            :content="scope.row.columnName"
          >
            <span slot="reference" class="one-txt-cut">{{
              scope.row.columnName
            }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="context" label="转义描述" width="200">
        <template slot-scope="scope">
          <el-popover
            width="250"
            placement="top-start"
            trigger="hover"
            :content="scope.row.context"
          >
            <span slot="reference" class="one-txt-cut">{{
              scope.row.context
            }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="displayName" label="业务展示名称" width="250">
        <template slot-scope="scope">
          <el-popover
            width="250"
            placement="top-start"
            trigger="hover"
            :content="scope.row.displayName"
          >
            <span slot="reference" class="one-txt-cut">{{
              scope.row.displayName
            }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="业务描述">
        <template slot-scope="scope">
          <el-popover
            width="250"
            placement="top-start"
            trigger="hover"
            :content="scope.row.description"
          >
            <span slot="reference" class="one-txt-cut">{{
              scope.row.description
            }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="encryptFlag" label="加密标志" width="80"
        ><template slot-scope="scope">
          <!-- {{ scope.row.encryptFlag }} -->
          <!-- <svg-icon
            v-if="scope.row.encryptFlag === 1"
            title="加密"
            icon-class="check_circle_black_24dp"
            class="el-button--text"
            style="font-size:16px;color: #15d36a;vertical-align: middle"
          ></svg-icon> -->
          <el-tag
            effect="plain"
            type="success"
            size="small"
            v-if="scope.row.encryptFlag === 1"
            >加密</el-tag
          >
          <el-tag effect="plain" size="small" type="info" v-else>不加密</el-tag>

          <!-- <svg-icon
            v-else
            title="不加密"
            icon-class="cancel_black_24dp"
            style="font-size:16px;color: red;vertical-align: middle"
          ></svg-icon>  -->
        </template></el-table-column
      >
      <el-table-column prop="orderNo" label="顺序" width="80">
        <template slot-scope="scope">
          <svg-icon
            :title="`排序` + scope.row.orderNo"
            icon-class="menu-4-line"
            class="el-button--text"
            style="font-size:16px;vertical-align: middle"
          ></svg-icon>

          <span style="vertical-align: middle;margin-left:5px">{{
            scope.row.orderNo
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="字段类型" width="90">
        <template slot-scope="scope">
          <el-tag effect="plain" size="small" v-if="scope.row.type === 1"
            ><svg-icon
              title="字符型"
              icon-class="text_fields_black_24dp"
              style="font-size:14px;vertical-align: sub"
            ></svg-icon
            ><span style="vertical-align: middle">字符型</span></el-tag
          >
          <el-tag effect="plain" size="small" v-else-if="scope.row.type === 2"
            ><svg-icon
              title="数字型"
              icon-class="looks_one_black_24dp"
              style="font-size:14px;vertical-align: sub"
            ></svg-icon
            ><span style="vertical-align: middle">数字型</span></el-tag
          >
          <el-tag effect="plain" size="small" v-else-if="scope.row.type === 3"
            ><svg-icon
              title="日期"
              icon-class="date_range_black_24dp"
              style="font-size:14px;vertical-align: sub"
            ></svg-icon
            ><span style="vertical-align: middle">日期</span></el-tag
          ><el-tag
            effect="plain"
            size="small"
            v-else-if="scope.row.type === 4"
            style="vertical-align: middle"
            ><svg-icon
              title="时间"
              icon-class="schedule_black_24dp"
              style="font-size:14px;vertical-align: sub"
            ></svg-icon
            ><span style="vertical-align: middle">时间</span></el-tag
          >
          <el-tag v-else effect="plain" size="small" type="danger"
            ><svg-icon
              title="时间"
              icon-class="question-mark"
              style="vertical-align: sub"
            ></svg-icon
            ><span style="vertical-align: middle">未知</span></el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 0">
            <svg-icon
              title="启用"
              icon-class="dian"
              style="margin-right:2px;cursor: pointer;color:#52c41a;font-size:20px;vertical-align:middle"
            >
              ></svg-icon
            >
            <span style="font-size:14px;vertical-align:middle;">启用</span>
          </template>
          <template v-else>
            <svg-icon
              title="禁用"
              icon-class="dian"
              style="margin-right:2px;cursor: pointer;color:red;font-size:20px;vertical-align:middle;"
            ></svg-icon
            ><span style="font-size:14px;vertical-align:middle;">禁用</span>
          </template>
          <!-- <el-tag type="success" v-if="scope.row.status === 0">开启</el-tag
          ><el-tag v-else type="warning">禁用</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="control('edit', scope.row)"
            >编辑</el-button
          ><el-divider direction="vertical"></el-divider>

          <el-popconfirm
            confirm-button-text="是的"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除吗？"
            @confirm="control('del', scope.row)"
          >
            <el-button
              type="text"
              slot="reference"
              size="small"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
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

    <Dialog ref="dialog" @fetch="fetch" :dialogParams="dialogParams"> </Dialog>
    <!-- <router-view /> -->
  </el-card>
</template>

<script>
import Dialog from './detailsDialog.vue'
import { columnDefMgrList, columnDefMgrDelete } from '@/api/system/bizDef'
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
    submitQueryForm() {
      this.getList(this.queryForm)
    },
    resetQueryForm(formName) {
      this.$refs[formName].resetFields()
      this.getList(this.queryForm)
    },
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
    fetch(formData) {
      this.getList(this.queryForm)
    },
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
    },
    control(name, row) {
      if (name === 'edit') {
        this.dialogParams.headerTitle = '编辑 - ' + row.displayName
        this.$refs.dialog.showDialog(name, row)
      } else if (name === 'del') {
        // console.log(row.id)
        this.del(row.id)
      } else if (name === 'add') {
        this.dialogParams.headerTitle = '添加'
        this.$refs.dialog.showDialog(name)
      } else {
        this.$message.error('调用失败...')
      }
    },
    async del(id) {
      await columnDefMgrDelete(id)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.getList(this.queryForm)
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
}
</style>
