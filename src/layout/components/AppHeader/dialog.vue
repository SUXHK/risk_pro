<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="30%"
    @close="isEditPassword ? closeForm('elForm') : close"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <template v-if="isEditPassword">
      <el-form
        ref="elForm"
        :model="formDataPass"
        :rules="rulesPass"
        size="medium"
        label-position="top"
        class="mar-add-form"
      >
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="旧密码" prop="oldPwd">
              <el-input
                v-model="formDataPass.oldPwd"
                placeholder="请输入旧密码"
                :maxlength="32"
                clearable
                prefix-icon="el-icon-lock"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="新密码" prop="newPwd">
              <el-input
                v-model="formDataPass.newPwd"
                placeholder="请输入新密码"
                :maxlength="32"
                clearable
                prefix-icon="el-icon-lock"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="验证新密码" prop="new2Pwd">
              <el-input
                v-model="formDataPass.new2Pwd"
                placeholder="请再次输入新密码"
                :maxlength="32"
                clearable
                prefix-icon="el-icon-lock"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close('elForm')" size="small">取 消</el-button>
        <el-button type="warning" size="small" @click="resetForm('elForm')"
          >重 置</el-button
        >
        <el-button
          type="primary"
          :loading="sureLoading"
          size="small"
          @click="sureForm('elForm')"
          >确 定</el-button
        >
      </span>
    </template>
    <template v-else>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="用户名">
          <el-tag size="small">{{
            $store.getters.name
          }}</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="手机号"
          ><el-tag size="small">138 0013 8000</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="居住地" :span="2"
          ><el-tag size="small">上海市</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="备注">
          <el-tag size="small">杉德</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址"
          ><el-tag size="small"
            >田林路487号宝石园22号楼 - 杉德大厦</el-tag
          ></el-descriptions-item
        >
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="sure">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { changePwd } from '@/api/system/mgr'
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
    var validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.formDataPass.newPwd !== '') {
          this.$refs.elForm.validateField('newPwd')
        }
        callback()
      }
    }
    var validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.formDataPass.oldPwd) {
        callback(new Error('旧密码和新密码一致，请换个密码!'))
      } else {
        callback()
      }
    }
    var validateNew2Pwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.formDataPass.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      isEditPassword: false,
      sureLoading: false,
      formDataPass: {
        oldPwd: '',
        newPwd: '',
        new2Pwd: ''
      },
      rulesPass: {
        oldPwd: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          },
          { validator: validateOldPwd, trigger: 'blur' }
        ],
        newPwd: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        new2Pwd: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          { validator: validateNew2Pwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showDialog(name) {
      if (name === 'help') {
        this.isEditPassword = false
        this.dialogVisible = true
      } else if (name === 'edit') {
        this.isEditPassword = true
        this.dialogVisible = true
      } else {
        this.$message.error('调用失败...')
        this.dialogVisible = false
        this.isEditPassword = false
      }
    },
    close() {
      this.dialogVisible = false
    },
    sure() {
      this.dialogVisible = false
      this.$emit('fetch')
    },
    closeForm(formName) {
      // 重置vue组件的data数据
      // this.form = this.$options.data().form
      this.dialogVisible = false
      this.resetForm(formName)
      // this.formDataPass = this.$options.data().formDataPass
    },
    sureForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.sureLoading = true
          // this.dialogVisible = false
          await changePwd(this.formDataPass.newPwd, this.formDataPass.oldPwd)
            .then(res => {
              console.log('🚀', res.data)
              const { retCode, retMsg } = res.data
              if (retCode === '000000') {
                this.sureLoading = false
                this.$message.success('密码修改成功！请牢记新密码')
                this.$emit('fetch', this.formDataPass)
                this.dialogVisible = false
              } else {
                setTimeout(() => {
                  this.sureLoading = false
                }, 500)
                this.$message.error(retMsg)
              }
            })
            .catch(() => {
              this.sureLoading = false
              console.log('🛸🛸🛸🛸🛸🛸🛸')
            })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style></style>
