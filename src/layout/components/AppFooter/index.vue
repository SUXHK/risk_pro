<template>
  <el-footer class="el-footer" height="170">
    <strong
      >Copyright © Sand Risk Control Management System {{ fullYear }}</strong
    >
  </el-footer>
</template>

<script>
export default {
  name: 'appfooter',
  data() {
    return {
      fullYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
.el-footer {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55px;
  color: rgba(0, 0, 0, 0.45);
  background: #fff;
  border-top: 1px dashed #dcdfe6;
}
/* .el-card__body {
  padding: 20px 20px 0 20px;
} */
</style>
