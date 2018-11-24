const routes = [
  {
    path: '/',
    component: () => import('layouts/Account.vue'),
    children: [
      { path: '', component: () => import('pages/Account.vue') },
      { path: 'account', component: () => import('pages/Account.vue') },
      { path: 'account/profile', component: () => import('pages/AccountProfile.vue') },
      { path: 'account/book', component: () => import('pages/AccountBook.vue') },
      { path: 'account/Schedules', component: () => import('pages/AccountSchedules.vue') },
      { path: 'account/history', component: () => import('pages/AccountHistory.vue') },
      { path: 'account/banker', component: () => import('pages/AccountBanker.vue') },
      { path: 'account/avaliations', component: () => import('pages/AccountAvaliations.vue') },
      { path: 'account/settings', component: () => import('pages/AccountSettings.vue') },
      { path: 'account/points', component: () => import('pages/AccountPoints.vue') }
    ]
  },
  {
    path: '/welcome',
    component: () => import('layouts/Welcome.vue'),
    children: [
      { path: '', component: () => import('pages/Welcome.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
