import request from '@/utils/request'

export function info(data) {
  return request({
    url: '/setting/system/info',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/setting/system/info-store',
    method: 'post',
    data
  })
}
