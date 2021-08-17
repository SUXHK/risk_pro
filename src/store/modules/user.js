import { login, logout, getInfo } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import storage from '@/utils/storage.js'
// import _ from 'lodash'

const state = {
  token: getToken(),
  menuList: [],
  breadcrumb: [],
  name: ''
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
    //       name: '仪表盘',
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
    //   name: '首页',
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
    state.name = array.name
  },
  SET_BREADCRUMB: (state, obj) => {
    state.breadcrumb = obj
  }
}
const actions = {
  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      login(form)
        .then(response => {
          console.log(form)
          console.log('🚀 ~ login', response)
          const { data, retCode } = response.data
          if (retCode === '000000') {
            var millisecond = new Date().getTime()
            var expiresTime = new Date(millisecond + 60 * 1000 * 60)
            const conf = {
              expires: expiresTime
            }
            console.warn('Token过期时间：', expiresTime)
            commit('SET_TOKEN', data)
            setToken(data, conf)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(result => {
          console.log('🚀 ~ getInfo', result.data.data)
          const { data, retCode } = result.data
          if (retCode === '000000') {
            commit('SET_BREADCRUMB', data)
            commit('SET_MENULIST', data)
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
  }
}
// console.log(login)
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
