import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/hr/user/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/hr/user/store',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/hr/user/detail',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/hr/user/update',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/hr/user/delete',
    method: 'post',
    data
  })
}
