import request from '@/utils/request'

//产品类别
export function classes() {
  return request({
    url: '/article/classes',
    method: 'post'
  })
}
export function classStore(data) {
  return request({
    url: '/article/class-store',
    method: 'post',
    data
  })
}
export function classDelete(data) {
  return request({
    url: '/article/class-delete',
    method: 'post',
    data
  })
}

//产品
export function lists(data) {
  return request({
    url: '/article/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/article/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/article/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data
  })
}
