import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import routes from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
export { router }
