import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/poster/lists',
    method: 'post',
    data
  })
}
export function types(data) {
  return request({
    url: '/poster/types',
    method: 'post',
    data
  })
}
export function multipleLists(data) {
  return request({
    url: '/poster/multiple-lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/poster/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/poster/delete',
    method: 'post',
    data
  })
}