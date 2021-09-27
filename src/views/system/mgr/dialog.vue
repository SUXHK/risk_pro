<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="35%"
    @close="close('elForm')"
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
        label-width="100px"
        label-position="top"
      >
        <!-- <h3 style="padding:20px 0">账号信息</h3> -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门：" prop="deptid">
              <el-cascader
                v-model="formData.deptid"
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
                </template>
                <!-- <svg-icon
                  slot="prefix"
                  icon-class="folder_black_24dp"
                  style="font-size:16px;margin:0 4px;vertical-align:text-bottom"
                ></svg-icon> -->
              </el-cascader>
            </el-form-item></el-col
          >
          <el-col :span="12">
            <el-form-item label="账户名：" prop="account">
              <el-input
                :style="{ width: '100%' }"
                v-model="formData.account"
                placeholder="请输入账户名"
                :maxlength="18"
                clearable
                ><svg-icon
                  slot="prefix"
                  icon-class="account_circle_black_24dp"
                  style="font-size:16px;margin:0 4px;vertical-align:text-bottom"
                ></svg-icon
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号：" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入手机号手机号"
                :maxlength="11"
                show-word-limit
                clearable
                prefix-icon="el-icon-mobile"
                :style="{ width: '100%' }"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="名字：" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入名字"
                :maxlength="18"
                :style="{ width: '100%' }"
                clearable
                ><svg-icon
                  slot="prefix"
                  icon-class="person_black_24dp"
                  style="font-size:16px;margin:0 4px;vertical-align:text-bottom"
                ></svg-icon
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-form-item label="出生日期：" prop="birthday">
              <el-date-picker
                v-model="formData.birthday"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="{ width: '100%' }"
                placeholder="请选择出生日"
                clearable
              ></el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="email">
              <el-input
                v-model="formData.email"
                placeholder="请输入邮箱"
                clearable
                :style="{ width: '100%' }"
                ><svg-icon
                  slot="prefix"
                  icon-class="email_black_24dp"
                  style="font-size:16px;margin:0 4px;vertical-align:text-bottom"
                ></svg-icon
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="12"
            ><el-form-item
              :label="callName === 'add' ? '设置初始密码：' : '设置新密码：'"
              prop="password"
            >
              <el-input
                v-model="formData.password"
                :placeholder="
                  callName === 'add' ? '请设置初始密码' : '请设置新密码'
                "
                :maxlength="6"
                clearable
                prefix-icon="el-icon-lock"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="12" v-if="callName === 'add'"
            ><el-form-item label="设置初始密码：" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请设置初始密码"
                :maxlength="6"
                clearable
                prefix-icon="el-icon-lock"
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="formData.sex" size="medium">
                <el-radio
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item></el-col
          >
          <el-col :span="12">
            <el-form-item label="状态：" prop="status">
              <el-radio-group v-model="formData.status" size="medium">
                <el-radio
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item></el-col
          >
        </el-row>
        <!-- <h3 style="padding:20px 0">组织关系</h3> -->
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
import { getUserMgrView, userMgrEdit, userMgrAdd } from '@/api/system/mgr'
import { getDeptTree } from '@/api/system/dept'
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
        account: '', // 账户名
        birthday: '', // 出生日期：
        email: '', // 邮件
        deptid: '', // 上级部门
        id: '', // id
        name: '', // 名字
        password: '', // 密码
        phone: '', // 手机
        sex: 1, // 性别
        status: 1 // 状态
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入账户名',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请选择出生日',
            trigger: 'blur'
          }
        ],
        deptid: [
          {
            required: true,
            message: '请选上级部门',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式有误',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入账户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入初始密码',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号手机号',
            trigger: 'blur'
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '性别不能为空',
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '性别不能为空',
            trigger: 'change'
          }
        ]
      },
      // 部门列表
      deptList: [],
      deptOptions: [], //
      deptProps: {
        multiple: false,
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true,
        emitPath: false,
        expandTrigger: 'hover'
      },
      // 调用名字
      callName: '',
      // 性别
      sexOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      // 状态
      statusOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '不启用',
          value: 2
        }
      ]
    }
  },
  methods: {
    showDialog(name, row) {
      this.callName = name
      if (name === 'add') {
        this.isEditPassword = false
        this.getgetList()
        this.dialogVisible = true
      } else if (name === 'edit') {
        this.isEditPassword = false
        this.getgetList(row.deptName)
        this.getUserView(row.id)
        // console.log(row)
        this.dialogVisible = true
        // this.$set(this.formData, 'field110', 1)
      } else {
        this.$message.error('调用失败...')
        this.dialogVisible = false
        this.isEditPassword = false
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
            delete this.formData.password
            await userMgrEdit(this.formData)
              .then(result => {
                console.log('🚀', result.data)

                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('修改成功')
                  this.dialogVisible = false
                  this.sureLoading = false
                  this.$emit('fetch')
                } else {
                  setTimeout(() => {
                    this.sureLoading = false
                  }, 500)
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {
                console.log('🛸🛸🛸🛸🛸🛸🛸')
                this.sureLoading = false
              })
          } else {
            await userMgrAdd(this.formData)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('添加成功')
                  this.dialogVisible = false
                  this.$emit('fetch')
                  this.sureLoading = false
                } else {
                  setTimeout(() => {
                    this.sureLoading = false
                  }, 500)
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {
                console.log('🛸🛸🛸🛸🛸🛸🛸')
                this.sureLoading = false
              })
          }

          // this.dialogVisible = false
          // this.$emit('fetch', this.formData)
          // console.log(Object.keys(this.formData).length)
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
    // 查看用户详情
    async getUserView(id) {
      await getUserMgrView(id)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.formData = data
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 获取所以部门列表
    async getgetList(name) {
      await getDeptTree()
        .then(result => {
          console.log(result)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            console.log('🚀🚀🚀🚀🚀', data[0])
            this.deptOptions = data
            // if (name) {
            //   this.formData.deptid = data[0].pid
            //   console.log(this.deptList)
            //   console.log(this.formData.deptid)
            // }
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
