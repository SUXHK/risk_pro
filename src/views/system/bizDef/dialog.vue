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
          <el-col :span="12">
            <el-form-item label="上级部门：" prop="pid">
              <el-cascader
                v-model="formData.pid"
                :options="deptOptions"
                :props="deptProps"
                :style="{ width: '100%' }"
                :placeholder="
                  callName === 'add'
                    ? '请选择上级部门 / 点击搜索'
                    : '谨慎修改部门'
                "
                separator=" / "
                filterable
                :show-all-levels="false"
                clearable
                ref="myCascader"
                ><template slot-scope="{ node, data }">
                  <span>{{ data.name }}</span>
                  <span v-if="!node.isLeaf">
                    ({{ data.children.length }})
                  </span>
                </template></el-cascader
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门全称：" prop="fullname">
              <el-input
                v-model="formData.fullname"
                placeholder="请输入部门全称"
                :maxlength="18"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门简称：" prop="simplename">
              <el-input
                v-model="formData.simplename"
                placeholder="请输入部门简称"
                :maxlength="18"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序：" prop="num">
              <el-input-number
                v-model="formData.num"
                placeholder="显示排序"
                :step="1"
                step-strictly
                :max="100"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="部门状态：" prop="field110" v-if="showDepState">
          <el-radio-group v-model="formData.field110" size="medium">
            <el-radio
              v-for="(item, index) in field110Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item> -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：" prop="tips">
              <el-input
                v-model="formData.tips"
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
import {
  getDeptTree,
  deptUpdate,
  deptAdd,
  getDeptDetail
} from '@/api/system/dept'
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
        fullname: '', // 全称
        id: '', // 本id
        num: 0,
        pid: '', // 上级部门：
        simplename: '', // 简称
        tips: '' // 备注
      },
      rules: {
        pid: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'change'
          }
        ],
        fullname: [
          {
            required: true,
            message: '请输入部门全称',
            trigger: 'blur'
          }
        ],
        simplename: [
          {
            required: true,
            message: '请输入部门简称',
            trigger: 'blur'
          }
        ],
        num: [],
        tips: []
      }
    }
  },
  methods: {
    async showDialog(name, row) {
      this.callName = name
      // this.formData.id = row.id
      if (name === 'edit') {
        this.dialogVisible = true
        // 获取详情
        await getDeptDetail(row.id)
          .then(result => {
            console.log('🚀🚀', result.data)
            const { data, retMsg, retCode } = result.data
            if (retCode === '000000') {
              this.formData = data
              // 获取全部列表
              this.getDeptTree()
            } else {
              this.$message.error(retMsg)
            }
          })
          .catch(() => {
            console.log('🛸🛸🛸🛸🛸🛸🛸')
          })
      } else if (name === 'add') {
        this.dialogVisible = true
        this.getDeptTree()
      } else {
        this.$message.error('Error ')
      }
    },
    setName(datas, id) {
      console.log(id)
      // 遍历树  获取id数组
      for (var i in datas) {
        if (datas[i].id === id) {
          return (datas[i].disabled = true)
        }
        // this.expandedKeys.push(datas[i].id) // 遍历项目满足条件后的操作
        if (datas[i].children) {
          // 存在子节点就递归
          this.setName(datas[i].children)
          // console.log(datas[i].children)
        }
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
      // this.$emit('fetch')
      // this.dialogVisible = false
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.sureLoading = true
          if (this.callName === 'edit') {
            await deptUpdate(this.formData)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode !== '000000') {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    this.sureLoading = false
                  }, 500)
                  return false
                } else {
                  this.sureLoading = false
                  this.$message.success('修改成功')
                  this.dialogVisible = false
                  this.$emit('fetch', this.formData)
                }
              })
              .catch(() => {
                this.sureLoading = false
                console.log('deptUpdate')
              })
          } else {
            await deptAdd(this.formData)
              .then(result => {
                const { retCode, retMsg } = result.data
                if (retCode !== '000000') {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    this.sureLoading = false
                  }, 500)
                  return false
                } else {
                  this.sureLoading = false
                  this.$message.success('添加成功')
                  this.dialogVisible = false
                  this.$emit('fetch', this.formData)
                }
              })
              .catch(() => {
                this.sureLoading = false
                console.log('🛸🛸🛸🛸🛸🛸🛸')
              })
          }

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
    },
    async getDeptTree() {
      await getDeptTree()
        .then(result => {
          const { data, retMsg, retCode } = result.data
          if (retCode === '000000') {
            this.deptOptions = data
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

<style></style>
