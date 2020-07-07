import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/hr/department/lists',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/hr/department/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/hr/department/delete',
    method: 'post',
    data
  })
}
