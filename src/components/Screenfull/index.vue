<template>
  <span @click="click">
    <svg-icon
      :title="isFullscreen ? '退出全屏' : '全屏'"
      :icon-class="isFullscreen ? 'exit' : 'ent'"
    ></svg-icon>
  </span>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'VabFullScreenBar',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message.err('开启全屏失败')
        return false
      }
      screenfull.toggle()
      this.$emit('refresh')
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>
