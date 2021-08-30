<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="30%"
    @close="close('ruleForm')"
  >
    <template>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="密码1" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码2" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="数字3" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close('ruleForm')" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="sure('ruleForm')"
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    close(formName) {
      // 重置vue组件的data数据
      // this.form = this.$options.data().form
      this.dialogVisible = false
      this.resetForm(formName)
    },
    sure(formName) {
      // this.$emit('fetch')
      // this.dialogVisible = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.$emit('fetch')
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

<style></style>
