import request from '@/utils/request'

export function dashboard(data) {
  return request({
    url: '/base/dashboard',
    method: 'post',
    data
  })
}
export function uploadDelete(data) {
  return request({
    url: '/base/upload-delete',
    method: 'post',
    data
  })
}

export function attributeTypes(data) {
  return request({
    url: '/base/attribute-types',
    method: 'post',
    data
  })
}

export function attributes(data) {
  return request({
    url: '/base/attributes',
    method: 'post',
    data
  })
}

export function multipleAttributes(data) {
  return request({
    url: '/base/multiple-attributes',
    method: 'post',
    data
  })
}

export function attributeStore(data) {
  return request({
    url: '/base/attribute-store',
    method: 'post',
    data
  })
}

export function attributeDelete(data) {
  return request({
    url: '/base/attribute-delete',
    method: 'post',
    data
  })
}