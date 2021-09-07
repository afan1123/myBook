<template>
  <el-container>
    <el-aside width="250px">
      <div class="input-container">
        <el-input
          v-model="staffKeyword"
          placeholder="请输入内容"
          clearable
          size="mini"
        />
      </div>
      <div class="checkbox-container">
        <el-checkbox-group
          v-model="sectorStateChecked"
          @change="sectorStateChange"
          size="mini"
        >
          <el-checkbox-button
            :label="item.state"
            v-for="item in sectorState"
            :key="item.state"
          >
            {{ item.text }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="result-container">
        <el-input
          v-model="sectorKeyword"
          :placeholder="!sectorTreeLoading ? '请输入内容' : '正在搜索中'"
          clearable
          size="mini"
          @keydown.native.enter="searchSector"
          :disabled="sectorTreeLoading"
        />
        <div class="sector-tree-container">
          <!-- 搜索中 -->
          <div
            v-loading="sectorTreeLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <div
              v-if="sectorKeyword && searchState === SEARCH_STATE.SEARCH_STATE"
            >
              <!-- 搜索到 -->
              <div v-if="sectorResultLen">
                搜索到{{ sectorResultLen }}条结果
                <div class="sector-result-list">
                  <ul>
                    <li v-for="(item, index) in sectorResult" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 搜索到0条 -->
              <div v-else-if="!sectorResultLen">
                没有搜索到结果
              </div>
              <!-- 搜索不到，报错
            <div v-if="sectorKeyword && !getResultLen">
             报错
            </div> -->
            </div>
            <el-tree
              v-show="!sectorKeyword || searchState === SEARCH_STATE.INIT_STATE"
              :data="sectorTreeCopy"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header style="text-align:left;margin-left:50px">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="toAdd"
        >
          添加成员
        </el-button>
        <el-button type="default" size="small" icon="el-icon-edit">
          批量导入
        </el-button>
        <el-button type="default" size="small" icon="el-icon-share">
          邀请成员
        </el-button>
      </el-header>
      <el-main style="text-align:left;margin-left:50px">
        <el-table
          v-loading="staffListLoading"
          :data="tableDataCopy"
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="toEdit(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          style="text-align:right;margin-top:20px"
          background
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import { staff } from '../services/index'
import data from '../data/index.json'
const SEARCH_STATE = {
  INIT_STATE: 0,
  SEARCH_STATE: 1,
}
export default {
  data() {
    return {
      SEARCH_STATE,
      searchState: 0,
      sectorResultLen: 0,
      sectorTreeLoading: false,
      staffListLoading: false,
      sectorResult: [],
      loading: false,
      staffKeyword: '',
      sectorKeyword: '',
      sectorStateChecked: [1],
      sectorState: [
        { state: 1, text: '全部' },
        { state: 2, text: '正常' },
        { state: 3, text: '未激活' },
        { state: 4, text: '冻结' },
      ],
      sectors: [
        {
          id: 1,
          name: 'sector01',
        },
        {
          id: 2,
          name: 'sector02',
        },
        {
          id: 3,
          name: 'sector03',
        },
        {
          id: 4,
          name: 'sector04',
        },
        {
          id: 5,
          name: 'sector05',
        },
      ],
      sectorTreeCopy: [],
      sectorTree: data.sectors,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      tableData: data.staffs,
      tableDataCopy: [],
    }
  },
  computed: {},
  methods: {
    async init() {
      this.getSectorTree()
      await this.getList()
    },
    async getList() {
      this.staffListLoading = true
      let res = await staff.fetchStaff()

      console.log(res)
      setTimeout(() => {
        this.tableDataCopy = cloneDeep(this.tableData)
        this.staffListLoading = false
      }, 2000)
    },
    toEdit(row) {
      this.$router.push({ name: 'staff-edit', params: { id: row.id } })
    },
    toAdd() {
      this.$router.push({ name: 'staff-add' })
    },
    getSectorTree() {
      this.sectorTreeLoading = true
      setTimeout(() => {
        this.searchState = SEARCH_STATE.INIT_STATE
        this.sectorTreeCopy = cloneDeep(this.sectorTree)
        this.sectorTreeLoading = false
        this.searchState = 0
      }, 2000)
    },
    searchSector() {
      if (!this.sectorKeyword) return false
      this.sectorTreeLoading = true
      setTimeout(() => {
        this.searchState = SEARCH_STATE.SEARCH_STATE
        let keyword = this.sectorKeyword
        keyword = keyword.toLowerCase()
        if (!this.sectorKeyword) {
          return this.sectorTree
        }
        const sectorTree = this.sectorTree
        let results = []
        sectorTree.forEach((sector) => {
          for (let key in sector) {
            if (key === 'label') {
              if (sector[key].toLowerCase().includes(keyword)) {
                results.push(sector[key])
              }
            }
          }
        })
        this.sectorResult = results
        this.sectorResultLen = results.length
        this.sectorTreeLoading = false
      }, 2000)
    },
    sectorStateChange(val) {
      console.log(val)
    },
    handleNodeClick(data) {
      console.log(data)
    },
  },
  created() {
    this.init()
  },
  watch: {
    sectorKeyword: {
      handler(newVal) {
        if (!newVal) {
          this.searchState = SEARCH_STATE.INIT_STATE
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.input-container {
  margin-bottom: 10px;
}
.result-container {
  margin: 10px 0;
  .sector-tree-container {
    margin: 10px 0;
  }
}
.sector-result-list {
  ul {
    list-style-type: none;
    padding: 0;
  }
}
</style>
