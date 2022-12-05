import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      // 导航栏开关状态
       navOn: true,

    }
  },
  

  actions: {
    
  },
})