import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({

})
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refresh——token只能使用一次
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    (config.headers as any).Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器

let isRfreshing = false // 控制刷新 token 状态
let requests: any[] = [] // 储存刷新 token 期间过来的401请求
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了2xx的范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新token
      if (!isRfreshing) {
        isRfreshing = true // 开启刷新状态
        // 尝试刷新获取新的token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新token 成功了
          store.commit('setUser', res.data.content)
          // 把requests 队列中的请求重新发送出去
          requests.forEach(cb => cb())
          // 重置 request数组
          requests = []
        }).catch(err => {
          console.log(err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false
        })
      }
      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})
export default request
