<template>
  <el-aside
    class="el-aside"
    :width="isCollapse ? '54px' : '256px'"
    :style="{
      backgroundColor:
        $store.state.settings.themeStyle === 'dark'
          ? variables.menuBg
          : variables.menuLightBg
    }"
  >
    <logo :collapse="isCollapse" class="logo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="menu-list"
        :background-color="
          $store.state.settings.themeStyle === 'light'
            ? variables.menuLightBg
            : variables.menuBg
        "
        :text-color="
          $store.state.settings.themeStyle === 'light'
            ? 'rgba(0,0,0,.65)'
            : '#fff'
        "
        active-text-color="#fff"
        :unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <!-- 一级菜单 -->
        <!-- <div v-for="item in menuList" :key="item.id"> -->
        <template>
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <!-- <i class="iconObj" :class="iconObj[item.id]"></i> -->
              <i class="icon">
                <svg-icon
                  icon-class="stack-fill"
                  class="svg"
                  :style="{
                    color:
                      $store.state.settings.themeStyle === 'dark'
                        ? '#fff'
                        : '#595959'
                  }"
                ></svg-icon>
              </i>
              <span class="one-txt-cut" :title="item.name">{{
                item.name
              }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item.url + sunItem.url"
              v-for="sunItem in item.children"
              :key="sunItem.id"
            >
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <i class="icon">
                  <svg-icon
                    :style="{
                      color:
                        $store.state.settings.themeStyle === 'dark'
                          ? '#fff'
                          : '#595959'
                    }"
                    icon-class="folder-user-fill"
                    class="svg"
                  ></svg-icon>
                </i>
                <span class="one-txt-cut" :title="sunItem.name">{{
                  sunItem.name
                }}</span>
                <!-- <span>{{ item.code + sunItem.url }}</span> -->
              </template>
            </el-menu-item>
          </el-submenu>
        </template>
        <!-- <template v-else>
          <el-menu-item :index="'/' + item.path">
            <i class="icon">
              <svg-icon icon-class="shield-user-fill"></svg-icon>
            </i>
            <span slot="title">{{ item.authName }}</span>
          </el-menu-item>
        </template>
      </div> -->
      </el-menu>
    </el-scrollbar>
    <div
      class="sider-trigger"
      :style="{
        width: isCollapse ? '54px' : '256px',
        color:
          $store.state.settings.themeStyle === 'light'
            ? 'rgba(0,0,0,.65)'
            : '#fff'
      }"
    >
      123
    </div>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/layout/components/Logo/index.vue'
import variables from '@/styles/variables.scss'

export default {
  components: { Logo },
  name: 'Aside',
  data() {
    return {}
  },
  created() {
    // const loading = this.$loading({
    //   lock: true,
    //   text: '菜单加载中...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
    // this.$store
    //   .dispatch('user/kaptcha')
    //   .then(result => {
    //     console.log(result)
    //     const { meta } = result.data
    //     if (meta.status !== 200) {
    //       this.$alert(meta.msg + '， 是否重新登录？', '提示', {
    //         confirmButtonText: '确定',
    //         type: 'error',
    //         closeOnPressEscape: false,
    //         showClose: false
    //       })
    //         .then(() => {
    //           this.$router.push('/login')
    //           loading.close()
    //         })
    //         .catch(() => {
    //           this.$router.push('/login')
    //           loading.close()
    //         })
    //       return
    //     }
    //     loading.close()
    //   })
    //   .catch(() => {
    //     console.log('🛸🛸🛸🛸🛸🛸🛸')
    //   })

    const Loading = this.$baseLoading(6, '资源加载中...')
    this.$store
      .dispatch('user/getInfo')
      .then(result => {
        setTimeout(() => {
          Loading.close()
        }, 1000)
      })
      .catch(() => {
        this.$notify({
          title: '菜单资源加载错误',
          message: '请重试',
          type: 'error',
          duration: 0
        })
        // setTimeout(() => {
        //   Loading.close()
        // }, 3000)
      })
  },
  computed: {
    ...mapGetters(['menuList', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.el-aside {
  height: 100%;
  // background-color: $menuBg;
  transition: width 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
  z-index: 1001;
  overflow: hidden;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  .menu-list {
    border-right: none;
    user-select: none;
    // .authName {
    //   // vertical-align: middle;
    // }
  }
  .sider-trigger {
    user-select: none;
    position: fixed;
    bottom: 0;
    z-index: 1;
    height: 48px;
    // color: $menuText;
    line-height: 48px;
    text-align: center;
    // background: #002140;
    cursor: pointer;
    transition: width 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
}
.icon {
  margin-right: 12px;
  // color: $menuText;
  font-size: 16px;
  // vertical-align: middle;
  display: inline-block;
  // .svg {
  //   // vertical-align: -webkit-baseline-middle;
  //   // vertical-align: middle;
  // }
}
.el-menu--collapse {
  width: 54px;
}

// .el-menu-item.is-active,
// .el-menu-item:hover {
//   color: $menuText;
//   background-color: $hover !important;
// }
// /deep/.el-submenu__title i {
//   color: $menuText;
// }
</style>
