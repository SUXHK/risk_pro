<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="30%"
    @close="close('elForm')"
    class="mgr-dialog"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <template>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="员工：" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="员工"
            readonly
            clearable
            prefix-icon="el-icon-user-solid"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择角色：" prop="roleIds">
          <el-cascader
            v-model="formData.roleIds"
            :options="roleIdOptions"
            :props="roleIdProps"
            :style="{ width: '100%' }"
            placeholder="请选择角色或点击搜索，支持多选角色"
            separator=" / "
            filterable
            :show-all-levels="false"
            clearable
            ref="myCascader"
            ><template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template></el-cascader
          >
        </el-form-item>
      </el-form>
    </template>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close('elForm')" size="small">取 消</el-button>
      <el-button type="warning" size="small" @click="reset">重 置</el-button>
      <el-button
        type="primary"
        :loading="sureLoading"
        size="small"
        @click="sure('elForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { setRole } from '@/api/system/mgr'
import { getRoleTree } from '@/api/system/role'
export default {
  name: 'Dialog',
  props: {
    dialogParams: {
      type: Object,
      default() {
        return {
          headerTitle: {
            type: String,
            default: 'DialogHeaderTitle'
          }
        }
      }
    }
  },
  data() {
    return {
      sureLoading: false,
      // dialog状态
      dialogVisible: false,
      // 部门显示状态
      showDepState: false,
      // 表单
      formData: {
        userId: '',
        name: '',
        roleIds: []
      },
      rules: {
        userId: [],
        name: [],
        roleIds: [
          {
            required: true,
            type: 'array',
            message: '请至少选择一个角色',
            trigger: 'change'
          }
        ]
      },
      // 部门列表
      roleIdOptions: [],
      roleIdProps: {
        multiple: true,
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  methods: {
    // 选中的cascader
    // handleAreaChange(val) {
    //   console.log(val)
    //    this.$refs.myCascader.getCheckedNodes()[0].pathLabels
    //    // 选中的lable文字
    // },

    showDialog(name, row) {
      console.log('row', row)
      this.getRoleList()
      if (name === 'editRole') {
        this.dialogVisible = true
        this.formData.userId = row.id
        this.formData.name = row.account
        console.log(row)

        console.log(row.roleIds.indexOf(',') > -1)
        if (row.roleIds.indexOf(',') > -1) {
          const arr = []
          const roleIdList = row.roleIds.split(',')
          for (var i = 0; i < roleIdList.length; i++) {
            arr.push(roleIdList[i])
          }
          this.formData.roleIds = arr
        } else {
          this.formData.roleIds.push(row.roleIds)
        }
      } else {
        this.$message.error('调用失败...')
        this.dialogVisible = false
      }
    },
    close(formName) {
      // 重置vue组件的data数据
      // this.$message({
      //   iconClass: 'el-icon-loading',
      //   message: '重置vue组件的data数据',
      //   duration: 1000
      // })
      this.dialogVisible = false
      this.resetForm(formName)
      // this.formData = this.$options.data().formData
    },
    sure(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await setRole(this.formData.roleIds + '', this.formData.userId)
            .then(result => {
              console.log(result.data)
              const { retCode, retMsg } = result.data
              if (retCode === '000000') {
                this.$message.success('角色分配成功')
                this.sureLoading = false
                this.dialogVisible = false
                this.$emit('fetch')
              } else {
                this.$message.error(retMsg)
                this.sureLoading = false
              }
            })
            .catch(() => {
              console.log('🛸🛸🛸🛸🛸🛸🛸')
              this.sureLoading = false
            })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.formData.roleIds = []
      this.$refs[formName].resetFields()
      // this.$refs.elForm.clearValidate()
    },
    reset() {
      console.log()

      this.formData.roleIds = []
    },
    // 获取角色列表
    async getRoleList() {
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            this.roleIdOptions = data[0].children
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    }
  }
}
</script>
