const menuData = [
  {
    path: '/home',
    title: '首页',
  },
  {
    path: '/contacts',
    title: '通讯录',
    children: [
      {
        path: '/contacts/staff',
        title: '职员',
      },
    ],
  },
]

export { menuData }
