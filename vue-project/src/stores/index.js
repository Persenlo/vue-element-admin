import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      // 导航栏开关状态
      navOn: true,
      // 是否登录
      isLogin: localStorage.getItem("token") ? true : false,
      //Token
      token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
      //UserInfo
      userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {uid: -1, userName: "未登录", userNo: "-1", userPermission: 0},
    }
  },
  

  actions: {
    
  },
})