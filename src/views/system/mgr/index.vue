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

    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="tree-card clear">
          <!-- class="clearfix" -->
          <div slot="header" style="padding:23px 0">
            <span style="font-weight: bold;">组织机构</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-refresh"
              @click="getTree"
              >刷新</el-button
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
            :rows="7"
            :style="{
              height: !pageParams.full
                ? 'calc(100vh - 382px)'
                : 'calc(100vh - 268px)'
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
                  ref="mgrtree"
                  :data="treeTableData"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  :filter-node-method="filterNode"
                  default-expand-all
                  :style="{
                    height: !pageParams.full
                      ? 'calc(100vh - 382px)'
                      : 'calc(100vh - 270px)'
                  }"
                ></el-tree>
              </div>
            </template>
          </el-skeleton>
          <!-- :current-node-key="1" -->
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="table-card" shadow="always">
          <div slot="header">
            <!-- <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            > -->
            <!-- <el-row
              :gutter="10"
              type="flex"
              justify="space-between"
              align="middle"
            >
              <el-form
                ref="elForm"
                :model="formData"
                :rules="rules"
                size="small"
                class="mgrform"
              >
                <el-col :span="5"
                  ><el-form-item
                    label="员工名称："
                    prop="field101"
                    label-width="90px"
                  >
                    <el-input
                      v-model="formData.field101"
                      placeholder="请输入员工名称"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input> </el-form-item
                ></el-col>
                <el-col :span="5"
                  ><el-form-item
                    label="状态："
                    prop="field102"
                    label-width="90px"
                  >
                    <el-select
                      v-model="formData.field102"
                      placeholder="请选择状态"
                      clearable
                      :style="{ width: '100%' }"
                    >
                      <el-option
                        v-for="(item, index) in field102Options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="2">
                  <el-form-item label-width="0px">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      size="small"
                      @click="submitForm"
                    >
                      查 询
                    </el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="2"
                  ><el-form-item label-width="0px">
                    <el-button
                      type="warning"
                      icon="el-icon-refresh-right"
                      size="small"
                      @click="resetForm('elForm')"
                    >
                      重 置
                    </el-button>
                  </el-form-item></el-col
                >
                <el-col :span="2"
                  ><el-form-item
                    ><el-button type="success" icon="el-icon-plus" size="small">
                      新建员工
                    </el-button></el-form-item
                  ></el-col
                >
                <el-col :span="2"
                  ><el-form-item
                    ><el-button type="success" icon="el-icon-plus" size="small">
                      删除员工
                    </el-button></el-form-item
                  ></el-col
                >
              </el-form>
            </el-row> -->
            <el-form
              ref="elForm"
              :model="formData"
              :rules="rules"
              size="small"
              class="mgrform"
              label-width="90px"
              style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
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
                <!-- <el-form-item label="结束时间：" prop="field109">
                  <el-date-picker
                    type="daterange"
                    v-model="formData.field109"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    range-separator="至"
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
                <!-- <el-form-item label-width="10px"
                  ><el-button
                    type="danger"
                    icon="el-icon-error"
                    size="small"
                    disabled
                  >
                    批量删除
                  </el-button></el-form-item
                >
                <el-form-item label-width="10px"
                  ><el-button
                    icon="el-icon-remove"
                    type="warning"
                    size="small"
                    disabled
                  >
                    批量停用
                  </el-button></el-form-item
                > -->
              </div>
            </el-form>
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item"> -->
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
            <!-- <div v-if="tableData.length > 0"> -->
            <!-- <af-table-column type="selection" width="55" align="center">
            </af-table-column> -->
            <!-- </div> -->

            <!-- <div v-if="tableData.length > 0"> -->
            <af-table-column type="index" label="No." width="55" align="center">
            </af-table-column>
            <af-table-column prop="account" label="account" align="center">
            </af-table-column>
            <af-table-column prop="avatar" label="avatar" align="center">
              <template slot-scope="scope">
                <img
                  class="el-image"
                  v-if="scope.row.avatar === 'avatar.gif'"
                  src="~@/assets/images/sand.png"
                  alt=""
                />
                <span v-else>{{ scope.row.avatar }}</span>
              </template>
            </af-table-column>
            <af-table-column prop="birthday" label="birthday" align="center">
            </af-table-column>
            <af-table-column prop="deptName" label="deptName" align="center">
            </af-table-column>
            <af-table-column prop="deptid" label="deptid" align="center">
            </af-table-column>
            <af-table-column prop="email" label="email" align="center">
            </af-table-column>
            <af-table-column prop="name" label="name" align="center">
            </af-table-column>
            <af-table-column prop="phone" label="phone" align="center">
            </af-table-column>
            <af-table-column prop="roleName" label="roleName" align="center">
            </af-table-column>
            <af-table-column prop="roleid" label="roleid" align="center">
            </af-table-column>
            <af-table-column prop="sex" label="sex" align="center">
            </af-table-column>
            <af-table-column prop="sexName" label="sexName" align="center">
            </af-table-column>
            <af-table-column prop="status" label="status" align="center">
            </af-table-column>
            <af-table-column
              prop="statusName"
              label="statusName"
              align="center"
            >
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
            <!-- </div> -->
          </el-table>
          <!-- </div> -->
        </el-card>
      </el-col>
    </el-row>

    <app-footer class="top-footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="mgrdialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
    <setRoleDialog
      ref="setRoleDialog"
      @fetch="fetch"
      :dialogParams="dialogParams"
    >
    </setRoleDialog>
  </el-card>
