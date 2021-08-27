import { login, logout, getInfo } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'

// import storage from '@/utils/storage.js'
// import _ from 'lodash'

const state = {
  token: getToken(),
  menuList: [],
  breadcrumb: [],
  name: '',
  rememberMe: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENULIST: (state, array) => {
    // 临时效果
    // const dashboard = {
    //   children: [
    //     {
    //       children: '',
    //       code: 'dashboard',
    //       icon: 'dashboard-2-fill',
    //       id: 101,
    //       ismenu: 1,
    //       levels: 2,
    //       name: '组织架构管理',
    //       num: 1,
    //       parentId: 104,
    //       url: '/dashboard'
    //     },
    //     {
    //       children: '',
    //       code: 'dashboard',
    //       icon: 'dashboard-2-fill',
    //       id: 101,
    //       ismenu: 1,
    //       levels: 2,
    //       name: '组织架构管理',
    //       num: 1,
    //       parentId: 104,
    //       url: '/dashboard'
    //     }
    //   ],
    //   code: 'index',
    //   icon: 'home-smile-fill',
    //   id: 104,
    //   ismenu: 1,
    //   levels: 1,
    //   name: '系统设置',
    //   num: 3,
    //   parentId: 0,
    //   url: 'index'
    // }
    // array.menus.unshift(dashboard)
    // array.menus[1].icon = 'stack-fill'
    // array.menus[1].children.forEach(element => {
    //   element.icon = 'notification-badge-fill'
    // })
    // 删除即可
    // array.menus.sort(a => {
    //   console.log(a.id)
    // })
    state.menuList = array.menus
    // state.menuList[0].children.forEach(e => {
    //   console.log(e.url, e.name)
    // })
    state.name = array.name
  },
  SET_BREADCRUMB: (state, obj) => {
    state.breadcrumb = obj
  },
  SET_REMEMBERME: (state, boolean) => {
    state.rememberMe = boolean
  }
}
const actions = {
  login({ commit, state }, form) {
    return new Promise((resolve, reject) => {
      login(form)
        .then(response => {
          // console.log(form)
          // console.log('🚀 ~ login', response)
          const { data, retCode } = response.data
          if (retCode === '000000') {
            console.warn(
              '是否下次登录：',
              state.rememberMe ? '自动登录' : '不自动登录，token_1小时后失效'
            )
            if (state.rememberMe) {
              setToken(data)
            } else {
              var millisecond = new Date().getTime()
              var expiresTime = new Date(millisecond + 60 * 1000 * 60)
              const conf = {
                expires: expiresTime
              }
              console.warn('Token过期时间：', expiresTime)
              setToken(data, conf)
            }
            commit('SET_TOKEN', data)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(result => {
          // console.log('🚀 ~ getInfo', result.data.data)
          const { data, retCode } = result.data
          if (retCode === '000000') {
            commit('SET_BREADCRUMB', data)
            commit('SET_MENULIST', data)
            dispatch('settings/getName', data.name, { root: true })
          }
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  LogOut({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(result => {
          // console.log('🚀', result.data)
          // const { retCode } = result.data
          commit('SET_TOKEN', '')
          removeToken()
          resolve(result)
        })
        .catch(err => {
          resolve(err)
        })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  rememberMe({ commit }, boolean) {
    commit('SET_REMEMBERME', boolean)
  }
}
// console.log(login)
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
