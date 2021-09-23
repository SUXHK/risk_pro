import request from '@/plugins/axios'

// 删除业务表
export function defDelete(id) {
  return request({
    url: `/tableDefMgr/delete`,
    method: 'get',
    params: { tableDefId: id }
  })
}
// 新增表
export function defInsert(data) {
  return request({
    url: `/tableDefMgr/insert`,
    method: 'post',
    data
  })
}
// 查询业务表
export function defList(alia, name) {
  return request({
    url: `/tableDefMgr/list`,
    method: 'get',
    params: { alias: alia, tableName: name }
  })
}

// 同步表信息
export function syncTable() {
  return request({
    url: `/tableDefMgr/syncTableInfo`,
    method: 'get'
  })
}
// 修改表
export function defUpdate(data) {
  return request({
    url: `/tableDefMgr/update`,
    method: 'post',
    data
  })
}
// 业务表详情
export function defView(id) {
  return request({
    url: `/tableDefMgr/view`,
    method: 'get',
    params: { tableDefId: id }
  })
}
