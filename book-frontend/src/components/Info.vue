<template>
  <div class="container">
    <div class="title">
      <span></span>
      <slot name="header"></slot>
    </div>
    <div>
      <slot name="body"></slot>
    </div>
    <div class="button-box">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary">取消</el-button>
    </div>
  </div>
</template>

<script>
import '../style/index.less'
import { staff } from '../services/index'
export default {
  data() {
    return {}
  },
  methods: {
    async save() {
      try {
        let res = await staff.modifyStaff()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.button-box {
  display: flex;
  justify-content: flex-end;
}
.title {
  span {
    padding: 0 5px;
    margin: 2px 0;
    background-color: #e0e0e0;
  }
}
</style>
