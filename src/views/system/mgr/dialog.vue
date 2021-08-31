<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="35%"
    @close="close('elForm')"
  >
    <template>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="100px"
      >
        <el-form-item label="上级部门：" prop="field101">
          <el-select
            v-model="formData.field101"
            placeholder="点击输入搜索或选择上级部门"
            filterable
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field101Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称：" prop="field102">
          <el-input
            v-model="formData.field102"
            placeholder="请输入部门名称："
            :maxlength="18"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人：" prop="field103">
          <el-select
            v-model="formData.field103"
            placeholder="请选择负责人"
            filterable
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field103Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
          <span style="color: #8d8d8d;font-size: 14px"
            >部门负责人为部门管理者</span
          >
        </el-form-item>
        <el-form-item label="手机号：" prop="field106">
          <el-input
            v-model="formData.field106"
            placeholder="请输入手机号"
            :maxlength="11"
            clearable
            prefix-icon="el-icon-mobile"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="field107">
          <el-select
            v-model="formData.field107"
            placeholder="请选择分类"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field107Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示排序：" prop="field108">
          <el-input-number
            v-model="formData.field108"
            placeholder="显示排序"
            :step="1"
            step-strictly
            :max="100"
          >
          </el-input-number>
        </el-form-item>

        <el-form-item label="部门状态：" prop="field110" v-if="showDepState">
          <el-radio-group v-model="formData.field110" size="medium">
            <el-radio
              v-for="(item, index) in field110Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="field109">
          <el-input
            v-model="formData.field109"
            type="textarea"
            placeholder="请输入备注"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: undefined }"
            maxlength="1000"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close('elForm')" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="sure('elForm')"
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
      // dialog状态
      dialogVisible: false,
      // 部门显示状态
      showDepState: false,
      // 表单
      formData: {
        field101: 1, // 上级部门
        field102: '123', // 部门名称
        field103: 2, // 负责人
        field106: '17630961996', // 手机号
        field107: 1, // 分类
        field108: 1, // 显示排序
        field109: '123' // 备注
      },
      rules: {
        field101: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'change'
          }
        ],
        field102: [
          {
            required: true,
            message: '请输入部门名称：',
            trigger: 'blur'
          }
        ],
        field103: [],
        field106: [
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        field107: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }
        ],
        field108: [
          {
            required: true,
            message: '显示排序',
            trigger: 'blur'
          }
        ],
        field109: []
      },
      field101Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      field103Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      field107Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      field110Options: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '停用',
          value: 2
        }
      ]
    }
  },
  methods: {
    showDialog(id, name) {
      console.log(id)
      if (name === 'edit') {
        // 编辑部门
        this.showDepState = false
        this.dialogVisible = true
      } else if (name === 'newSubDep') {
        // 新建下级部门
        this.showDepState = true
        this.dialogVisible = true
        // Object.assign(this.formData, { field110: '' })
        this.$set(this.formData, 'field110', 1)
      } else if (name === 'newLevelDep') {
        // 新建平级部门
        this.showDepState = true
        this.dialogVisible = true
        this.$set(this.formData, 'field110', 1)
      } else {
        this.$message.error('调用失败...')
        this.showDepState = false
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.$emit('fetch', this.formData)
          console.log(Object.keys(this.formData).length)
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
