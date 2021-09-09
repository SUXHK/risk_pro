<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="35%"
    @close="close('elForm')"
    class="mgr-dialog"
    top="10vh"
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
        label-width="120px"
      >
        <el-form-item label="选择员工：" prop="field101">
          123
        </el-form-item>
      </el-form>
    </template>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close('elForm')" size="small">取 消</el-button>
      <el-button type="warning" size="small" @click="resetForm('elForm')"
        >重 置</el-button
      >
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
      formData: {},
      rules: {
        field101: [
          {
            required: true,
            type: 'array',
            message: '请至少选择一个选择员工：',
            trigger: 'change'
          }
        ]
      },
      // 部门列表
      deptList: [],
      // 调用名字
      callName: ''
    }
  },
  methods: {
    showDialog(name, row) {
      this.callName = name
      if (name === 'editRole') {
        this.dialogVisible = true
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
      this.formData = this.$options.data().formData
    },
    sure(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.sureLoading = true
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
