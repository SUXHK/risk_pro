<template>
  <el-dialog
    :title="dialogParams.headerTitle"
    :visible.sync="dialogVisible"
    width="30%"
    @close="close"
    :append-to-body="true"
  >
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
      dialogVisible: false
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    close() {
      // 重置vue组件的data数据
      // this.form = this.$options.data().form
      this.dialogVisible = false
    },
    sure() {
      this.$emit('fetch')
      this.dialogVisible = false
    }
  }
}
</script>

<style></style>
