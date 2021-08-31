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
        label-width="80px"
      >
        <!-- 部门名称 -->
        <el-col :span="6" style="display:inline-block">
          <el-form-item label="部门名称:" prop="industryTitle">
            <el-input
              v-model="queryForm.industryTitle"
              placeholder="请输入部门名称"
              clearable
              :style="{ width: '80%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 状态 -->
        <el-col :span="6" style="display:inline-block">
          <el-form-item label="状态:" prop="state">
            <el-select
              v-model="queryForm.state"
              placeholder="请选择状态"
              clearable
              :style="{ width: '80%' }"
            >
              <el-option
                v-for="(item, index) in stateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="display:inline-block;">
          <el-form-item label-width="0px">
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
        </el-col>
      </el-form>
    </el-row>
    <el-table
      :data="treeTableData"
      size="small"
      :border="false"
      :stripe="true"
      highlight-current-row
      :header-cell-style="{
        background: pageParams.full ? '#e7eaff' : '',
        color: '#909399'
      }"
      v-loading="tableLoading"
      row-key="id"
      class="table-tree"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :height="!pageParams.full ? pageParams.normalFull : pageParams.fullFull"
    >
      <el-table-column prop="name" label="name" align="center">
      </el-table-column>
      <el-table-column prop="id" label="id" align="center"> </el-table-column>
      <el-table-column prop="checked" label="checked" align="center">
      </el-table-column>
      <el-table-column prop="open" label="open" align="center">
        <!-- <template slot-scope="scope">
              {{ scope.row }}
            </template> -->
      </el-table-column>
      <el-table-column prop="pId" label="pId" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="420" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="editDialog(scope.row, 'edit')"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>

          <el-button
            type="text"
            size="small"
            icon="el-icon-circle-plus"
            @click="editDialog(scope.row, 'newSubDep')"
            >新建下级部门</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-plus"
            @click="editDialog(scope.row, 'newLevelDep')"
            >新建平级部门</el-button
          >
          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click" size="medium" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-remove"
              >停用</el-button
            >
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="removeAndDel(scope.row, 'disable')"
                ><svg-icon
                  icon-class="person-off"
                  style="font-size:16px;margin-right:5px"
                ></svg-icon
                >停用一部门不包含员工</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="removeAndDel(scope.row, 'disableAll')"
                ><svg-icon
                  icon-class="group_off"
                  style="font-size:16px; margin-right:5px"
                ></svg-icon
                >停用一部门包含员工</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-divider direction="vertical"></el-divider>

          <el-dropdown trigger="click" size="medium" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-delete-solid"
              >删除</el-button
            >
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="removeAndDel(scope.row, 'del')"
                ><svg-icon
                  icon-class="remove_person"
                  style="font-size:16px; margin-right:5px"
                ></svg-icon
                >删除一部门不包含员工</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="removeAndDel(scope.row, 'delAll')"
                ><svg-icon
                  icon-class="remove_group"
                  style="font-size:16px; margin-right:5px"
                ></svg-icon
                >删除一部门包含员工</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <app-footer class="footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="deptdialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
  </el-card>
</template>

<script>
import { getDeptTree } from '@/api/system/dept'
import Dialog from './dialog.vue'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: '编辑部门'
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
      treeTableData: [],
      // 表单label对象
      treeTableLabel: {},
      // 查询表单
      queryForm: {
        industryTitle: '',
        state: ''
      },
      // 查询表单规则
      queryFormRules: {
        industryTitle: [],
        state: []
      },

      // 状态选项
      stateOptions: []
    }
  },
  created() {
    this.getTree()
  },
  mounted() {},
  completed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取树
    async getTree() {
      this.tableLoading = true
      await getDeptTree()
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.treeTableData = data.children
            this.treeTableLabel = this.treeTableData[0]
            console.log(this.treeTableLabel)
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.error('getDeptTree')
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
    fetch(formData) {
      this.$message.success('OK')
      console.log(formData)
    },
    editDialog(row, name) {
      if (name === 'edit') {
        // 编辑部门
        this.dialogParams.headerTitle = '编辑部门 - ' + row.name
        this.$refs.deptdialog.showDialog(row.id, name)
      } else if (name === 'newSubDep') {
        // 新建下级部门
        this.dialogParams.headerTitle = '新建下级部门 - ' + row.name
        this.$refs.deptdialog.showDialog(row.id, name)
      } else if (name === 'newLevelDep') {
        // 新建平级部门
        this.dialogParams.headerTitle = '新建平级部门 - ' + row.name
        this.$refs.deptdialog.showDialog(row.id, name)
      } else {
        this.$message.error('调用失败...')
      }
    },
    removeAndDel(row, name) {
      if (name === 'disable') {
        this.$message.success('ID：' + row.id + '； Name：' + name)
      } else if (name === 'disableAll') {
        this.$message.success('ID：' + row.id + '； Name：' + name)
      } else if (name === 'del') {
        this.$message.success('ID：' + row.id + '； Name：' + name)
      } else if (name === 'delAll') {
        this.$message.success('ID：' + row.id + '； Name：' + name)
      } else {
        this.$message.error('调用失败...')
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
