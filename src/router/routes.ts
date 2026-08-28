export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/jigsaw',
    name: 'jigsaw',
    component: () => import('@/views/Jigsaw/index.vue'),
  },
]
