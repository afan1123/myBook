import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import lodash from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import routes from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Router)
Vue.use(lodash)

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
  store,
  render: (h) => h(App),
}).$mount('#app')
export { router }
