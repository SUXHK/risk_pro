<template>
  <el-container class="home">
    <app-aside></app-aside>
    <el-container>
      <el-header class="el-header" height="50px">
        <header-container></header-container>
      </el-header>
      <app-main></app-main>
      <right-panel ref="themesss"></right-panel>
    </el-container>
  </el-container>
</template>

<script>
import { AppMain, AppAside, HeaderContainer } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import RightPanel from '@/components/RightPanel'
export default {
  name: 'Layout',
  components: {
    AppMain,
    AppAside,
    HeaderContainer,
    // Breadcrumb,
    // Hamburger,
    // Screenfull,
    RightPanel
  },
  data() {
    return {
      showFlags: false
    }
  },
  created() {},
  // async mounted() {
  //   const colorArr = ['#51C21A', '#d0378d', '#41b584', '#f34d37']
  //   const result = Math.floor(Math.random() * colorArr.length)
  //   const label = colorArr[result]
  //   const color = colorArr[result]
  //   await this.$refs.themesss.setTheme({ label, color })
  //   console.log(this.$refs.themesss)
  // },
  mixins: [ResizeMixin],
  // computed: {
  //   ...mapState({
  //     sidebar: state => state.app.sidebar,
  //     device: state => state.app.device,
  //     showSettings: state => state.settings.showSettings
  //   }),
  //   collaps() {
  //     return this.$store.getters.isCollapse
  //   }
  // },
  methods: {
    // show() {
    //   this.$store.dispatch('settings/changeSetting', {
    //     key: 'show',
    //     value: true
    //   })
    // },
    // toggleSideBar() {
    //   this.$store.dispatch('app/toggleSideBar')
    // },
    // logout() {
    //   this.$confirm('确定注销并退出系统吗？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$store
    //         .dispatch('user/LogOut')
    //         .then(res => {
    //           // location.reload()
    //           // this.$router.go(0)
    //           this.$router.push('/login')
    //           this.$message.success('退出成功')
    //         })
    //         .catch(() => {
    //           this.$message.error('退出失败')
    //         })
    //     })
    //     .catch(() => {
    //       // console.log('取消')
    //       this.$message('用户取消')
    //     })
    // }
  }
}
</script>

<style scoped lang="scss">
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .el-header {
    // position: fixed;
    z-index: 1;
    width: 100%;
    background-color: #fff;
    color: #333;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    box-shadow: 0px 2px 10px 0px rgba(117, 117, 117, 0.45) !important;
    // user-select: none;
    padding: 0;
  }
}
</style>
