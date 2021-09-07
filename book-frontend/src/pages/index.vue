<template>
  <h1>
    <el-container>
      <el-aside width="150px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="false"
          :router="true"
        >
          <div v-for="(item, index) in menuData" :key="index">
            <el-menu-item :index="item.path" v-if="!item.children">
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu :index="item.path" v-else>
              <span slot="title">{{ item.title }}</span>
              <el-menu-item-group
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
              >
                <el-menu-item :index="child.path">
                  {{ child.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="padding:0 20px;display:flex;align-items:center">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in bread"
              :key="index"
              :to="item.path"
              >{{ item.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-header>
        <el-main style="padding-top:0px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </h1>
</template>

<script>
import { menuData } from '../configs/menu.js'
import { mapState, mapMutations } from 'vuex'
import { router } from '../main'

export default {
  data() {
    return {
      menuData,
      isCollapse: false,
      bread: null,
    }
  },
  computed: {
    ...mapState('menu', ['menuState']),
  },
  methods: {
    ...mapMutations('menu', ['updateMenuData']),
    render() {
      let results = this.$route.matched
        .slice(1)
        .filter(({ meta }) => meta.title)
        .map(({ path, meta }) => {
          return { path, title: meta.title }
        })
      this.bread = results
    },
  },
  created() {
    this.updateMenuData(menuData)
    this.render()
  },
  mounted() {
    router.afterEach(() => {
      console.log(this.$route.matched)
      this.render()
    })
  },
}
</script>

<style lang="less" scoped></style>
