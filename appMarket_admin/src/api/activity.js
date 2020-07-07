import request from '@/utils/request'

//产品类别
export function classes() {
  return request({
    url: '/activity/classes',
    method: 'post'
  })
}
export function classStore(data) {
  return request({
    url: '/activity/class-store',
    method: 'post',
    data
  })
}
export function classDelete(data) {
  return request({
    url: '/activity/class-delete',
    method: 'post',
    data
  })
}

//产品
export function lists(data) {
  return request({
    url: '/activity/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/activity/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/activity/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/activity/delete',
    method: 'post',
    data
  })
}
