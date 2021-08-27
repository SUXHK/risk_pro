<template>
  <div class="temp">
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

        <div class="icon hover-effect theme " @click="help">
          <svg-icon
            title="帮助"
            icon-class="question-fill"
            class="el-button--text"
          ></svg-icon>
        </div>

        <div class="icon hover-effect theme" @click="show">
          <svg-icon title="主题" icon-class="theme"></svg-icon>
        </div>
        <screenfull id="screenfull" class="icon hover-effect" />
      </template>

      <el-dropdown
        class="avatar-container hover-effect "
        trigger="click"
        placement="bottom"
      >
        <div class="avatar-wrapper">
          <img src="@/assets/images/sand.png" class="user-avatar" />
          <span class="username">{{ this.$store.getters.name }}</span>
          <!-- 个人中心 -->
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="headerAction">
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
    <Dialog
      ref="dialogheader"
      @fetch="fetch"
      :dialogParams="dialogParams"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from './dialog.vue'
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
export default {
  name: 'HeaderContainer',
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Dialog
  },
  data() {
    return {
      // dialogVisible: false,
      // headerTitle: 'Header'
      dialogParams: {
        headerTitle: '帮助中心 - 测试'
      }
    }
  },
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
    },
    fetch() {
      console.log(123)
    },
    help() {
      this.$refs.dialogheader.showDialog()
    }
  }
}
</script>

<style lang="scss">
.temp {
  width: 100%;
  height: 100%;
  .left-menu {
    float: left;
    .hamburger-container {
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      height: 50px;
      width: 55px;
      text-align: center;
      line-height: 50px;
      display: inline-block;
      font-size: 20px;
      vertical-align: top;
      cursor: pointer;
    }
    .hamburger-container:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .right-menu {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    float: right;
    transition: all 0.3s;
    .help {
      color: $base-color-default;
    }
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
    }

    .avatar-container {
      user-select: none;
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
        padding: 0 20px;
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
</style>
