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
          <el-cascader
            v-model="formData.field101"
            :options="field101Options"
            :props="field101Props"
            :style="{ width: '100%' }"
            placeholder="请级联选择选择选择员工"
            separator=" - "
            filterable
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="管理角色：" prop="field102">
          <el-checkbox-group v-model="formData.field102" size="mini">
            <el-checkbox
              v-for="(item, index) in field102Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="部门一角色：" prop="field104">
          <el-checkbox-group v-model="formData.field104" size="medium">
            <el-checkbox
              v-for="(item, index) in field104Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="部门二角色：" prop="field105">
          <el-checkbox-group v-model="formData.field105" size="medium">
            <el-checkbox
              v-for="(item, index) in field105Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="部门三角色：" prop="field107">
          <el-checkbox-group v-model="formData.field107" size="medium">
            <el-checkbox
              v-for="(item, index) in field107Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分类角色：" prop="field106">
          <el-checkbox-group v-model="formData.field106" size="medium">
            <el-checkbox
              v-for="(item, index) in field106Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="未分类角色：" prop="field108">
          <el-checkbox-group v-model="formData.field108" size="medium">
            <el-checkbox
              v-for="(item, index) in field108Options"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
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
        field101: [],
        field102: [],
        field104: [],
        field105: [],
        field107: [],
        field106: [],
        field108: []
      },
      rules: {
        field101: [
          {
            required: true,
            type: 'array',
            message: '请至少选择一个选择员工：',
            trigger: 'change'
          }
        ],
        field102: [],
        field104: [],
        field105: [],
        field107: [],
        field106: [],
        field108: []
      },
      // 部门列表
      deptList: [],
      // 调用名字
      callName: '',
      field101Options: [
        {
          id: 1,
          value: 1,
          label: '选项1',
          children: [
            {
              id: 2,
              value: 2,
              label: '选项1-1'
            }
          ]
        }
      ],
      field102Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        },
        {
          label: '选项三',
          value: 3
        }
      ],
      field104Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        },
        {
          label: '选项三',
          value: 3
        },
        {
          label: '选项四',
          value: 4
        }
      ],
      field105Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        },
        {
          label: '选项三',
          value: 3
        },
        {
          label: '选项四',
          value: 4
        },
        {
          label: '选项六',
          value: 6
        },
        {
          label: '选项七',
          value: 7
        },
        {
          label: '选项八',
          value: 8
        },
        {
          label: '选项九',
          value: 9
        },
        {
          label: '选项十',
          value: 10
        },
        {
          label: '选项十一',
          value: 11
        },
        {
          label: '选项十二',
          value: 12
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
      field106Options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        },
        {
          label: '选项三',
          value: 3
        }
      ],
      field108Options: [
        {
          label: '选项一',
          value: 1
        }
      ],
      field101Props: {
        multiple: true,
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
      if (name === 'add') {
        this.dialogVisible = true
      } else if (name === 'edit') {
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
      // this.formData = this.$options.data().formData
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
