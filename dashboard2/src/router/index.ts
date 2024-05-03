import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const userRoles = (userData && userData.roles) ? userData.roles : null

        if (userData.is_active)
          return { name: 'index' }

        return { name: 'login', query: to.query }
      },
    },
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  const is_active = (userData && userData.is_active) ? userData.is_active : null
  if (to.name !== 'login' && (!is_active))
    next({ name: 'login', query: { redirect: to.fullPath } })

  else
    next()
})

export default router
