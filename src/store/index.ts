import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  getters: {
  },
  mutations: {
    // 修改容器数据必须使用mutation函数
    setUser (state, paylode) {
      state.user = JSON.parse(paylode)
      // 为了防止数据丢失，我们需要把user放到本地存储中
      // 注意本地存储只能存字符串
      window.localStorage.setItem('user', paylode)
    }
  },
  actions: {
  },
  modules: {
  }
})
