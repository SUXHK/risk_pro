<template>
  <el-card class="card-sys" :class="pageParams.full ? 'fullScreen' : ''">
    <div slot="header" class="clearfix">
      <div class="header-name">
        {{ pageParams.headerTitle }}

        <el-popover placement="bottom" title="说明" trigger="click" width="300">
          <br />
          <div>
            <div style="display: inline-block;margin-right:100px">
              <el-badge
                value="父级菜单：没有功能，只是包含子级菜单项"
                class="item"
              >
                父级菜单
              </el-badge>
            </div>
            <br /><br />
            <div style="display: inline-block;margin-right:100px">
              <el-badge
                value="子级菜单：功能菜单项"
                type="primary"
                class="item"
              >
                子级菜单
              </el-badge>
            </div>
            <br /><br />
            <div style="display: inline-block;margin-right:100px">
              <el-badge value="页面上的按钮项" type="primary" class="item">
                <el-tag effect="plain">按钮</el-tag>
              </el-badge>
            </div>
          </div>
          <br />
          <svg-icon
            slot="reference"
            title="菜单管理 - 帮助"
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
        label-width="80px"
        style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
      >
        <!-- 菜单名称 -->
        <div style="display:flex">
          <el-form-item label="菜单名称:" prop="industryTitle">
            <el-input
              v-model="queryForm.industryTitle"
              placeholder="请输入菜单名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <!-- 状态 -->

          <el-form-item label="状态:" prop="state">
            <el-select
              v-model="queryForm.state"
              placeholder="请选择状态"
              clearable
              :style="{ width: '100%' }"
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
        <div style="display:flex">
          <el-form-item label-width="10px"
            ><el-button
              type="primary"
              icon="el-icon-circle-plus"
              size="small"
              @click="action('add')"
            >
              新建菜单
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
    </el-row>
    <!-- :data="treeTableData" -->
    <el-table
      :data="treeTableData"
      size="medium"
      :border="false"
      :stripe="true"
      style="width:100%"
      highlight-current-row
      :header-cell-style="{
        background: pageParams.full ? '#e7eaff' : '',
        color: '#909399'
      }"
      v-loading="tableLoading"
      row-key="id"
      ref="treeTable"
      class="table-shadow"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :height="!pageParams.full ? pageParams.normalFull : pageParams.fullFull"
    >
      <!-- <af-table-column type="index" label="No."> </af-table-column> -->
      <el-table-column prop="name" label="菜单名称" min-width="270">
        <template slot-scope="scope">
          <template v-if="scope.row.ismenu === 1">
            <el-badge
              value="父级菜单"
              v-if="scope.row.levels === 1"
              class="item"
            >
              {{ scope.row.name }}
            </el-badge>
            <el-badge
              value="子级菜单"
              type="primary"
              v-if="scope.row.levels === 2"
              class="item"
            >
              {{ scope.row.name }}
            </el-badge>
          </template>
          <!-- <el-badge
            value="按钮"
            type="success"
            v-if="scope.row.ismenu === 0"
            class="item"
          >
            <el-tag effect="plain" type="success">{{ scope.row.name }}</el-tag>
          </el-badge> -->
          <el-tag effect="plain" v-if="scope.row.ismenu === 0">{{
            scope.row.name
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="url"
        :fontRate="fontRate"
        label="请求地址"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-link type="success">{{ scope.row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="代码" min-width="200">
        <template slot-scope="scope">
          <el-link type="danger">{{ scope.row.code }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
      <el-table-column prop="ismenu" label="是否菜单">
        <template slot-scope="scope">
          <span v-if="scope.row.ismenu == 1">
            <span v-if="scope.row.levels === 1"
              ><svg-icon
                title="菜单项"
                icon-class="menu-3-line"
                style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #f34d37;"
              ></svg-icon
              >菜单项</span
            >
            <span v-if="scope.row.levels === 2"
              ><svg-icon
                title="功能菜单"
                icon-class="menu-4-line"
                style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #6672fb;"
              ></svg-icon
              >功能菜单</span
            >
          </span>
          <span v-else>
            <svg-icon
              title="按钮"
              icon-class="radio-button-line"
              style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #47ba80;"
            ></svg-icon
            >按钮
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="levels" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.levels === 1" style="color:#0015FF"
            ><svg-icon
              title="层级"
              icon-class="stack-line"
              style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #0015FF;"
            ></svg-icon
            >{{ scope.row.levels }}</span
          >
          <span v-if="scope.row.levels === 2" style="color:#515FF9"
            ><svg-icon
              title="层级"
              icon-class="stack-line"
              style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #515FF9;"
            ></svg-icon
            >{{ scope.row.levels }}</span
          >
          <span v-if="scope.row.levels === 3" style="color:#97A0F8"
            ><svg-icon
              title="层级"
              icon-class="stack-line"
              style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #97A0F8;"
            ></svg-icon
            >{{ scope.row.levels }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="num" label="排序">
        <template slot-scope="scope">
          <svg-icon
            title="排序"
            icon-class="sort-asc"
            style="font-size:16px;margin:0 5px;vertical-align:text-bottom;color: #6672fb;"
          ></svg-icon
          >{{ scope.row.num }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="action('edit', scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            confirm-button-text="是的"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            :title="scope.row.ismenu == 1 ? '确定删除菜单？' : '确定删除按钮？'"
            @confirm="action('del', scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              size="small"
              icon="el-icon-delete-solid"
              >删除</el-button
            >
          </el-popconfirm>
          <!-- <el-button
            type="text"
            size="small"
            icon="el-icon-delete-solid"
            @click="action('del', scope.row)"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <app-footer class="footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="dialog" @fetch="fetch" :dialogParams="dialogParams"> </Dialog>
  </el-card>
</template>

<script>
import { menuMgrTree, menuMgrRemove } from '@/api/system/menu'
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
        headerTitle: '编辑菜单'
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
      // 定义字体比例
      fontRate: {
        CHAR_RATE: 1.2, // 汉字比率 1.1
        NUM_RATE: 1.3, // 数字 0.65
        OTHER_RATE: 1 // 除汉字和数字以外的字符的比率 0.8
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
      this.getMenuTree()
    },
    // 重置查询条件
    resetQueryForm(formName) {
      this.$refs[formName].resetFields()
      this.submitQueryForm()
    },

    // 操作
    async action(name, row) {
      if (name === 'edit') {
        // 编辑部门
        this.dialogParams.headerTitle = row.name + ' - 编辑菜单'
        this.$refs.dialog.showDialog(name, row)
      } else if (name === 'add') {
        // 新建下级菜单
        this.dialogParams.headerTitle = '新建下级菜单'
        this.$refs.dialog.showDialog(name)
      } else if (name === 'del') {
        // 删除
        await menuMgrRemove(row.id)
          .then(result => {
            console.log('🚀', result.data)
            const { retCode, retMsg } = result.data
            if (retCode === '000000') {
              this.$message.success('删除成功')
            } else {
              this.$message.error(retMsg)
            }
          })
          .catch(() => {
            console.log('🛸🛸🛸🛸🛸🛸🛸')
          })
      } else {
        this.$message.error('调用失败...')
      }
    },
    // 获取菜单树状列表
    async getMenuTree() {
      this.tableLoading = true
      await menuMgrTree()
        .then(result => {
          console.log(result)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.treeTableData = data[0].children
            // this.treeTableData = data
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
