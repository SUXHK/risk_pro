<template>
  <el-card class="card-sys" :class="pageParams.full ? 'fullScreen' : ''">
    <div slot="header" class="clearfix">
      <div class="header-name">
        <!-- {{ pageParams.headerTitle }} -->
        业务表管理
        <el-popover placement="bottom" title="说明" trigger="click" width="300">
          <br />
          <div>
            <div style="display: inline-block;margin-right:100px">
              <el-badge value="点击查看详情" class="item">
                <el-link type="primary">
                  业务表名
                </el-link>
              </el-badge>
            </div>
          </div>
          <br />
          <svg-icon
            slot="reference"
            title="业务表管理 - 帮助"
            icon-class="question-fill"
            class="el-button--text"
            style="margin-left:12px;cursor: pointer"
          ></svg-icon>
        </el-popover>
      </div>
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
        label-width="100px"
        style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
      >
        <!-- 部门名称 -->
        <div style="display:flex">
          <el-form-item label="业务表名:" prop="tableName">
            <el-input
              v-model="queryForm.tableName"
              placeholder="请输入业务表名"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="业务表别名:" prop="alias">
            <el-input
              v-model="queryForm.alias"
              placeholder="请输入业务表别名"
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
            <!-- <el-button type="primary" icon="el-icon-connection" size="small">
              绑定表名
            </el-button> -->
            <el-button
              type="danger"
              icon="el-icon-refresh"
              size="small"
              @click="syncTableInfo"
              :loading="syncLoading"
            >
              刷新同步
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-table
      size="small"
      :data="tableData"
      :border="false"
      :header-cell-style="{
        background: pageParams.full ? '#e7eaff' : '',
        color: '#909399'
      }"
      :height="!pageParams.full ? pageParams.normalFull : pageParams.fullFull"
      class="table-shadow"
      v-loading="tableLoading"
      :stripe="true"
    >
      <af-table-column
        v-if="total > 0"
        type="index"
        label="No."
        :index="indexMethod"
        width="60"
      >
      </af-table-column>
      <el-table-column
        label="表名（点击查看详情）"
        width="310"
        prop="tableName"
      >
        <template slot-scope="scope">
          <!-- <el-badge value="点击查看详情"> -->
          <el-link @click="pusher(scope.row.id)" type="primary" title="详情">
            <!-- <i class="el-icon-document"></i>  -->
            <svg-icon
              title="查看"
              icon-class="zoom-in-line"
              class="el-button--text"
              style="margin: 0 5px;cursor: pointer"
            ></svg-icon>
            {{ scope.row.tableName }}
          </el-link>
          <!-- </el-badge> -->
        </template></el-table-column
      >
      <!-- :fontRate="fontRate" -->

      <el-table-column width="100" label="业务表别名" prop="alias">
        <template slot-scope="scope">
          {{ scope.row.alias }}
        </template>
      </el-table-column>

      <el-table-column width="450" label="业务表名" prop="displayName"
        ><template slot-scope="scope">
          {{ scope.row.displayName }}
        </template>
      </el-table-column>

      <el-table-column label="描述" prop="description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template></el-table-column
      >
      <el-table-column label="状态" prop="status" width="80">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 0">
            <svg-icon
              title="状态：启用"
              icon-class="dian"
              style="margin: 0 2px;cursor: pointer;color:#52c41a;font-size:20px;vertical-align:middle"
            >
              ></svg-icon
            >
            <span style="font-size:14px;vertical-align:middle;">启用</span>
          </template>
          <template v-else>
            <svg-icon
              title="状态：禁用"
              icon-class="dian"
              style="margin: 0 2px;cursor: pointer;color:red;font-size:20px;vertical-align:middle;"
            ></svg-icon
            ><span style="font-size:14px;vertical-align:middle;">禁用</span>
          </template>
          <!-- <el-tag type="success" v-if="scope.row.status === 0">开启</el-tag
          ><el-tag v-else type="warning">禁用</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="status" width="130">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="control('edit', scope.row)"
            >编辑</el-button
          ><el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-view"
            @click="pusher(scope.row.id)"
            >查看</el-button
          >
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
import Dialog from './dialog.vue'
import { defList, syncTable } from '@/api/system/bizDef'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: '业务表编辑 - '
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
      // syncLoading
      syncLoading: false,
      // 树treeData
      tableData: [],
      // 分页默认值
      total: 0,
      // 查询表单
      queryForm: {
        // 分页大小
        limit: 20,
        // 分页偏移量
        offset: 1,
        alias: '',
        tableName: ''
      },
      // 查询表单规则
      queryFormRules: {
        alias: [],
        tableName: []
      },
      // 定义字体比例
      fontRate: {
        CHAR_RATE: 1.1, // 汉字比率 1.1
        NUM_RATE: 0.65, // 数字 0.65
        OTHER_RATE: 0.8 // 除汉字和数字以外的字符的比率 0.8
      }
    }
  },
  created() {
    this.getDefList(this.queryForm)
  },
  mounted() {},
  completed: {},
  methods: {
    // defList
    async getDefList({ limit, offset, alias, tableName }) {
      console.log({ limit, offset, alias, tableName })
      this.tableLoading = true
      await defList({ limit, offset, alias, tableName })
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.tableData = data.rows
            this.total = data.total
            setTimeout(() => {
              this.tableLoading = false
            }, 500)
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 查询按钮
    submitQueryForm() {
      this.getDefList(this.queryForm)
    },
    // 重置查询条件
    resetQueryForm(formName) {
      this.$refs[formName].resetFields()
      this.getDefList(this.queryForm)
    },
    control(name, row) {
      console.log(row.displayName)
      if (name === 'edit') {
        this.dialogParams.headerTitle = '业务表编辑 - ' + row.displayName
        this.$refs.dialog.showDialog(name, row)
      } else {
        this.$message.error('调用失败...')
      }
    },
    // 监听pagesize改变的事件
    handleSizeChange(val) {
      this.queryForm.limit = val
      this.queryForm.offset = 1
      this.getDefList(this.queryForm)
    },
    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.queryForm.offset = val
      console.log(this.queryForm.offset)
      this.getDefList(this.queryForm)
    },
    // 序号
    indexMethod(index) {
      return index + 1 + (this.queryForm.offset - 1) * this.queryForm.limit
    },
    pusher(id) {
      this.$router.push({
        path: '/system/bizDef/details',
        query: {
          tableId: id
        }
      })
      // this.$message.info('push')
    },
    // 同步
    async syncTableInfo() {
      this.syncLoading = true
      await syncTable()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg } = result.data
          if (retCode === '000000') {
            // this.$message.success(retMsg)
            const $message = this.$message({
              message: ' 同步中，请稍后 ...',
              customClass: 'theme-message',
              type: 'success',
              duration: 0,
              iconClass: 'el-icon-loading'
            })
            // console.log($message)
            setTimeout(() => {
              this.syncLoading = false
              $message.message = retMsg
              $message.iconClass = 'el-icon-success'
              // $message.duration = 1000
              setTimeout(() => {
                $message.close()
              }, 1500)
              this.getDefList(this.queryForm)
              // this.$message.success(retMsg)
            }, 3000)
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 全屏
    changeFull() {
      this.pageParams.full = !this.pageParams.full
    },
    // 刷新表格
    refreshTable() {
      // this.changeTableSettings(true, 'normalFullFlag')
      this.reload()
    },
    // 点击确定传来的值
    fetch(formData) {
      this.getDefList(this.queryForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
  // .clearfix {
  //   display: flex;
  //   height: 50px;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  //   align-content: center;
  //   justify-content: space-between;
  //   align-items: center;
  //   .header-name {
  //     font-size: 20px;
  //     font-weight: 600;
  //     color: #000;
  //     overflow: hidden;
  //   }
  // }
}
</style>
