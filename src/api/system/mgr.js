import request from '@/plugins/axios'

// 查询用户列表
export function getUserMgrList(bTime, eTime, name, id) {
  return request({
    url: `/userMgr/list`,
    method: 'get',
    params: { beginTime: bTime, endTime: eTime, username: name, deptId: id }
  })
}

export function getUserMgrView(id) {
  return request({
    url: `/userMgr/view`,
    method: 'get',
    params: { userId: id }
  })
}
