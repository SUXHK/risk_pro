import request from '@/plugins/axios'

// 新增菜单
export function menuMgrAdd(data) {
  return request({
    url: `/menuMgr/add`,
    method: 'post',
    data
  })
}
// 修该菜单
export function menuMgrEdit(data) {
  return request({
    url: `/menuMgr/edit`,
    method: 'post',
    data
  })
}
// 获取菜单列表
export function menuMgrList(data) {
  return request({
    url: `/menuMgr/list`,
    method: 'post',
    data
  })
}

// 删除菜单
export function menuMgrRemove(id) {
  return request({
    url: `/menuMgr/remove`,
    method: 'get',
    params: { menuId: id }
  })
}
// 获取菜单树状列表
export function menuMgrTree() {
  return request({
    url: `/menuMgr/tree`,
    method: 'get'
  })
}

// 查看菜单
export function menuMgrView(id) {
  return request({
    url: `/menuMgr/view`,
    method: 'get',
    params: { menuId: id }
  })
}
