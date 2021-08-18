import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/config/settings'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  themeStyle
} = defaultSettings
// const theme = JSON.parse(localStorage.getItem('Theme')) || ''

const state = {
  show: false,
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  themeStyle: themeStyle,
  tableSettings: {
    borderChecked: false,
    stripeChecked: true,
    tableSize: 'medium', // medium small mini
    fixedChecked: false
    // normalFullFlag: true
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  TABLES_ETTINGS: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.tableSettings.hasOwnProperty(key)) {
      state.tableSettings[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeTableSettings({ commit }, data) {
    commit('TABLES_ETTINGS', data)
  },
  getThemeSetting({ commit }, data) {
    console.log(data)
    commit('CHANGE_SETTING', data)
  },
  getName({ commit, dispatch }, userName) {
    console.log(userName)

    const a = Cookies.get('Theme')
    if (a) {
      const { name, style } = JSON.parse(a)
      if (name === userName) {
        if (style !== 'dark') {
          // setTimeout(() => {
          Message.success('已恢复上次的设置的主题')
          dispatch('getThemeSetting', {
            key: 'themeStyle',
            value: style
          })
          // }, 3000)
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
