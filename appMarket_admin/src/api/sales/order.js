import request from '@/utils/request'

export function datas(data) {
  return request({
    url: '/sales/order/datas',
    method: 'post',
    data
  })
}
export function lists(data) {
  return request({
    url: '/sales/order/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/sales/order/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/sales/order/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/sales/order/delete',
    method: 'post',
    data
  })
}
export function action(data) {
  return request({
    url: '/sales/order/action',
    method: 'post',
    data
  })
}
export function materielAnalysis(data) {
  return request({
    url: '/sales/order/materiel-analysis',
    method: 'post',
    data
  })
}
export function salesRanking(data) {
  return request({
    url: '/sales/order/sales-ranking',
    method: 'post',
    data
  })
}