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
          <el-skeleton
            v-if="treeTableLoading"
            :style="{
              height: !pageParams.full
                ? pageParams.normalFull
                : pageParams.fullFull
            }"
          />
          <el-tree
            node-key="id"
            :current-node-key="1"
            :expand-on-click-node="false"
            highlight-current
            v-else
            :data="treeTableData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
            :style="{
              height: !pageParams.full
                ? pageParams.normalFull
                : pageParams.fullFull
            }"
          ></el-tree>
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
                <!-- </el-col>
                  <el-col :span="4"> -->
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
                    @click="addUser('add')"
                  >
                    新建用户
                  </el-button></el-form-item
                >
                <el-form-item label-width="10px"
                  ><el-button type="danger" icon="el-icon-error" size="small">
                    删除用户
                  </el-button></el-form-item
                >
                <el-form-item label-width="10px"
                  ><el-button icon="el-icon-remove" type="warning" size="small">
                    停用用户
                  </el-button></el-form-item
                >
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
            @selection-change="handleSelectionChange"
          >
            <!-- <div v-if="tableData.length > 0"> -->
            <!-- <af-table-column type="selection" width="55" align="center">
            </af-table-column> -->
            <!-- </div> -->

            <!-- <div v-if="tableData.length > 0"> -->
            <af-table-column type="selection" width="55" align="center">
            </af-table-column>
            <af-table-column type="index" label="No." width="55" align="center">
            </af-table-column>
            <af-table-column prop="account" label="account" align="center">
            </af-table-column>
            <af-table-column prop="avatar" label="avatar" align="center">
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
                  @click="addUser('edit', scope.row)"
                >
                  编辑
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small">
                  停用
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small">
                  删除
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small">
                  更改密码
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
  </el-card>
</template>

<script>
import { getUserMgrList } from '@/api/system/mgr'
import { getDeptTree } from '@/api/system/dept'
import Dialog from './dialog.vue'
export default {
  components: {
    Dialog
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
        username: '',
        time: []
      },
      rules: {
        username: [],
        time: []
      },
      // 表格数据
      tableData: [],
      // 表格加载
      tableLoading: true,
      // 选中的项
      multipleSelection: []
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
  methods: {
    // 选中项
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // el-tree点击项
    handleNodeClick(data) {
      console.log(data)
      // this.formData = this.$options.data().formData
      this.formData.id = data.id
      this.getUserList(
        this.formData.time,
        this.formData.time,
        this.formData.username,
        this.formData.id
      )
    },
    // 提交搜索
    submitForm() {
      console.log(this.formData)
      this.getUserList(
        this.formData.time,
        this.formData.time,
        this.formData.username,
        this.formData.id
      )
    },
    // 重置搜索
    resetForm(formName) {
      this.formData.id = ''
      this.getTree()
      this.$refs[formName].resetFields()
      this.getUserList()
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
    fetch(formData) {
      this.$message.success('OK')
      console.log(formData)
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
            this.treeTableData = data.children
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
    async getUserList(bTime, eTime, name, id) {
      this.tableLoading = true
      await getUserMgrList(bTime, eTime, name, id)
        .then(result => {
          const { data, retCode, retMsg } = result.data
          console.log(data)
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.tableData = data
          } else {
            this.treeTableLoading = false
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    addUser(name, row) {
      if (name === 'add') {
        this.dialogParams.headerTitle = '新建用户'
        this.$refs.mgrdialog.showDialog(name)
      } else if (name === 'edit') {
        this.dialogParams.headerTitle = '编辑用户信息 - ' + row.account
        this.$refs.mgrdialog.showDialog(name, row)
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
  .clearfix {
    display: flex;
    height: 50px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .header-name {
      font-size: 20px;
      font-weight: 600;
      color: #000;
      overflow: hidden;
    }
  }
}
</style>
