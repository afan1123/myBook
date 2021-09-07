<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="edit" v-if="disabled">编辑</el-button>
        <div class="editButton" v-else>
          <el-button type="text" @click="save('formValidate')">保存</el-button>
          <el-button type="text" @click="cancel('formValidate')"
            >取消</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-form key="formCopyKey" label-width="60px" v-if="disabled">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <span>{{ formCopy.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <span>{{ formCopy.age }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      key="formKey"
      :model="form"
      :rules="rules"
      label-width="60px"
      ref="formValidate"
      v-else
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="form.age" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import data from '../../data/index.json'
import { cloneDeep } from 'lodash'
export default {
  data() {
    const validateAge = (rule, value, callback) => {
      var reg = /^[1-9]\d*$/
      if (!value) {
        return callback('请输入')
      } else if (!reg.test(value)) {
        return callback('请输入正整数')
      }
      callback()
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback('请输入')
      }
      callback()
    }
    return {
      form: {
        age: 0,
        name: '',
      },
      fromCopy: {},
      defaultForm: {
        name: '',
        age: 0,
      },
      disabled: true,
      rules: {
        age: [{ validator: validateAge, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
      },
    }
  },
  computed: {},
  methods: {
    init(id) {
      if (id) {
        this.form = this.getFromData(id)
        this.formCopy = cloneDeep(this.form)
        this.disabled = true
      } else {
        this.form = this.defaultForm
      }
    },
    getFromData(id) {
      const from = data.staffs.filter((item) => id == item.id)
      return from[0]
    },
    edit() {
      this.disabled = false
    },
    save(formName = null) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formCopy = cloneDeep(this.form)
          this.$refs[formName].resetFields()
          this.disabled = true
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.disabled = true
      this.$refs[formName].resetFields()
    },
  },
  created() {
    this.init(this.$route.params.id)
    console.log(data)
  },
}
</script>

<style lang="less" scoped>
.editButton {
  display: flex;
  justify-content: flex-end;
}
</style>
