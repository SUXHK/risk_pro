import request from '@/plugins/axios'

// 动态查询业务数据
export function bizQuery(bizAlias, query) {
  return request({
    url: `/biz/${bizAlias}/query`,
    method: 'get',
    params: query
  })
}

// 导出业务数据
export function bizExport(bizAlias, query) {
  return request({
    url: `/biz/${bizAlias}/export`,
    method: 'get',
    params: query
  })
}
