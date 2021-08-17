<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
    :style="{
      backgroundColor:
        $store.state.settings.themeStyle === 'dark'
          ? variables.menuBg
          : variables.menuLightBg
    }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@/assets/images/sand.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/sand.png" class="sidebar-logo" />
        <h1
          class="sidebar-title"
          :style="{
            color:
              $store.state.settings.themeStyle === 'dark'
                ? variables.sidebarTitle
                : variables.sidebarLightTitle
          }"
        >
          风控管理系统
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #001529;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: block;
    & .sidebar-logo {
      width: 54px;
      // height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      border-radius: 3px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 75px;
      font-size: 20px;
      letter-spacing: 3px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
      border-radius: 3px;
    }
  }
}
</style>
