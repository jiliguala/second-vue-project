// vuex管理数据状态
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default createStore({
  state: {
    isGetRouter: false,
    isCollapse: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    // 是否为第一次进入此路由
    changeGetRouter(state, value) {
      state.isGetRouter = value;
    },
    // 控制侧边栏展开折叠
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 登录成功后存储用户基本信息
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    // 退出时清空用户信息
    clearUserInfo(state) {
      state.userInfo = {}
    }
   },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['isCollapse', 'userInfo'] // vuex持久化配置
    })
  ]
})