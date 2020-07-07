import request from '@/utils/request'

export function datas(data) {
  return request({
    url: '/finance/bill/datas',
    method: 'post',
    data
  })
}
export function lists(data) {
  return request({
    url: '/finance/bill/lists',
    method: 'post',
    data
  })
}
export function recordLists(data) {
  return request({
    url: '/finance/bill/record-lists',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/finance/bill/detail',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/finance/bill/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/finance/bill/delete',
    method: 'post',
    data
  })
}
