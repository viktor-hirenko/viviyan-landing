import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.scss'
import { getAppConfig } from '@/composables/useAppConfig'

const { site } = getAppConfig()
document.title = site.title
const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) {
  metaDesc.setAttribute('content', site.description)
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/privacy-policy',
      component: () => import('./views/LegalView.vue'),
      props: { type: 'privacy' },
    },
    {
      path: '/terms-and-conditions',
      component: () => import('./views/LegalView.vue'),
      props: { type: 'terms' },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash && to.path === '/') {
      return new Promise(resolve => {
        let attempts = 0
        const maxAttempts = 20
        const tick = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, behavior: 'smooth' as ScrollBehavior })
            return
          }
          if (attempts >= maxAttempts) {
            resolve({ top: 0 })
            return
          }
          attempts += 1
          setTimeout(tick, 50)
        }
        setTimeout(tick, 0)
      })
    }
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
