import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/privacy-policy',
      component: () => import('./views/LegalView.vue'),
      props: { type: 'privacy' }
    },
    {
      path: '/terms-and-conditions',
      component: () => import('./views/LegalView.vue'),
      props: { type: 'terms' }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