</template>

<script>
import {
  getUserMgrList,
  resetPassword,
  deleteUser,
  freezeUser,
  unfreezeUser
} from '@/api/system/mgr'
import { getDeptTree } from '@/api/system/dept'
import Dialog from './dialog.vue'
import setRoleDialog from './setRoleDialog.vue'
export default {
  components: {
    Dialog,
    setRoleDialog
  },
  inject: ['reload'],
  data() {
    return {
      // tree loading效果
      treeTableLoading: true,
      // headerTitle: 'Header'
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
        normalFull: 'calc(100vh - 304px)'
      },

      // 左侧树
      treeTableData: [],
      // 左侧树配置
      defaultProps: {
        children: 'children',
        label: 'name'
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
      // 选中的项
      multipleSelection: [],
      // 搜索项
      filterText: ''
    }
  },
  created() {
    this.getTree()
    this.getUserList()
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
      this.$refs.mgrtree.filter(val)
    }
  },
  methods: {
    // 选中项
    // handleSelectionChange(val) {
    //   console.log(val)
    //   this.multipleSelection = val
    // },
    // el-tree点击项
    handleNodeClick(data) {
      console.log(data)
      // this.formData = this.$options.data().formData
      this.formData.id = data.id
      this.getUserList(this.formData.username, this.formData.id)
    },
    // 搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
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

    // // 查询按钮
    // submitQueryForm() {
    //   const submitForm = this.$lodash.cloneDeep(this.queryForm)
    //   console.log(submitForm)
    // },
    // // 重置查询条件
    // resetQueryForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
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
    fetch() {
      this.getUserList()
    },
    // 获取树
    async getTree() {
      this.treeTableLoading = true
      await getDeptTree()
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.treeTableLoading = false
            }, 500)
            this.treeTableData = data
          } else {
            this.treeTableLoading = false
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.error('getDeptTree')
        })
    },
    // 获取用户列表
    async getUserList(name, id) {
      this.tableLoading = true
      await getUserMgrList(name, id)
        .then(result => {
          const { data, retCode, retMsg } = result.data
          console.log(data)
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
    // 表格按钮功能
    userControl(name, row) {
      if (name === 'add') {
        this.dialogParams.headerTitle = '新建用户'
        this.$refs.mgrdialog.showDialog(name)
      } else if (name === 'edit') {
        this.dialogParams.headerTitle = '编辑用户信息 - ' + row.account
        this.$refs.mgrdialog.showDialog(name, row)
      } else if (name === 'editRole') {
        this.dialogParams.headerTitle = '角色分配 - ' + row.account
        this.$refs.setRoleDialog.showDialog(name, row)
      } else if (name === 'resetPassword') {
        this.$confirm(
          '重置此账号密码，默认密码为：111111, 是否继续?',
          ` 🔓 密码重置 - ${row.account}`,
          {
            confirmButtonText: '重 置',
            cancelButtonText: '取 消',
            type: 'warning',
            closeOnClickModal: false
            // async beforeClose(action, instance, done) {
            //   if (action === 'confirm') {
            //     await resetPassword(row.id)
            //       .then(result => {
            //         console.log('🚀', result.data)
            //         const { retCode, retMsg } = result.data
            //         if (retCode === '000000') {
            //           this.$message.success('密码重置成功！')
            //           done()
            //         } else {
            //           this.$message.error(retMsg)
            //         }
            //       })
            //       .catch(() => {})
            //   } else {
            //     done()
            //   }
            // }
          }
        )
          .then(async () => {
            await resetPassword(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('密码重置成功！')
                  this.getUserList()
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {})
          })
          .catch(() => {})
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
      } else if (name === 'delete') {
        this.$confirm('删除此账号, 是否继续?', ` ❌ 删除 - ${row.account}`, {
          confirmButtonText: '重 置',
          cancelButtonText: '取 消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(async () => {
            await deleteUser(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('删除成功！')

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
  // .header-name {
  //   font-size: 20px;
  //   font-weight: 600;
  //   color: #000;
  //   overflow: hidden;
  // }
  // }
}
</style>
