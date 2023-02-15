<template>
    <div class="resource-list">
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="资源名称">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
  <el-form-item label="资源路径">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
  <el-form-item label="资源分类">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询搜索</el-button>
  </el-form-item>
</el-form>
  </div>
  <el-table
      :data="resources"
      style="width: 100%; margin-bottom: 20px"
      >
      <el-table-column
        type="index"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="操作"
        width="180">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!--
         total总记录数
        page-size每页大小
        分页组件会自动根据total和page-size计算出一共分多少页
         -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
</el-card>
    </div>
   </template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        current: 1, // 默认查询第一页数据
        size: 5

      },
      totalCount: 0,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      const { data } = await getResourcePages({
        // 查询条件
        current: this.form.current, // 分页页码
        size: this.form.size // 每页大小
      })
      this.resources = data.data.records
      this.totalCount = data.data.total
    },
    onSubmit () {
      console.log('submit!')
    },
    handleEdit () {
      console.log(1)
    },
    handleDelete () {
      console.log('2')
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第一页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
    // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    }
  }
})
</script>

   <style lang="scss" scoped>

   </style>
