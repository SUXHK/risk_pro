import request from '@/plugins/axios'

// 用户登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// !获取验证码
export function kaptcha() {
  return request({
    url: `/kaptcha?99`,
    method: 'get'
  })
}
