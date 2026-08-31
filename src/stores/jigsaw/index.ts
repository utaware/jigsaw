import { defineStore } from 'pinia'

import { defaultSplitSize } from './options'

export const useJigsawStore = defineStore('game-jigsaw', {
  state: () => ({
    // 游戏配置选项
    gameOptions: {
      // 拼图难度，表示每行/列的方块数
      splitSize: defaultSplitSize,
      // 拼图图片的 URL
      imgUrl: '',
    },
  }),
  actions: {},
  getters: {},
})
