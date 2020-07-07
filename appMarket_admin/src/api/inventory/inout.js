import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/inventory/inout/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/inventory/inout/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/inventory/inout/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/inventory/inout/delete',
    method: 'post',
    data
  })
}
export function action(data) {
  return request({
    url: '/inventory/inout/action',
    method: 'post',
    data
  })
}
export function inventoryRecords(data) {
  return request({
    url: '/inventory/inout/inventory-records',
    method: 'post',
    data
  })
}
