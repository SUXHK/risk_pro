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
          <el-col :span="6">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0px 24px 0">
                <span style="font-weight: bold;">角色列表</span>

                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh "
                  @click="getTree"
                  >刷新</el-button
                >
                <el-button
                  v-if="roleTreeList.length <= 0"
                  style="float: right; padding: 3px 10px"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="appendNoData"
                  >添加角色</el-button
                >
              </div>
              <el-input
                style="margin-bottom:20px"
                placeholder="搜索角色"
                v-model="filterText"
                size="middle"
                prefix-icon="el-icon-search"
                clearable
              >
              </el-input>

              <el-skeleton
                :loading="treeTableLoading"
                animated
                :rows="7"
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 412px)'
                    : 'calc(100vh - 290px)'
                }"
              >
                <template slot="template">
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                </template>
                <template>
                  <div style="overflow-x: hidden">
                    <el-tree
                      node-key="id"
                      :current-node-key="0"
                      :expand-on-click-node="false"
                      highlight-current
                      :data="roleTreeList"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                      :filter-node-method="filterNode"
                      ref="roletree"
                      default-expand-all
                      :style="{
                        height: !pageParams.full
                          ? 'calc(100vh - 412px)'
                          : 'calc(100vh - 290px)'
                      }"
                    >
                      <!-- :render-content="renderContent" -->
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span
                          class="queryForm-one-txt-cut"
                          v-if="
                            !treeControl.isEditTreeNode ||
                              node.id !== treeControl.nodeId
                          "
                          >{{ node.label | ellipsis(15) }}</span
                        >

                        <el-input
                          @keyup.enter.native="editConfirm(node, data)"
                          clearable
                          :placeholder="data.name"
                          @click.stop.native
                          v-if="
                            treeControl.isEditTreeNode &&
                              node.id === treeControl.nodeId
                          "
                          v-model.trim="treeControl.content"
                          size="medium"
                          ><i
                            slot="prefix"
                            class="el-input__icon el-icon-edit"
                          ></i
                        ></el-input>
                        <span>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="添加下级"
                            icon-class="queue_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => append(data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="编辑"
                            icon-class="edit-2-fill"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => edit(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="删除"
                            icon-class="delete_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => remove(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="确定"
                            icon-class="check_circle_black_24dp"
                            class="el-button--text"
                            style="font-size:20px;color: $base-color-default;margin:0 5px 0 10px;vertical-align:text-bottom;"
                            @click.stop="() => editConfirm(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="取消"
                            icon-class="cancel_black_24dp"
                            style="font-size:20px;color: red; margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => editCancel(node, data)"
                          ></svg-icon>
                          <!-- icon-class="close_black_24dp" -->
                          <!-- <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => append(data)"
                        >
                          添加下级
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => edit(data)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => remove(node, data)"
                        >
                          删除
                        </el-button> -->
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="18">
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
                        placeholder="请输入员工名称或账户"
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                    <!-- style="width: 35%" -->
                    <!-- <el-form-item
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
                    </el-form-item> -->
                    <el-form-item label-width="20px">
                      <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                        @click="submitForm"
                      >
                        查 询
                      </el-button>
                    </el-form-item>
                    <!-- </el-col>
                  <el-col :span="4"> -->
                    <el-form-item label-width="20px">
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
                  <!-- <div style="display:flex">
                    <el-form-item label-width="10px"
                      ><el-button
                        type="primary"
                        icon="el-icon-circle-plus"
                        size="small"
                        @click="userControl('add')"
                      >
                        添加员工
                      </el-button></el-form-item
                    >
                  </div> -->
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
                <af-table-column
                  type="index"
                  label="No."
                  width="55"
                  align="center"
                >
                </af-table-column>
                <af-table-column prop="account" label="账号" align="center">
                </af-table-column>
                <af-table-column prop="name" label="用户名" align="center">
                </af-table-column>

                <af-table-column prop="deptName" label="部门" align="center">
                </af-table-column>
                <!-- <af-table-column prop="deptid" label="deptid" align="center">
                </af-table-column> -->
                <af-table-column prop="sexName" label="性别" align="center">
                  <template slot-scope="scope">
                    <svg-icon
                      title="男"
                      style="color:#1890FF"
                      icon-class="men-line"
                      v-if="scope.row.sex === 1"
                    ></svg-icon>
                    <svg-icon
                      title="女"
                      style="color:#F5222D"
                      icon-class="women-line"
                      v-else-if="scope.row.sex === 2"
                    ></svg-icon>
                    <svg-icon
                      title="未知"
                      icon-class="question-mark"
                      v-else
                    ></svg-icon>
                  </template>
                </af-table-column>
                <af-table-column prop="email" label="e-Mail" align="center">
                </af-table-column>

                <af-table-column prop="phone" label="手机号" align="center">
                </af-table-column>
                <!-- <af-table-column
                  prop="roleName"
                  label="roleName"
                  align="center"
                >
                </af-table-column> -->
                <af-table-column prop="roleIds" label="roleIds" align="center">
                </af-table-column>
                <af-table-column prop="birthday" label="生日" align="center">
                </af-table-column>

                <af-table-column
                  prop="statusName"
                  label="状态"
                  align="center"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.status === 1">{{
                      scope.row.statusName
                    }}</el-tag>
                    <el-tag
                      type="danger"
                      size="small"
                      v-if="scope.row.status === 2"
                      >{{ scope.row.statusName }}</el-tag
                    >
                  </template>
                </af-table-column>
                <af-table-column label="操作" align="center" fixed="right">
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="text"
                      size="small"
                      @click="userControl('delete', scope.row)"
                    >
                      删除
                    </el-button> -->
                    <el-button
                      type="text"
                      size="small"
                      @click="userControl('editRole', scope.row)"
                    >
                      角色分配
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
                  </template>
                </af-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色权限设置" name="role">
        <el-row :gutter="0">
          <el-col :span="6">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0px 24px 0;">
                <span style="font-weight: bold;">角色列表</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh "
                  @click="getTree"
                  >刷新</el-button
                >
                <el-button
                  v-if="roleTreeList.length <= 0"
                  style="float: right; padding: 3px 10px"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="appendNoData"
                  >添加角色</el-button
                >
              </div>
              <el-input
                style="margin-bottom:20px"
                placeholder="搜索角色"
                v-model="filterText"
                size="middle"
                prefix-icon="el-icon-search"
                clearable
              >
              </el-input>

              <el-skeleton
                :loading="treeTableLoading"
                animated
                :rows="7"
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 412px)'
                    : 'calc(100vh - 290px)'
                }"
              >
                <template slot="template">
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                </template>
                <template>
                  <div style="overflow-x: hidden">
                    <!-- <div style="overflow-x: hidden"> -->
                    <el-tree
                      node-key="id"
                      :current-node-key="0"
                      :expand-on-click-node="false"
                      highlight-current
                      :data="roleTreeList"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                      :filter-node-method="filterNode"
                      ref="roletree"
                      default-expand-all
                      :style="{
                        height: !pageParams.full
                          ? 'calc(100vh - 412px)'
                          : 'calc(100vh - 290px)'
                      }"
                    >
                      <!-- :render-content="renderContent" -->
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span
                          class="queryForm-one-txt-cut"
                          v-if="
                            !treeControl.isEditTreeNode ||
                              node.id !== treeControl.nodeId
                          "
                          >{{ node.label | ellipsis(15) }}</span
                        >

                        <el-input
                          @keyup.enter.native="editConfirm(node, data)"
                          clearable
                          :placeholder="data.name"
                          @click.stop.native
                          v-if="
                            treeControl.isEditTreeNode &&
                              node.id === treeControl.nodeId
                          "
                          v-model.trim="treeControl.content"
                          size="medium"
                          ><i
                            slot="prefix"
                            class="el-input__icon el-icon-edit"
                          ></i
                        ></el-input>
                        <span>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="添加下级"
                            icon-class="queue_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => append(data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="编辑"
                            icon-class="edit-2-fill"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => edit(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="删除"
                            icon-class="delete_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => remove(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="确定"
                            icon-class="check_circle_black_24dp"
                            class="el-button--text"
                            style="font-size:20px;color: $base-color-default;margin:0 5px 0 10px;vertical-align:text-bottom;"
                            @click.stop="() => editConfirm(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="取消"
                            icon-class="cancel_black_24dp"
                            style="font-size:20px;color: red; margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => editCancel(node, data)"
                          ></svg-icon>
                          <!-- icon-class="close_black_24dp" -->
                          <!-- <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => append(data)"
                        >
                          添加下级
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => edit(data)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => remove(node, data)"
                        >
                          删除
                        </el-button> -->
                        </span>
                      </span>
                    </el-tree>
                  </div>
                  <!-- </el-scrollbar> -->
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card
              class="table-card"
              shadow="never"
              style="height: calc(100vh - 247px);"
            >
              <div slot="header" style="height: 63px;">
                <span style="font-weight: bold;font-size:14px;line-height: 63px"
                  >当前角色：</span
                >
                <span style="line-height: 63px;margin-left:5px">{{
                  treeControl.currentRoleName
                }}</span>
              </div>
              123
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <app-footer class="top-footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="roledialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
    <RoleDialog
      ref="roleselectdialog"
      @fetch="fetch"
      :dialogParams="dialogParams"
    >
    </RoleDialog>
    <setRoleDialog
      ref="setRoleDialog"
      @fetch="fetch"
      :dialogParams="dialogParams"
    >
    </setRoleDialog>
  </el-card>
</template>

<script>
import { getUserMgrList, freezeUser, unfreezeUser } from '@/api/system/mgr'
// import { getUserMgrList } from '@/api/user'
import { getRoleTree, roleAdd, roleEdit, roleDelete } from '@/api/system/role'
import Dialog from './dialog.vue'
import RoleDialog from './roleDialog.vue'
import setRoleDialog from './setRoleDialog.vue'

export default {
  components: {
    Dialog,
    RoleDialog,
    setRoleDialog
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
        activeTabs: 'staff' // staff role
      },
      // 查询表单
      formData: {
        id: '',
        username: ''
      },
      rules: {
        username: []
      },
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
      openeds: ['3'],
      // 是否编辑
      treeControl: {
        isEditTreeNode: false,
        content: '',
        nodeId: '',
        // 添加
        addSubPopover: false,
        // 添加输入框
        addSubInput: '',
        currentRoleName: '全部'
      },
      addSubPopover: false,
      // 搜索项
      filterText: ''
    }
  },
  created() {
    this.getTree()
    this.getUserList()
    // this.handleNodeClick({ id: 1 })
  },
  mounted() {},
  computed: {
    tableSettings() {
      return this.$store.getters.tableSettings
    }
  },
  watch: {
    // 监视角色列表的输入框
    filterText(val) {
      // console.log(val)
      this.$refs.roletree.filter(val)
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
    submitForm() {
      console.log(this.formData)
      this.getUserList(this.formData.username, this.formData.id)
    },
    // 重置搜索
    resetForm(formName) {
      this.formData.id = ''
      this.getTree()
      this.$refs[formName].resetFields()
      this.getUserList()
    },
    // dialog点击确定传来的值
    fetch() {
      this.getUserList()
    },
    // 表格按钮功能
    // userControl(name, row) {
    //   if (name === 'add') {
    //     this.dialogParams.headerTitle = '新建用户'
    //     this.$refs.roledialog.showDialog(name)
    //   }
    // },
    // el-tabs切换点击
    tabsClick(tab, event) {
      console.log(tab, event)
    },
    // 获取角色树状列表
    async getTree() {
      this.treeTableLoading = true
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            console.log(data)
            // const arrSort = []
            // data.children.forEach(item => {
            //   arrSort.push(item.id)
            // })
            // arrSort.sort()
            // this.treeControl.currentNodeKey = arrSort[0]

            this.roleTreeList = data
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
    async getUserList(name, id) {
      this.tableLoading = true
      await getUserMgrList(name, id)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.tableData = data
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
      console.log('handleNodeClick', data)
      this.formData.id = data.id
      this.treeControl.currentRoleName = data.name
      this.getUserList(this.formData.username, this.formData.id)
    },
    // 搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    appendNoData() {
      const data = {
        id: 0
      }
      this.$prompt('添加下级角色名称', '添加角色', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        // eslint-disable-next-line no-useless-escape
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,，]+$/,
        inputErrorMessage: '角色名称格式不正确',
        inputPlaceholder: '请输入部门名称',
        closeOnClickModal: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '添加中...'
            const dataBody = {
              pid: data.id,
              name: instance.$refs.input.value
            }
            await roleAdd(dataBody)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.getTree()
                    instance.confirmButtonLoading = false
                    done()
                  }, 500)
                } else {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确 定'
                  }, 500)
                }
              })
              .catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确 定'
              })
          } else {
            done()
          }
        }
      })
        .then(({ value }) => {})
        .catch(() => {})
    },
    // 添加
    append(data) {
      console.log(data)
      console.log(data.pId)
      this.$prompt('添加 ' + data.name + ' 的下级角色名称', '添加角色', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        // eslint-disable-next-line no-useless-escape
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,，]+$/,
        inputErrorMessage: '角色名称格式不正确',
        inputPlaceholder: '请输入部门名称',
        closeOnClickModal: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '添加中...'
            const dataBody = {
              pid: data.id,
              name: instance.$refs.input.value
            }
            await roleAdd(dataBody)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.getTree()
                    instance.confirmButtonLoading = false
                    done()
                  }, 500)
                } else {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确 定'
                  }, 500)
                }
              })
              .catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确 定'
              })
          } else {
            done()
          }
        }
      })
        .then(({ value }) => {})
        .catch(() => {})
    },

    // 删除
    async remove(node, data) {
      console.log(data.id)
      await roleDelete(data.id)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.$message.success(retMsg)
            this.getTree()
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 编辑
    edit(node, data) {
      this.treeControl.nodeId = node.id
      this.treeControl.isEditTreeNode = true
      this.treeControl.content = data.name
    },
    // 编辑确定
    async editConfirm(node, data) {
      console.log(data)
      console.log(data.id)
      console.log(this.treeControl.content)
      if (this.treeControl.content) {
        const dataBodyEdit = {
          id: data.id,
          name: this.treeControl.content
        }
        await roleEdit(dataBodyEdit)
          .then(result => {
            console.log('🚀', result.data)
            const { retCode, retMsg } = result.data
            if (retCode === '000000') {
              this.$message.success(retMsg)
              this.editCancel(node, data)
              this.getTree()
            } else {
              this.$message.error(retMsg)
            }
          })
          .catch(() => {
            console.log('🛸🛸🛸🛸🛸🛸🛸')
          })
      } else {
        this.editCancel(node, data)
      }
    },
    // 编辑取消
    editCancel(node, data) {
      this.treeControl.nodeId = ''
      this.treeControl.isEditTreeNode = false
      this.treeControl.content = ''
    },
    // 表格按钮功能
    // userControl(name, row) {
    //   if (name === 'add') {
    //     this.dialogParams.headerTitle = '新建用户'
    //     this.$refs.roledialog.showDialog(name)
    //   } else if (name === 'delete') {
    //     this.$confirm('删除此账号, 是否继续?', ` ❌ 删除 - ${row.account}`, {
    //       confirmButtonText: '重 置',
    //       cancelButtonText: '取 消',
    //       type: 'warning',
    //       closeOnClickModal: false
    //     })
    //       .then(async () => {
    //         await deleteUser(row.id)
    //           .then(result => {
    //             console.log('🚀', result.data)
    //             const { retCode, retMsg } = result.data
    //             if (retCode === '000000') {
    //               this.$message.success('删除成功！')

    //               this.getUserList()
    //             } else {
    //               this.$message.error(retMsg)
    //             }
    //           })
    //           .catch(() => {})
    //       })
    //       .catch(() => {})
    //   } else {
    //     this.$message.error('请尝试刷新后再试')
    //   }
    // },
    // 控制
    setRolesDialog(name) {
      if (name === 'PMSetFieldRole') {
        this.dialogParams.headerTitle = '设置人员管理字段权限'
        this.$refs.roleselectdialog.showDialog(name)
      } else if (name === 'PMSetQueryRole') {
        this.dialogParams.headerTitle = '设置人员管理查询字段'
        this.$refs.roleselectdialog.showDialog(name)
      } else {
        this.$message.error('调用失败')
      }
    },
    // 表格按钮功能
    userControl(name, row) {
      if (name === 'editRole') {
        this.dialogParams.headerTitle = '角色分配 - ' + row.account
        this.$refs.setRoleDialog.showDialog(name, row)
      } else if (name === 'freeze') {
        this.$confirm('停用此账号, 是否继续?', ` 🚫 停用 - ${row.account}`, {
          confirmButtonText: '停 用',
          cancelButtonText: '取 消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(async () => {
            await freezeUser(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('停用成功！')
                  this.getUserList()
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {})
          })
          .catch(() => {})
      } else if (name === 'unfreeze') {
        this.$confirm('启用此账号, 是否继续?', ` ✅ 启用 - ${row.account}`, {
          confirmButtonText: '启 用',
          cancelButtonText: '取 消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(async () => {
            await unfreezeUser(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('启用成功！')

                  this.getUserList()
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {})
          })
          .catch(() => {})
      } else {
        this.$message.error('请尝试刷新后再试')
      }
    }
    // 获取Menus
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
}
</style>
