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
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;">组织机构</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-refresh"
              @click="getTree"
              >刷新</el-button
            >
          </div>
          <el-skeleton v-if="treeTableLoading" />
          <el-tree
            v-else
            :data="treeTableData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="table-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <app-footer class="top-footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="mgrdialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
  </el-card>
</template>

<script>
// import { getDeptTree } from '@/api/system/mgr'
import { getDeptTree } from '@/api/system/dept'
import Dialog from './dialog.vue'
export default {
  components: {
    Dialog
  },
  inject: ['reload'],
  data() {
    return {
      // loading效果
      treeTableLoading: true,
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: '编辑部门'
      },
      //
      disablePopover: false,
      //
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
      data: [
        {
          label: '杉德集团',
          children: [
            {
              label: '华南地区',
              children: [
                {
                  label: '广州分公司'
                },
                {
                  label: '深圳分公司'
                }
              ]
            },
            {
              label: '华东地区',
              children: [
                {
                  label: '上海分公司'
                },
                {
                  label: '杭州分公司'
                }
              ]
            },
            {
              label: '华东地区',
              children: [
                {
                  label: '北京分公司'
                },
                {
                  label: '河北分公司'
                }
              ]
            }
          ]
        },
        {
          label: '人行总部'
        }
      ],
      treeTableData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getTree()
  },
  mounted() {},
  completed: {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
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
