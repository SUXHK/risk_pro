'use strict'

import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import store from '@/store' // get token from cookie
// import Vue from 'vue'

const service = axios.create({
  baseURL: '/rs-mgr', // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL:
  // process.env.NODE_ENV === 'production'
  //   ? process.env.VUE_APP_BASE_API
  //   : '/api',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
console.log(process.env.NODE_ENV)
service.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  function(error) {
    Notification.error({
      title: '网络错误，请求超时',
      message: 'Network error, request timeout',
      duration: 0
    })
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response)
    const { retMsg, retCode } = response.data
    const invalidWhitelist = ['999997', '000006', '000010', '000011']

    if (invalidWhitelist.indexOf(retCode) !== -1) {
      // console.log('拦截了')
      store.dispatch('user/resetToken')
      MessageBox.alert(retMsg, '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        closeOnPressEscape: false,
        showClose: false
      }).then(() => {
        window.location.reload()
        //  window.location.reload()
        // return router.push({ path: '/' }).catch(() => {})
        // console.log(Vue.route)
      })
    }
    // console.log('响应了')
    return response
  },
  function(error) {
    Notification.error({
      title: '网络错误，响应超时',
      message: 'Network error, response timeout',
      duration: 0
    })
    // Do something with response error
    return Promise.reject(error)
  }
)
// Vue.prototype.$axios = service
export default service
