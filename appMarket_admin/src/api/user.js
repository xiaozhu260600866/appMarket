import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/auth/userinfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export function modifyPwd(data) {
  return request({
    url: '/user/pwd-modify',
    method: 'post',
    data
  })
}

export function categories(data) {
  return request({
    url: '/user/categories',
    method: 'post',
    data
  })
}
export function categoryStore(data) {
  return request({
    url: '/user/categorie-store',
    method: 'post',
    data
  })
}
export function categoryDelete(data) {
  return request({
    url: '/user/categorie-delete',
    method: 'post',
    data
  })
}

export function lists(data) {
  return request({
    url: '/user/lists',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: '/user/store',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
export function action(data) {
  return request({
    url: '/user/action',
    method: 'post',
    data
  })
}

export function photo(data) {
  return request({
    url: '/user/photo',
    method: 'post',
    data
  })
}