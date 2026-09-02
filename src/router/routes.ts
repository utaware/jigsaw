export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  // 参考：https://pintu.lingwulab.com/
  {
    path: '/jigsaw',
    name: 'jigsaw',
    component: () => import('@/views/Jigsaw/index.vue'),
    children: [
      {
        path: '',
        name: 'game-jigsaw-options',
        component: () => import('@/views/Jigsaw/game-options/index.vue'),
      },
      {
        path: 'play',
        name: 'game-jigsaw-play',
        component: () => import('@/views/Jigsaw/game-play/index.vue'),
      },
    ],
  },
  // 参考：https://zhongguose.lingwulab.com/
  {
    path: '/chinese-colors',
    name: 'chinese-colors',
    component: () => import('@/views/ChineseColors/index.vue'),
  },
]
