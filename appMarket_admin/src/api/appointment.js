import request from '@/utils/request'

export function lists(data) {
  return request({
    url: '/user/appointment/lists',
    method: 'post',
    data
  })
}