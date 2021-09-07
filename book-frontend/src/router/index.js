const List = () => import('../pages/list.vue')
const Index = () => import('../pages/index.vue')
const Home = () => import('../pages/home.vue')
const Login = () => import('../pages/login.vue')
const Register = () => import('../pages/register.vue')
const Staff = () => import('../pages/contacts/staff.vue')
const Contacts = () => import('../pages/contacts/contacts.vue')
const Edit = () => import('../pages/contacts/edit.vue')
const Add = () => import('../pages/contacts/add.vue')
// const Detail = () => import('../pages/contacts/detail.vue')

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
        path: '',
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
        path: 'contacts',
        name: 'contacts',
        meta: { title: '通讯录' },
        children: [
          { path: '', redirect: 'staff' },
          {
            path: 'staff',
            name: 'staff',
            component: Staff,
            meta: { title: '职员' },
            children: [
              {
                path: '',
                redirect: 'staff-list',
              },
              {
                path: 'staff-list',
                name: 'staff-list',
                component: List,
                meta: { title: '职员列表' },
              },
              {
                path: ':id/staff-edit',
                name: 'staff-edit',
                component: Edit,
                meta: {
                  title: '职员编辑',
                },
              },
              {
                path: 'staff-add',
                name: 'staff-add',
                component: Add,
                meta: {
                  title: '添加职员',
                },
              },
            ],
          },
        ],
        component: Contacts,
      },
    ],
  },
  {
    path: '/login',
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
