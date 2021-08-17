<template>
  <el-container class="home">
    <app-aside></app-aside>
    <el-container>
      <el-header class="el-header" height="50px">
        <div class="left-menu">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          />
          <template v-if="this.$store.getters.device === 'desktop'">
            <breadcrumb class="breadcrumb-container" />
          </template>
        </div>
        <div class="right-menu">
          <!-- 12 -->

          <template v-if="this.$store.getters.device === 'desktop'">
            <!-- style="font-size:13px" -->

            <div class="icon hover-effect theme">
              <svg-icon
                title="帮助"
                icon-class="question-fill"
                style="color: #6873fb;"
              ></svg-icon>
            </div>

            <div class="icon hover-effect theme" @click="show">
              <svg-icon title="主题" icon-class="theme"></svg-icon>
            </div>
            <screenfull id="screenfull" class="icon hover-effect" />
          </template>

          <el-dropdown class="avatar-container hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img src="@/assets/images/sand.png" class="user-avatar" />
              <span class="username">{{ this.$store.getters.name }}</span>
              <!-- 个人中心 -->
              <i class="el-icon-caret-bottom" />
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push('/')"
                ><svg-icon
                  icon-class="home-smile-fill"
                  style="font-size:16px;vertical-align: middle;"
                ></svg-icon>
                <span style="vertical-align: middle;padding-left:5px">
                  首页</span
                ></el-dropdown-item
              >
              <el-dropdown-item divided @click.native="logout">
                <svg-icon
                  icon-class="logout-circle-fill"
                  style="font-size:16px;vertical-align: middle;"
                ></svg-icon>
                <span style="vertical-align: middle;padding-left:5px">
                  退出登录</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- <tags-view /> -->
      <app-main></app-main>
      <right-panel ref="themesss"></right-panel>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
// TagsView
import { AppMain, AppAside } from './components'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import ResizeMixin from './mixin/ResizeHandler'
import RightPanel from '@/components/RightPanel'
export default {
  name: 'Layout',
  components: {
    AppMain,
    AppAside,
    Breadcrumb,
    Hamburger,
    Screenfull,
    RightPanel
    // ThemePicker
    // TagsView
  },
  data() {
    return {
      showFlags: false
    }
  },
  created() {
    // const loading = this.$loading({
    //   lock: true,
    //   text: '菜单加载中...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)',
    //   customClass: 'menu-loading'
    // })
    // this.$store.dispatch('permission/generateRoutes')
  },
  // async mounted() {
  //   const colorArr = ['#51C21A', '#d0378d', '#41b584', '#f34d37']
  //   const result = Math.floor(Math.random() * colorArr.length)
  //   const label = colorArr[result]
  //   const color = colorArr[result]
  //   await this.$refs.themesss.setTheme({ label, color })
  //   console.log(this.$refs.themesss)
  // },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings
    }),
    collaps() {
      return this.$store.getters.isCollapse
    }
  },
  methods: {
    show() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'show',
        value: true
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('user/LogOut')
            .then(res => {
              // location.reload()
              // this.$router.go(0)
              this.$router.push('/login')
              this.$message.success('退出成功')
            })
            .catch(() => {
              this.$message.error('退出失败')
            })
        })
        .catch(() => {
          // console.log('取消')
          this.$message('用户取消')
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.home {
  // height: 100%;
  // overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .el-header {
    // position: fixed;
    z-index: 1;
    width: 100%;
    // background-color: rgba(255, 255, 255, 0.72);
    background-color: #fff;
    color: #333;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    // box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(117, 117, 117, 0.45);
    // backdrop-filter: blur(1px);
    // backdrop-filter: saturate(180%) blur(20px);
    user-select: none;
    padding: 0;
    .left-menu {
      float: left;
      .hamburger-container {
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        height: 50px;
        width: 50px;
        text-align: center;
        line-height: 50px;
        display: inline-block;
        font-size: 20px;
        vertical-align: top;
        cursor: pointer;
      }
      .hamburger-container:hover {
        // color: $hover;
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .right-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      line-height: 50px;
      float: right;
      transition: all 0.3s;
      .icon {
        display: inline-block;
        padding: 0 10px;
        // width: 50px;
        line-height: 50px;
        height: 100%;
        font-size: 16px;
        color: #5a5e66;
        vertical-align: text-bottom;
      }
      .hover-effect:hover {
        // color: $hover;
        background: rgba(0, 0, 0, 0.025);
        cursor: pointer;
        opacity: 0.8;
      }

      .avatar-container {
        // margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        height: 100%;
        transition: all 0.3s;
        .avatar-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px;
          transition: all 0.3s;
          .user-avatar {
            width: 30px;
            margin-right: 8px;
          }
          .username {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            margin-right: 8px;
          }
          .el-icon-caret-bottom {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
