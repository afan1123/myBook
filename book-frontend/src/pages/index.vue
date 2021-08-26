<template>
  <h1>
    <el-container>
      <el-aside>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <!-- @open="handleOpen"
          @close="handleClose" -->
          <el-submenu index="1">
            <!-- v-for="(item, index) in bread"
              :key="index" -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in bread"
              :key="index"
              :to="item.path"
              >{{ item.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </h1>
</template>

<script>
import { router } from '../main'
export default {
  data() {
    return {
      isCollapse: false,
      menuList: [],
    }
  },
  created() {
    this.menuList = router.options.routes
    let results = this.$route.matched
      .slice(1)
      .filter(({ meta }) => meta.title)
      .map(({ path, meta }) => {
        return { path, title: meta.title }
      })
    this.bread = results
  },
}
</script>

<style lang="less" scoped></style>
