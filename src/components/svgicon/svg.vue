<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <title>{{ title }}</title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  /* vertical-align: -webkit-baseline-middle; */
  /* vertical-align: -3px; */
  /* 此属性为更改svg颜色属性设置 */
  fill: currentColor;
  overflow: hidden;
}
</style>
