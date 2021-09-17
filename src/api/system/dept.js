import request from '@/plugins/axios'

// 获取部门的tree列表
export function getDeptTree() {
  return request({
    url: `/dept/tree`,
    method: 'get'
  })
}

// 查询部门详情
export function getDeptDetail(id) {
  return request({
    url: `/dept/detail`,
    method: 'get',
    params: { deptId: id }
  })
}

// 获取所有部门列表
export function getDeptList(name) {
  return request({
    url: `/dept/list`,
    method: 'get',
    params: { deptName: name }
  })
}
export function getDeptList1() {
  return request({
    url: `/dept/list`,
    method: 'get'
  })
}

// 修改部门
export function deptUpdate(data) {
  return request({
    url: `/dept/update`,
    method: 'post',
    data
  })
}

// 添加部门
export function deptAdd(data) {
  return request({
    url: `/dept/add`,
    method: 'post',
    data
  })
}

// 删除部门
export function deptDelete(data) {
  return request({
    url: `/dept/delete?deptId=${data}`,
    method: 'post'
  })
}
