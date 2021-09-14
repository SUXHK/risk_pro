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
        <!-- 菜单名称 -->
        <el-col :span="6" style="display:inline-block">
          <el-form-item label="菜单名称:" prop="industryTitle">
            <el-input
              v-model="queryForm.industryTitle"
              placeholder="请输入菜单名称"
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
      :indent="20"
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
      class="table-shadow"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :height="!pageParams.full ? pageParams.normalFull : pageParams.fullFull"
    >
      <af-table-column type="index" label="No."> </af-table-column>
      <af-table-column label="菜单名称" prop="name" align="left">
      </af-table-column>
      <af-table-column label="请求地址" prop="url" align="left">
      </af-table-column>
      <af-table-column label="代码" prop="code" align="left"> </af-table-column>
      <af-table-column label="图标" prop="icon" align="left"> </af-table-column>
      <!-- <af-table-column label="id" prop="id" align="center"> </af-table-column> -->
      <af-table-column label="是否菜单" prop="ismenu" align="left">
      </af-table-column>
      <af-table-column label="层级" prop="levels" align="left">
      </af-table-column>
      <af-table-column label="排序" prop="num" align="left"> </af-table-column>
      <!-- <af-table-column label="parentId" prop="parentId" align="center">
      </af-table-column> -->
      <af-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="action('edit', scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-circle-plus"
            @click="action('newSubDep', scope.row)"
            >新建下级菜单</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-plus"
            @click="action('newLevelDep', scope.row)"
            >新建平级菜单</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete-solid"
            @click="action('del', scope.row)"
            >删除</el-button
          >
        </template>
      </af-table-column>
    </el-table>
    <app-footer class="footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="dialog" @fetch="fetch" :dialogParams="dialogParams"> </Dialog>
  </el-card>
</template>

<script>
import { menuMgrTree } from '@/api/system/menu'
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
    this.getMenuTree()
  },
  mounted() {},
  completed: {},
  methods: {
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
      this.getTree()
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

    // 操作
    action(name, row) {
      if (name === 'edit') {
        // 编辑部门
        this.dialogParams.headerTitle = row.name + ' - 编辑部门'
        this.$refs.dialog.showDialog(name, row)
      } else if (name === 'newSubDep') {
        // 新建下级菜单
        this.dialogParams.headerTitle = row.name + ' - 新建下级菜单'
        this.$refs.dialog.showDialog(name, row)
      } else if (name === 'newLevelDep') {
        // 新建平级菜单
        this.dialogParams.headerTitle = row.name + ' - 新建平级菜单'
        this.$refs.dialog.showDialog(name, row)
      } else if (name === 'del') {
        // 删除
        this.$message.success('ID：' + row.id + '； Name：' + name)
      } else {
        this.$message.error('调用失败...')
      }
    },
    // 获取菜单树状列表
    async getMenuTree() {
      this.tableLoading = true
      await menuMgrTree()
        .then(result => {
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.treeTableData = data[0].children
            console.log(this.treeTableData)
          } else {
            this.$$message.error(retMsg)
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
