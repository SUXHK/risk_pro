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
export function defList({ limit, offset, alias, tableName }) {
  return request({
    url: `/tableDefMgr/list`,
    method: 'get',
    params: { limit, offset, alias, tableName }
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

// --------------------------------------

// 删除业务表字段
export function columnDefMgrDelete(id) {
  return request({
    url: `/columnDefMgr/delete`,
    method: 'get',
    params: { columnDefId: id }
  })
}
// 新增业务表字段
export function columnDefMgrInsert(data) {
  return request({
    url: `/columnDefMgr/insert`,
    method: 'post',
    data
  })
}
// 查询业务表字段（分页）
export function columnDefMgrList({ offset, limit, columnName, tableId }) {
  return request({
    url: `/columnDefMgr/list`,
    method: 'get',
    params: { offset, limit, columnName, tableId }
  })
}

// 修改业务表字段
export function columnDefMgrUpdate(data) {
  return request({
    url: `/columnDefMgr/update`,
    method: 'post',
    data
  })
}
// 业务表字段详情
export function columnDefMgrView(columnDefId) {
  return request({
    url: `/columnDefMgr/view`,
    method: 'get',
    params: { columnDefId }
  })
}
