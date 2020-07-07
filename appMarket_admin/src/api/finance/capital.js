import request from '@/utils/request'

export function datas(data) {
  return request({
    url: '/finance/capital/datas',
    method: 'post',
    data
  })
}
export function records(data) {
  return request({
    url: '/finance/capital/records',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/finance/capital/store',
    method: 'post',
    data
  })
}

