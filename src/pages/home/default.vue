<template>
  <div style="height: 4vh;background-color: #f9a7a7"></div>
  <div style="height: 96vh;background-color: antiquewhite;overflow: scroll">
    <div
        style="height: 10%"
        v-for="i in listTable.list"
        :key="i"
    >
      <router-link :to="{path:'/details',query:{id:i.id}}" target='_blank'>{{ i.title }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {searchColumn} from "../../api/column";
import {message} from "ant-design-vue";
import {searchArticle} from "../../api/article";

const data = reactive({
  i: 20,
  columns: ''
})
const listForm = reactive({
  pageNo:1,
  pageSize:20,
  title: '',
  author: '',
  sortId: '',
})
const listTable = reactive({
  list: ''
})
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
const articleList = () => {
  searchArticle({
    'pageNo': listForm.pageNo,
    'pageSize': listForm.pageSize,
    'title': listForm.title,
    'author': listForm.author,
    'sortId': listForm.sortId
  }).then(res => {
    if (res.data.code === 200){
      listTable.list = res.data.result.list
      console.log(res.data.result.list)
    }
  })
}
methods: {
  column(),articleList()
}
</script>

<style >

</style>