import request from '@/utils/request'

//产品类别
export function classes() {
  return request({
    url: '/product/classes',
    method: 'post'
  })
}
export function classStore(data) {
  return request({
    url: '/product/class-store',
    method: 'post',
    data
  })
}
export function classDelete(data) {
  return request({
    url: '/product/class-delete',
    method: 'post',
    data
  })
}

//产品
export function lists(data) {
  return request({
    url: '/product/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/product/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/product/detail',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/product/delete',
    method: 'post',
    data
  })
}

//产品子件
export function subparts(data) {
  return request({
    url: '/product/subparts',
    method: 'post',
    data
  })
}
export function subpartStore(data) {
  return request({
    url: '/product/subpart-store',
    method: 'post',
    data
  })
}
export function subpartDelete(data) {
  return request({
    url: '/product/subpart-delete',
    method: 'post',
    data
  })
}
