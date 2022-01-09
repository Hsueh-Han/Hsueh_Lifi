import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/new_invoice',
      name: 'new-invoice',
      component: () => import('@/views/InputInvoice.vue'),
    },
  ],
});

export default router;
