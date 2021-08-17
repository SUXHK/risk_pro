<template>
  <el-scrollbar wrap-class="scrollbar-main" class="main">
    <el-main class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" v-if="isRouterAlive" />
      </transition>
      <el-backtop target=".app-main"></el-backtop>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppMain',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    key() {
      return this.$route.path
    }
  },
  methods: {
    reload: function() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main::-webkit-scrollbar {
  width: 13px;
}
.el-main::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 7px;
  min-height: 84px;
  background-color: rgba(0, 0, 0, 0.4);
}
.el-main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.el-main::-webkit-scrollbar-track {
  background-color: rgba(248, 250, 252, 0);
}
.el-main::-webkit-scrollbar-track:hover {
  background-color: #f8fafc;
}
.app-main {
  width: 100%;
  overflow-x: hidden;
  color: #333;
  padding: 10px 10px;
}
// .router-view {
//   overflow-x: hidde;
//   height: 100%;
// }

// .el-backtop {
//   width: 50px;
//   height: 50px;
//   font-size: 30px;
//   z-index: 999;
//   box-shadow: 0px 0px 20px 0px rgba(117, 117, 117, 0.45);
//   transition: all 0.5s;
// }
</style>
