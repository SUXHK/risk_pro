<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="35%"
    @close="close('elForm')"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <template>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="业务表别名：" prop="alias">
              <el-input
                v-model="formData.alias"
                placeholder="请输入业务表别名"
                :maxlength="18"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="业务表名：" prop="displayName">
              <el-input
                v-model="formData.displayName"
                placeholder="请输入业务表名"
                :maxlength="18"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态：" prop="status">
              <el-switch
                v-model="formData.status"
                active-text="启用"
                inactive-text="停用"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述：" prop="description">
              <el-input
                v-model="formData.description"
                type="textarea"
                placeholder="请输入备注"
                show-word-limit
                :autosize="{ minRows: 3 }"
                maxlength="1000"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close('elForm')" size="small">取 消</el-button>
      <el-button
        type="warning"
        size="small"
        @click="resetForm('elForm')"
        v-if="callName === 'add'"
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
// import {} from '@/api/system/dept'
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
      // 部门列表
      deptOptions: [],
      deptProps: {
        multiple: false,
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true,
        emitPath: false,
        expandTrigger: 'hover'
      },
      sureLoading: false,
      // dialog状态
      dialogVisible: false,
      // 调用名字
      callName: '',
      // 表单
      formData: {
        alias: '', // 业务表别名
        displayName: '', // 业务表名
        description: '', // 描述
        status: '' // 状态
      },
      rules: {
        alias: [
          {
            required: true,
            message: '请输入业务表别名',
            trigger: 'blur'
          }
        ],
        displayName: [
          {
            required: true,
            message: '请输入业务表名',
            trigger: 'blur'
          }
        ],
        description: [
          {
            // required: true,
            message: '请输入描述',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    showDialog(name, row) {
      this.callName = name
      // this.formData.id = row.id
      if (name === 'edit') {
        this.dialogVisible = true
        // 获取详情
      } else {
        this.$message.error('Error ')
      }
    },
    close(formName) {
      this.dialogVisible = false
      this.resetForm(formName)
    },
    sure(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.sureLoading = true
          if (this.callName === 'edit') {
          } else {
          }
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
