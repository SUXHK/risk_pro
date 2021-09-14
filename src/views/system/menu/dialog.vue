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
        size="small"
        label-width="100px"
      >
        <el-form-item label="菜单编号：" prop=""> </el-form-item>
        <el-form-item label="菜单名称：" prop=""> </el-form-item>
        <el-form-item label="是否是菜单：" prop=""> </el-form-item>
        <el-form-item label="是否打开：" prop=""> </el-form-item>
        <el-form-item label="菜单图标：" prop=""> </el-form-item>
        <el-form-item label="菜单排序号：" prop=""> </el-form-item>
        <el-form-item label="菜单状态：" prop=""> </el-form-item>
        <el-form-item label="url地址：" prop=""> </el-form-item>
        <el-form-item label="备注：" prop=""> </el-form-item>
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
import { getDeptList, deptUpdate, deptAdd } from '@/api/system/dept'
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
        // field101: '', // 上级部门
        // field102: '123', // 部门名称
        // field103: 2, // 负责人
        // field106: '17630961996', // 手机号
        // field107: 1, // 分类
        // field108: 1, // 显示排序
        // field109: '123', // 备注
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
    showDialog(name, row) {
      this.callName = name
      if (name === 'edit') {
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
    // 获取所以部门列表
    async getList(name) {
      console.log(name)
      await getDeptList(name)
        .then(async result => {
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            console.log('🚀🚀', data[0])
            this.deptList = data
            if (this.callName === 'edit') {
              // 编辑部门
              this.formData.fullname = this.deptList[0].fullname
              this.formData.num = this.deptList[0].num
              this.formData.pid = this.deptList[0].pid
              this.formData.simplename = this.deptList[0].simplename
              this.formData.tips = this.deptList[0].tips
              this.dialogVisible = true
            } else if (this.callName === 'newSubDep') {
              // 新建下级部门
              // this.formData.pid = this.deptList[0].pid
              // console.log(this.deptList[0])
              await this.getgetList(this.deptList[0].simplename)
              this.dialogVisible = true
            } else if (this.callName === 'newLevelDep') {
              // 新建平级部门
              // console.log(this.deptList[0])
              // await this.getDeptList(this.deptList[0].simplename)
              // await this.getgetList(this.deptList[0].pName)
              this.formData.pid = this.deptList[0].pid
              this.dialogVisible = true
            } else {
              this.$message.error('调用失败...')
              this.dialogVisible = false
            }
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('getDeptList')
        })
    },
    // 获取所以部门列表
    async getgetList(name) {
      await getDeptList(name)
        .then(async result => {
          console.log(result)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            console.log('🚀🚀🚀🚀🚀', data[0])
            this.deptList = data
            this.formData.pid = this.deptList[0].id
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('新建下级getgetList')
        })
    }
  }
}
</script>

<style></style>
