import List from '../pages/list.vue'
import Index from '../pages/index.vue'
import Home from '../pages/home.vue'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Staff from '../pages/staff.vue'
import Detail from '../pages/detail.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: 'index页',
    },
    children: [
      {
        path: '/',
        redirect: 'home',
      },
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: 'list',
        name: 'list',
        component: List,
        meta: {
          title: '列表页',
        },
      },
      {
        path: 'staff',
        name: 'staff',
        component: Staff,
        meta: { title: '职工' },
        children: [
          {
            path: 'detail',
            name: 'detail',
            component: Detail,
            meta: { title: '详情' },
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    name: 'login',
    component: Login,
    children: [
      {
        path: 'register',
        name: 'register',
        component: Register,
      },
    ],
  },
]

export default routes
