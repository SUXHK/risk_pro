<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="40%"
    top="5vh"
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
          <el-col :span="12">
            <el-form-item label="字段别名：" prop="alisa">
              <el-input
                v-model="formData.alisa"
                placeholder="请输入字段别名"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务字段名：" prop="columnName">
              <el-input
                v-model="formData.columnName"
                placeholder="请输入业务字段名"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="业务描述：" prop="description">
              <el-input
                v-model="formData.description"
                placeholder="请输入业务描述"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务展示名称：" prop="displayName">
              <el-input
                v-model="formData.displayName"
                placeholder="请输入业务展示名称"
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
                inactive-text="禁用"
                :active-value="0"
                :inactive-value="1"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加密标志：" prop="encryptFlag">
              <el-switch
                v-model="formData.encryptFlag"
                active-text="加密"
                inactive-text="不加密"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="字段类型：" prop="type">
              <el-radio-group v-model="formData.type" size="small">
                <el-radio
                  class="bizDef-radio"
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顺序：" prop="orderNo">
              <el-input-number
                size="small"
                v-model="formData.orderNo"
                placeholder="顺序"
                :step="1"
                step-strictly
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="转义描述：" prop="context">
              <el-input
                v-model="formData.context"
                type="textarea"
                placeholder="请输入转义描述"
                show-word-limit
                :autosize="{ minRows: 2 }"
                maxlength="200"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="memo">
              <el-input
                v-model="formData.memo"
                type="textarea"
                placeholder="请输入备注"
                show-word-limit
                :autosize="{ minRows: 2 }"
                maxlength="200"
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
import {
  columnDefMgrView,
  columnDefMgrUpdate,
  columnDefMgrInsert
} from '@/api/system/bizDef'
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
      // 表单
      formData: {
        alisa: '', // 字段别名
        columnName: '', // 业务字段名
        context: '', // 转义描述
        description: '', // 业务描述
        displayName: '', // 业务展示名称
        encryptFlag: 0, // 加密标志（0：不加密 1：加密）
        id: '', // 主键
        memo: '', // 备注
        orderNo: 0, // 顺序
        status: 1, // 状态 0：启用 1：隐藏
        tableId: '', // 业务表名
        type: '' // 字段类型(1：字符型 2：数值型 3：日期 4：时间）
      },
      rules: {
        alisa: [
          {
            required: true,
            message: '请输入业务表别名',
            trigger: 'blur'
          }
        ],
        columnName: [
          {
            required: true,
            message: '请输入业务字段名',
            trigger: 'blur'
          }
        ],
        context: [
          {
            required: true,
            message: '请输入转义描述',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入业务描述',
            trigger: 'blur'
          }
        ],
        displayName: [
          {
            required: true,
            message: '请输入业务展示名称',
            trigger: 'blur'
          }
        ],
        encryptFlag: [
          {
            required: true,
            message: '请选择加密标志',
            trigger: 'blur'
          }
        ],
        memo: [
          {
            // required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ],
        orderNo: [
          {
            required: true,
            message: '请选择顺序',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择字段类型',
            trigger: 'blur'
          }
        ]
      },
      typeOptions: [
        {
          label: '字符型',
          value: 1
        },
        {
          label: '数值型',
          value: 2
        },
        {
          label: '日期',
          value: 3
        },
        {
          label: '时间',
          value: 4
        }
      ]
    }
  },
  methods: {
    showDialog(name, row) {
      this.callName = name
      // this.formData.id = row.id
      if (name === 'edit') {
        this.dialogVisible = true
        // this.formData = this.$lodash.cloneDeep(row)
        // // 指定id
        // this.$set(this.formData, 'tableId', id)
        // console.log(this.formData)
        this.getView(row.id)
        // 获取详情
      } else if (name === 'add') {
        this.formData.tableId = this.$route.query.tableId
        this.dialogVisible = true
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
            console.log(this.formData)
            await columnDefMgrUpdate(this.formData)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.sureLoading = false
                    this.$emit('fetch')
                    this.dialogVisible = false
                  }, 500)
                  this.$message.success('编辑成功')
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {
                console.log('🛸🛸🛸🛸🛸🛸🛸')
              })
          } else if (this.callName === 'add') {
            await columnDefMgrInsert(this.formData)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.sureLoading = false
                    this.$emit('fetch')
                    this.dialogVisible = false
                  }, 500)
                  this.$message.success('添加成功')
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {
                console.log('🛸🛸🛸🛸🛸🛸🛸')
              })
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
    },
    // 业务表字段详情
    async getView(id) {
      await columnDefMgrView(id)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.formData = data
            if (this.formData.encryptFlag === '') {
              this.formData.encryptFlag = 0
            }
            if (this.formData.status === '') {
              this.formData.status = 1
            }
          } else {
            this.$message.error(retMsg)
            setTimeout(() => {
              this.dialogVisible = false
            }, 1500)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    }
  }
}
</script>

<style></style>
