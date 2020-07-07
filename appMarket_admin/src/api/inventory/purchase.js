import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/inventory/purchase/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/inventory/purchase/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/inventory/purchase/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/inventory/purchase/delete',
    method: 'post',
    data
  })
}
export function action(data) {
  return request({
    url: '/inventory/purchase/action',
    method: 'post',
    data
  })
}
