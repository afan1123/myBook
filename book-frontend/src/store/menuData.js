const menuState = {
  menuData: [],
}
const getters = {}

const mutations = {
  updateMenuData(state, menuData) {
    state.menuData = menuData
  },
}

const actions = {}

export default {
  namespaced: true,
  state: menuState,
  getters,
  mutations,
  actions,
}
