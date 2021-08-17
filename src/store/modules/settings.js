import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/config/settings'

const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  themeStyle
} = defaultSettings
const theme = JSON.parse(localStorage.getItem('Theme')) || ''
const state = {
  show: false,
  theme: variables.theme || theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  themeStyle: themeStyle,
  tableSettings: {
    borderChecked: false,
    stripeChecked: true,
    tableSize: 'medium', // medium small mini
    fixedChecked: true
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
