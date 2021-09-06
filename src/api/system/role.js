import request from '@/plugins/axios'

// 添加角色
export function roleAdd(data) {
  return request({
    url: `/role/add`,
    method: 'post',
    data
  })
}

// 配置角色-业务表字段权限
export function roleAuthColumns(cid, id) {
  return request({
    url: `/role/authColumns`,
    method: 'get',
    params: { cols: cid, roleId: id }
  })
}

// 配置角色-菜单权限
export function roleAuthMenus(ids, id) {
  return request({
    url: `/role/authMenus`,
    method: 'get',
    params: { ids: ids, roleId: id }
  })
}

// 删除角色
export function roleDelete(id) {
  return request({
    url: `/role/delete`,
    method: 'get',
    params: { roleId: id }
  })
}

// 修改角色
export function roleEdit(data) {
  return request({
    url: `/role/edit`,
    method: 'post',
    data
  })
}

// 获取角色列表
export function roleList(name) {
  return request({
    url: `/role/list`,
    method: 'get',
    params: { roleName: name }
  })
}

// 获取用户对应的角色列表
export function roleListByUserId(id) {
  return request({
    url: `/role/listByUserId`,
    method: 'get',
    params: { userId: id }
  })
}

// 获取角色树状列表
export function getRoleTree() {
  return request({
    url: `/role/tree`,
    method: 'get'
  })
}

// 查看角色
export function roleView(id) {
  return request({
    url: `/role/view`,
    method: 'get',
    params: { roleId: id }
  })
}
