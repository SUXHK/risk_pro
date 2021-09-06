<template>
  <el-card class="card-sys-notop" :class="pageParams.full ? 'fullScreen' : ''">
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
    <el-tabs
      v-model="pageParams.activeTabs"
      @tab-click="tabsClick"
      class="tabs-role"
    >
      <el-tab-pane label="员工角色分配" name="staff">
        <el-row :gutter="0">
          <el-col :span="5">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0">
                <span style="font-weight: bold;">角色列表</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh"
                  @click="getTree"
                  >刷新</el-button
                >
              </div>
              <el-skeleton
                :loading="treeTableLoading"
                animated
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 352px)'
                    : 'calc(100vh - 230px)'
                }"
              >
                <template>
                  <el-tree
                    node-key="id"
                    :current-node-key="1"
                    :expand-on-click-node="false"
                    highlight-current
                    :data="roleTreeList"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    default-expand-all
                    :style="{
                      height: !pageParams.full
                        ? 'calc(100vh - 352px)'
                        : 'calc(100vh - 230px)'
                    }"
                  ></el-tree>
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="19">
            <el-card class="table-card" shadow="never">
              <div slot="header">
                <el-form
                  ref="elForm"
                  :model="formData"
                  :rules="rules"
                  size="small"
                  class="mgrform"
                  label-width="90px"
                  style="display: flex;flex-direction: row;flex-wrap: nowrap;align-content: center;justify-content: space-between;align-items: center;"
                >
                  <div style="display:flex">
                    <el-form-item label="员工名称：" prop="username">
                      <el-input
                        v-model="formData.username"
                        placeholder="请输入员工名称"
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                    <!-- style="width: 35%" -->
                    <el-form-item
                      label="日期："
                      prop="time"
                      label-width="90px"
                      style="width: 38%"
                    >
                      <el-date-picker
                        type="daterange"
                        v-model="formData.time"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '100%' }"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="-"
                        clearable
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label-width="10px">
                      <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                        @click="submitForm"
                      >
                        查 询
                      </el-button>
                    </el-form-item>
                    <el-form-item label-width="10px">
                      <el-button
                        type="warning"
                        icon="el-icon-refresh-right"
                        size="small"
                        @click="resetForm('elForm')"
                      >
                        重 置
                      </el-button>
                    </el-form-item>
                  </div>
                  <div style="display:flex">
                    <el-form-item label-width="10px"
                      ><el-button
                        type="primary"
                        icon="el-icon-circle-plus"
                        size="small"
                        @click="userControl('add')"
                      >
                        新建用户
                      </el-button></el-form-item
                    >
                  </div>
                </el-form>
              </div>
              <el-table
                ref="multipleTable"
                :size="tableSettings.tableSize"
                :border="tableSettings.borderChecked"
                :stripe="tableSettings.stripeChecked"
                :data="tableData"
                :height="
                  !pageParams.full ? pageParams.normalFull : pageParams.fullFull
                "
                :header-cell-style="{
                  background: pageParams.full ? '#e7eaff' : '',
                  color: '#909399'
                }"
                v-loading="tableLoading"
                element-loading-text="表格加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="#fff"
                highlight-current-row
                tooltip-effect="dark"
                style="width: 100%"
              >
                <af-table-column type="selection" width="55" align="center">
                </af-table-column>
                <af-table-column
                  type="index"
                  label="No."
                  width="55"
                  align="center"
                >
                </af-table-column>
                <af-table-column prop="account" label="account" align="center">
                </af-table-column>

                <af-table-column label="操作" align="center" fixed="right">
                  <!-- slot-scope="scope" -->
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="userControl('edit', scope.row)"
                    >
                      编辑
                    </el-button>
                    <template v-if="scope.row.status === 1">
                      <el-divider direction="vertical"></el-divider>
                      <el-button
                        type="text"
                        size="small"
                        @click="userControl('freeze', scope.row)"
                      >
                        停用
                      </el-button>
                    </template>
                    <template v-else>
                      <el-divider direction="vertical"></el-divider>
                      <el-button
                        type="text"
                        size="small"
                        @click="userControl('unfreeze', scope.row)"
                      >
                        启用
                      </el-button>
                    </template>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      type="text"
                      size="small"
                      @click="userControl('delete', scope.row)"
                    >
                      删除
                    </el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      type="text"
                      size="small"
                      @click="userControl('resetPassword', scope.row)"
                    >
                      重置密码
                    </el-button>
                  </template>
                </af-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色权限设置" name="role"></el-tab-pane>
    </el-tabs>

    <app-footer class="top-footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="roledialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
  </el-card>
</template>

<script>
import { getRoleTree, roleList } from '@/api/system/role'
import Dialog from './dialog.vue'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // Dialog
      dialogParams: {
        headerTitle: '新建用户'
      },
      // 页面参数
      pageParams: {
        // 表Title
        headerTitle: this.$route.meta.title,
        // 全屏
        full: false,
        // 全屏后的table高度
        fullFull: 'calc(100vh - 190px)',
        // 正常table高度
        normalFull: 'calc(100vh - 312px)',
        // tabs标签页默认项
        activeTabs: 'staff'
      },
      // 查询表单
      formData: {},
      rules: {},
      // 表格数据
      tableData: [],
      // 表格加载
      tableLoading: true,
      // 用于展示骨架屏
      treeTableLoading: true,
      // 左侧树
      roleTreeList: [],
      // 左侧树配置
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      openeds: ['3']
    }
  },
  created() {
    this.getTree()
  },
  mounted() {},
  computed: {
    tableSettings() {
      return this.$store.getters.tableSettings
    }
  },
  methods: {
    // 刷新表格
    refreshTable() {
      this.reload()
    },
    // 全屏
    changeFull() {
      this.pageParams.full = !this.pageParams.full
    },
    // 提交搜索
    submitForm() {},
    // 重置搜索
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 点击确定传来的值
    fetch() {
      this.getUserList()
    },
    // 表格按钮功能
    userControl(name, row) {
      if (name === 'add') {
        this.dialogParams.headerTitle = '新建用户'
        this.$refs.roledialog.showDialog(name)
      }
    },
    tabsClick(tab, event) {
      console.log(tab, event)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 获取角色树状列表
    async getTree() {
      this.treeTableLoading = true
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            this.roleTreeList = data.children
            this.timerLoading = setTimeout(() => {
              this.treeTableLoading = false
            }, 500)
            // this.treeTableLoading = false
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 获取用户列表
    async getRoleList(name) {
      this.tableLoading = true
      await roleList(name)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            this.tableData = data
            setTimeout(() => {
              this.tableLoading = false
            }, 500)
          } else {
            this.tableLoading = false
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // el-tree点击项
    handleNodeClick(data) {
      console.log(data)
      this.getRoleList(data.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
}
</style>
