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
        label-width="120px"
        label-position="top"
        class="mar-add-form"
        style="padding: 0 20px;"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单名称：" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入菜单名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="url地址：" prop="url">
              <el-input
                v-model="formData.url"
                placeholder="请输入url地址"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单标签：" prop="code">
              <el-input
                v-model="formData.code"
                placeholder="请输入菜单标签"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标：" prop="icon">
              <el-input
                v-model="formData.icon"
                placeholder="请输入菜单图标"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否是菜单：" prop="ismenu">
              <el-radio-group v-model="formData.ismenu" size="medium">
                <el-radio
                  v-for="(item, index) in ismenuOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单排序号：" prop="num">
              <el-input-number
                v-model="formData.num"
                placeholder="排序号"
                :step="1"
                step-strictly
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单状态：" prop="status">
              <el-radio-group v-model="formData.status" size="medium">
                <el-radio
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否打开：" prop="isopen">
              <el-radio-group v-model="formData.isopen" size="medium">
                <el-radio
                  v-for="(item, index) in isopenOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="tips">
              <el-input
                v-model="formData.tips"
                type="textarea"
                placeholder="请输入备注"
                :maxlength="50"
                show-word-limit
                :autosize="{ minRows: 3, maxRows: undefined }"
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
import { menuMgrEdit } from '@/api/system/menu'
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
      // 调用名字
      callName: '',
      // 部门显示状态
      // showDepState: false,
      // 部门列表
      deptList: [],
      // 表单
      formData: {
        name: '',
        code: '',
        icon: '',
        url: '',
        ismenu: 1,
        id: '',
        pid: '',
        // isopen: 1,
        // status: 1,
        num: 0,
        tips: ''
      },
      rules: {
        pid: [
          {
            required: true,
            type: 'array',
            message: '请至少选择一个父级菜单：',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入菜单标签',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            // required: true,
            message: '请输入菜单图标',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入url地址',
            trigger: 'blur'
          }
        ],
        ismenu: [
          {
            required: true,
            message: '是否是菜单：不能为空',
            trigger: 'change'
          }
        ],
        isopen: [
          {
            required: true,
            message: '是否打开：不能为空',
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '菜单状态：不能为空',
            trigger: 'change'
          }
        ],
        num: [
          {
            required: true,
            message: '排序号',
            trigger: 'blur'
          }
        ],
        tips: [
          {
            // required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ]
      },
      ismenuOptions: [
        {
          label: '菜单',
          value: 1
        },
        {
          label: '按钮',
          value: 0
        }
      ],
      isopenOptions: [
        {
          label: '打开',
          value: 1
        },
        {
          label: '不打开',
          value: 2
        }
      ],
      statusOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '不启用',
          value: 2
        }
      ],
      pidProps: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  methods: {
    showDialog(name, row) {
      this.callName = name
      console.log(row)
      if (name === 'edit') {
        this.formData = this.$lodash.cloneDeep(row)
        this.formData.status = 1
        this.dialogVisible = true
      } else if (name === 'newSubDep') {
        this.dialogVisible = true
      } else if (name === 'newLevelDep') {
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
      // this.$emit('fetch')
      // this.dialogVisible = false
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.sureLoading = true
          if (this.callName === 'edit') {
            await menuMgrEdit(this.formData)
              .then(result => {
                console.log('🚀', result.data)
                this.sureLoading = false
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('编辑成功')
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {
                console.log('🛸🛸🛸🛸🛸🛸🛸')
                this.sureLoading = false
              })
          } else if (this.callName === 'newSubDep') {
            this.$message.info('newSubDep')
          } else if (this.callName === 'newLevelDep') {
            this.$message.info('newLevelDep')
          } else {
            this.$message.error('error submit!!')
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
