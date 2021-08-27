import request from '@/plugins/axios'

// 导出业务数据
export function getDeptTree() {
  return request({
    url: `/dept/tree`,
    method: 'get'
  })
}

// 查询部门详情
export function getDeptDetail() {
  return request({
    url: `/dept/detail`,
    method: 'get'
  })
}

// 获取所有部门列表
export function getDeptList() {
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
