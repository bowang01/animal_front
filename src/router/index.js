import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/Front'),
    redirect: '/front/home',
    children: [
      { path: 'person', name: 'Personal Info', component: () => import('../views/front/Person.vue')},
      { path: 'password', name: 'Change Password', component: () => import('../views/front/Password.vue')},
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: 'homeDetail',
        name: 'HomeDetail',
        component: () => import('../views/front/HomeDetail')
      },
      {
        path: 'adopt',
        name: 'Adopt',
        component: () => import('../views/front/Adopt.vue')
      },
      {
        path: 'myAdopt',
        name: 'MyAdopt',
        component: () => import('../views/front/MyAdopt.vue')
      },
      {
        path: 'salvation',
        name: 'Salvation',
        component: () => import('../views/front/Salvation.vue')
      },
      {
        path: 'feed',
        name: 'Feed',
        component: () => import('../views/front/Feed.vue')
      },
      {
        path: 'lost',
        name: 'Lost',
        component: () => import('../views/front/Lost.vue')
      },
      {
        path: 'rescue',
        name: 'Rescue',
        component: () => import('../views/front/Rescue.vue')
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../views/front/Article.vue')
      },
      {
        path: 'donate',
        name: 'Donate',
        component: () => import('../views/front/Donate.vue')
      },
      {
        path: 'articleKp',
        name: 'ArticleKp',
        component: () => import('../views/front/ArticleKp.vue')
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('../views/front/Activity.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// Reset router
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    routes
  })
}

// Note: refreshing the page will reset the routes
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  if (storeMenus) {
    // Assemble dynamic routes
    const manageRoute = { path: '/', name: 'Manage', component: () => import('../views/Manage.vue'), redirect: "/home", children: [
        { path: 'person', name: 'Personal Info', component: () => import('../views/Person.vue')},
        { path: 'password', name: 'Change Password', component: () => import('../views/Password.vue')},
      ] }
    const menus = JSON.parse(storeMenus)
    menus.forEach(item => {
      if (item.path) {  // Set the route only when path is not empty
        let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
        manageRoute.children.push(itemMenu)
      } else if(item.children.length) {
        item.children.forEach(item => {
          if (item.path) {
            let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    // Get the name array of current route objects
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if (!currentRouteNames.includes('Manage')) {
      // Dynamically add to the current router
      router.addRoute(manageRoute)
    }
  }
}

// Reset routes on every page refresh, otherwise routes will be reset
setRoutes()

router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // Set the current route name
  store.commit("setPath")
  if (!to.matched.length) {
    const menus = localStorage.getItem("menus")
    if (!menus) {
      // Guests without admin menus browse the public homepage instead of login
      next("/front/home")
    } else {
      next("/404")
    }
  } else {
    next()
  }
})

export default router
