import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/inventory/supplier/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/inventory/supplier/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/inventory/supplier/delete',
    method: 'post',
    data
  })
}
