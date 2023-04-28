<template>
  <div style="height: 4vh;background-color: #f9a7a7"></div>
  <div style="height: 96vh;background-color: antiquewhite;overflow: scroll">
    <div
        style="height: 10%"
        v-for="item in listTable.list.slice(0,2)"
        :key="item"
    >
      <router-link :to="{path:'/details',query:{id:item.id}}" target='_blank' >{{ item.title }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {searchColumn} from "../../api/column";
import {message} from "ant-design-vue";
import {searchArticle} from "../../api/article";
import defaultResult from "ant-design-vue/es/_util/isMobile";
import any = defaultResult.any;

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
  list: any
})
const column = () => {
  searchColumn({
    'pageNo':1,
    'columnName': ''
  }).then(res =>{
    if (res.data.code===1000){
      data.columns= res.data.data.result.list
    }else {
      message.error(res.data.data.msg)
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
    if (res.data.code === 1000){
      listTable.list = res.data.data.result.list
    }
  })
}
column();
articleList()
</script>

<style >

</style>
