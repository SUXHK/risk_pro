import request from '@/plugins/axios'

// 查询用户列表
export function getUserMgrList(bTime, eTime, name, id) {
  return request({
    url: `/userMgr/list`,
    method: 'get',
    params: { beginTime: bTime, endTime: eTime, username: name, deptId: id }
  })
}

// 用户详细信息
export function getUserMgrView(id) {
  return request({
    url: `/userMgr/view`,
    method: 'get',
    params: { userId: id }
  })
}

// 改密码
export function changePwd(np, op) {
  return request({
    url: `/userMgr/changePwd`,
    method: 'get',
    params: { newPwd: np, oldPwd: op }
  })
}

// 改密码
// export function userMgrEdit(data) {
//   return request({
//     url: `/userMgr/edit`,
//     method: 'psot',
//     data
//   })
// }
// 修改用户资料
export function userMgrEdit(data) {
  return request({
    url: `/userMgr/edit`,
    method: 'post',
    data
  })
}
// 添加用户
export function userMgrAdd(data) {
  return request({
    url: `/userMgr/add`,
    method: 'post',
    data
  })
}
// 重置密码
export function resetPassword(id) {
  return request({
    url: `/userMgr/view`,
    method: 'get',
    params: { userId: id }
  })
}
// 删除用户
export function deleteUser(id) {
  return request({
    url: `/userMgr/delete`,
    method: 'get',
    params: { userId: id }
  })
}
// 冻结
export function freezeUser(id) {
  return request({
    url: `/userMgr/freeze`,
    method: 'get',
    params: { userId: id }
  })
}

// 解冻
export function unfreezeUser(id) {
  return request({
    url: `/userMgr/unfreeze`,
    method: 'get',
    params: { userId: id }
  })
}
