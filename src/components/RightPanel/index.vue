<template>
  <el-drawer
    title="个性化设置"
    :visible.sync="$store.getters.show"
    direction="rtl"
    :before-close="handleClose"
    size="20%"
  >
    <!-- <div> -->
    <div class="setting-drawer-content">
      <div class="setting-drawer-title">
        页面设置
      </div>
      <div class="setting-drawer-block-checbox">
        浅色
        <div
          class="setting-drawer-block-checbox-item"
          @click="handleTheme('light')"
        >
          <img
            src="@/assets/light.svg"
            style="box-shadow: rgb(0 0 0 / 10%) 0px 0px 3px 0px;"
            alt="light"
          />
          <div
            v-if="themeStyle === 'light'"
            class="setting-drawer-block-checbox-selectIcon"
            style="display: block;"
          >
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg
                viewBox="64 64 896 896"
                data-icon="check"
                width="1em"
                height="1em"
                :fill="defaultTheme"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <path
                  d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                />
              </svg>
            </i>
          </div>
        </div>
        深色
        <div
          class="setting-drawer-block-checbox-item"
          @click="handleTheme('dark')"
        >
          <img src="@/assets/dark.svg" alt="dark" />
          <div
            v-if="themeStyle === 'dark'"
            class="setting-drawer-block-checbox-selectIcon"
            style="display: block;"
          >
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg
                viewBox="64 64 896 896"
                data-icon="check"
                width="1em"
                height="1em"
                :fill="defaultTheme"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <path
                  d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                />
              </svg>
            </i>
          </div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="cl-theme__container">
      <div class="cl-theme__color is-card">
        <p>主题颜色</p>
        <ul>
          <el-tooltip
            v-for="(item, name) in themeList"
            :key="name"
            :content="item.label"
            placement="top"
          >
            <li
              :style="{
                backgroundColor: item.color
              }"
              @click="setTheme(item)"
            >
              <i
                v-show="item.color == theme"
                class="el-icon-check"
                style="font-size:25px"
              ></i>
            </li>
          </el-tooltip>
          <el-color-picker
            v-model="theme"
            :predefine="[
              '#409EFF',
              '#1890ff',
              '#304156',
              '#212121',
              '#11a983',
              '#13c2c2',
              '#6959CD',
              '#f5222d'
            ]"
            class="theme-picker"
            popper-class="theme-picker-dropdown"
          />
        </ul>
      </div>
    </div>
    <el-divider />
    <!-- <div class="cl-theme__container">
        <div class="cl-theme__color is-card">
          <p>自定义主题颜色</p>
        </div>
        <el-color-picker
          v-model="theme"
          :predefine="[
            '#409EFF',
            '#1890ff',
            '#304156',
            '#212121',
            '#11a983',
            '#13c2c2',
            '#6959CD',
            '#f5222d'
          ]"
          class="theme-picker"
          popper-class="theme-picker-dropdown"
        />
      </div> -->
    <!-- </div> -->
  </el-drawer>
</template>

<script>
import Cookies from 'js-cookie'
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      theme: '',
      themeList: [
        {
          label: '钴蓝',
          name: 'blue',
          color: '#1890ff'
        },
        {
          label: '极黑',
          name: 'black',
          color: '#2f3447'
        },
        {
          label: '果绿',
          name: 'green',
          color: '#51C21A'
        },
        {
          label: '酱紫',
          name: 'purple',
          color: '#d0378d'
        }
      ]
    }
  },

  computed: {
    themeStyle() {
      return this.$store.state.settings.themeStyle
    },
    defaultTheme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    setTheme({ label, color }) {
      this.theme = color
      this.$message.success(`切换主题：${label}`)
    },
    handleClose() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'show',
        value: false
      })
    },
    handleTheme(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'themeStyle',
        value: val
      })
      const t = {
        name: this.$store.getters.name,
        style: val
      }
      Cookies.set('Theme', JSON.stringify(t))
    },

    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  },
  watch: {
    defaultTheme: {
      handler: function(val, oldVal) {
        this.theme = val
      },
      immediate: true
    },
    async theme(val) {
      // const msg = this.$message({
      //   message: `主题切换中`,
      //   type: 'success',
      //   customClass: 'theme-message',
      //   iconClass: 'el-icon-loading',
      //   duration: 0
      // })
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      // console.log(themeCluster, originalCluster)

      // const $message = this.$message({
      //   message: '  Compiling the theme',
      //   customClass: 'theme-message',
      //   type: 'success',
      //   duration: 0,
      //   iconClass: 'el-icon-loading'
      // })

      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace('#', '')
          )
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          )

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        await this.getCSSString(url, 'chalk')
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      chalkHandler()

      const styles = [].slice
        .call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return (
            new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
          )
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        )
      })
      // this.$emit('change', val)
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })

      // console.log(val)
      // window.sessionStorage.setItem('theme', val)
      // this.$message.close()
      // setTimeout(() => {
      //   msg.close()
      //   this.$message.success('主题切换成功')
      // }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-drawer-content {
  .setting-drawer-title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    // margin-bottom: 12px;
    // color: rgba(0, 0, 0, 0.85);
    // font-size: 14px;
    // line-height: 22px;
    // font-weight: bold;
  }
  .setting-drawer-block-checbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .setting-drawer-block-checbox-item {
      position: relative;
      margin-right: 16px;
      border-radius: 2px;
      cursor: pointer;
      img {
        width: 48px;
        height: 48px;
      }
      .setting-drawer-block-checbox-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-left: 24px;
        color: #1890ff;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
}

.cl-theme__color {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      cursor: pointer;
      list-style: none;
      height: 25px;
      width: 25px;
      border-radius: 3px;
      margin-right: 10px;
      margin-top: 10px;
      text-align: center;
      color: #fff;
      line-height: 20px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.is-card {
  // padding: 20px 0;
  // margin: 0 20px 20px 20px;
  // border-bottom: 1px solid #f7f7f7;

  & > p {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.theme-picker {
  margin-top: 5px;
}
// .theme-message {
//   width: auto;
// }
</style>
