<!--
 * @Description:editArticle.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-13 20:45
 * @LastEditTime: 2021-09-13 20:45
 * @LastEditors: the-ruffian
-->
<template>
  <a-row>
    <a-col :span="2">
      <h3 style="text-align: center">标题</h3>
    </a-col>
    <a-col :span="8">
      <a-input class="a-input" v-model:value="data.title"></a-input>
    </a-col>
    <h3
      style="text-align: center"
    >分类</h3>
    <a-select
        v-model:value="data.value"
        style="width: 20%"
        placeholder="请选择分类"
        allowClear
    >
      <a-select-option
          v-for="item in data.columns"
          :value="item.id"
          :lable="item.columnName"
      >{{item.columnName}}</a-select-option>
    </a-select>
    <a-button type="primary" @click="save">发布</a-button>
  </a-row>
  <v-md-editor v-model="data.article" @save="save"></v-md-editor>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {addArticle} from "../../api/article";
import {message} from "ant-design-vue";
import {searchColumn} from "../../api/column";

const data = reactive({
  title: '',
  article: '',
  author: localStorage.getItem('username'),
  columns: '',
  value: ''
})
const save = () =>{
  console.log(data.value)
  addArticle({
    'title': data.title,
    'author': data.author,
    'article': data.article,
    'sortId': data.value
  }).then(res =>{
    if (res.data.code ===200){
      message.success(res.data.message)
    }else {
      message.error(res.data.message)
    }
  })
}
const column = () => {
  searchColumn({
    'pageNo':1,
    'columnName': ''
  }).then(res =>{
    if (res.data.code===200){
      data.columns= res.data.result.list
    }else {
      message.error(res.data.message)
    }
  })
}
methods: {
  column()
}
</script>

<style scoped>
.a-input {
  border-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: coral;
}
</style>
