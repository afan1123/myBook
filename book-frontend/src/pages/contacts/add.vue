<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="currentSelected"
        mode="vertical"
        @select="menuSelect"
      >
        <el-menu-item index="1">人员信息</el-menu-item>
        <el-menu-item index="2">分支信息</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="staffInfo" v-if="currentSelected == 1">
        <Info>
          <template #header>基础信息</template>
          <template #body>
            <el-form key="basicForm" :model="basicForm" :rules="rules">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="姓名：" labelWidth="100px" prop="name">
                    <el-input
                      v-model="basicForm.name"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年龄：" labelWidth="100px" prop="age">
                    <el-input v-model="basicForm.age" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="居住地址："
                    labelWidth="100px"
                    prop="address"
                  >
                    <el-input v-model="basicForm.age" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </Info>
      </div>
      <div class="staffInfo" v-else>
        分支信息
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Info from '../../components/Info.vue'
export default {
  components: {
    Info,
  },
  data() {
    const validateAge = (rule, value, callback) => {
      const reg = /^[1-9]\d*$/
      if (!value) {
        return callback('请输入年龄')
      } else if (reg.test(value)) {
        return callback('请输入正整数')
      }
      return callback()
    }

    return {
      currentSelected: '1',
      basicForm: {
        name: '',
        age: '',
      },
      rules: {
        age: [{ validator: validateAge, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入居住地址', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    menuSelect(value) {
      this.currentSelected = value
      console.log(value)
    },
  },
}
</script>

<style></style>
