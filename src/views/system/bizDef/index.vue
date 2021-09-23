<template>
  <el-card class="card-sys" :class="pageParams.full ? 'fullScreen' : ''">
    <div slot="header" class="clearfix">
      <div class="header-name">{{ pageParams.headerTitle }}</div>
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
          <el-form-item label="业务表别名:" prop="alias">
            <el-input
              v-model="queryForm.alias"
              placeholder="请输入业务表别名"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <!-- 状态 -->

          <el-form-item label="业务表名:" prop="tableName">
            <el-input
              v-model="queryForm.tableName"
              placeholder="请输入业务表名"
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
            <el-button type="primary" icon="el-icon-connection" size="small">
              绑定表名 </el-button
            ><el-button type="danger" icon="el-icon-refresh" size="small">
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
      <af-table-column type="index" label="No." width="60"> </af-table-column>
      <af-table-column
        width="100"
        :fontRate="fontRate"
        label="业务表别名"
        prop="alias"
      >
        <template slot-scope="scope">
          <el-link @click="pusher" type="primary">{{
            scope.row.alias
          }}</el-link>
        </template>
      </af-table-column>
      <af-table-column
        width="450"
        :fontRate="fontRate"
        label="业务表名"
        prop="displayName"
        ><template slot-scope="scope">
          <el-link @click="pusher" type="primary">{{
            scope.row.displayName
          }}</el-link>
        </template>
      </af-table-column>

      <af-table-column
        width="450"
        :fontRate="fontRate"
        label="tableName"
        prop="tableName"
      >
        <template slot-scope="scope">
          {{ scope.row.tableName }}
        </template></af-table-column
      ><af-table-column
        width="450"
        :fontRate="fontRate"
        label="描述"
        prop="description"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template></af-table-column
      >
      <af-table-column
        :fontRate="fontRate"
        label="状态"
        prop="status"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status === 0">开启</el-tag
          ><el-tag v-else type="warning">禁用</el-tag>
        </template></af-table-column
      >
    </el-table>

    <app-footer class="footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="deptdialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
  </el-card>
</template>

<script>
import Dialog from './dialog.vue'
import { defList } from '@/api/system/bizDef'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: 'xxx'
      },
      // 页面参数
      pageParams: {
        // 表Title
        headerTitle: this.$route.meta.title,
        // 全屏
        full: false,
        // 全屏后的table高度
        fullFull: 'calc(100vh - 150px)',
        // 正常table高度
        normalFull: 'calc(100vh - 251px)'
      },
      // 表格加载
      tableLoading: true,
      // 树treeData
      tableData: [],
      // 查询表单
      queryForm: {
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
    this.getDefList()
  },
  mounted() {},
  completed: {},
  methods: {
    pusher() {
      this.$router.push('/system/bizDef/details')
      this.$message.info('push')
    },
    // defList
    async getDefList(alia, name) {
      await defList(alia, name)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.tableData = data
            this.tableLoading = false
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
      const submitForm = this.$lodash.cloneDeep(this.queryForm)
      console.log(submitForm)
    },
    // 重置查询条件
    resetQueryForm(formName) {
      this.$refs[formName].resetFields()
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
    fetch(formData) {}
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
