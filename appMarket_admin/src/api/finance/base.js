import request from '@/utils/request'

export function capitalAccounts(data) {
  return request({
    url: '/finance/base/capital-accounts',
    method: 'post',
    data
  })
}
export function capitalAccountStore(data) {
  return request({
    url: '/finance/base/capital-account-store',
    method: 'post',
    data
  })
}
export function capitalAccountDelete(data) {
  return request({
    url: '/finance/base/capital-account-delete',
    method: 'post',
    data
  })
}

