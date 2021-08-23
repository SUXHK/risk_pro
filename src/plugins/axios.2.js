'use strict'

import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth' // get token from cookie
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
      title: '请求超时，网络错误',
      message: 'Network error, request timeout',
      duration: 5000
    })
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  function(response) {
    // Do something with response data
    // const hasToken = getToken()
    const { retMsg, retCode } = response.data
    if (
      retCode === '999997' ||
      retCode === '000006' ||
      retCode === '000010' ||
      retCode === '000011'
    ) {
      store
        .dispatch('user/resetToken')
        .then(() => {
          console.log(123)
        })
        .catch(() => {
          console.log(456)
        })
      MessageBox.alert(retMsg, '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        closeOnPressEscape: false,
        showClose: false
      }).then(() => {
        location.reload()
      })
      // return
    } else {
      console.log('正常响应')
      return response
    }
    // if (hasToken) {
    //   return response
    // }
    // console.log(1423)
  },
  function(error) {
    Notification.error({
      title: '响应超时，网络错误',
      message: 'Network error, response timeout',
      duration: 5000
    })
    // Do something with response error
    return Promise.reject(error)
  }
)
// Vue.prototype.$axios = service
export default service
