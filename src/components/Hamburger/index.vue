<template>
  <div @click="toggleClick">
    <svg-icon
      :title="isActive ? '收起' : '展开'"
      :class="{ 'is-active': isActive }"
      class="hamburger"
      icon-class="menu-2-line"
    ></svg-icon>
    <!-- <svg
      :class="{ 'is-active': isActive }"
      class="hamburger"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z"
        fill="currentColor"
      />
    </svg> -->
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  /* display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px; */
  /* vertical-align: middle; */
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  /* vertical-align: -webkit-baseline-middle; */
  vertical-align: -2px;
  /* 此属性为更改svg颜色属性设置 */
  fill: currentColor;
  overflow: hidden;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
