import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/sales/customer/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/sales/customer/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/sales/customer/delete',
    method: 'post',
    data
  })
}
