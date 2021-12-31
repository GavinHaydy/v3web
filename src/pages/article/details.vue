<template>
  <v-md-preview
      :text=listTable.list.article
  ></v-md-preview>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {articleBody} from "../../api/article";
import {message} from "ant-design-vue";


const listTable = reactive({
  list:''
})
const getBody = () => {
  articleBody({
    'id': useRoute().query.id
  }).then(res =>{
    if (res.data.code ===200){
      listTable.list = res.data.result
    }else {
      message.error(res.data.message)
    }
  })
}
methods: {
  getBody()
}
</script>

<style scoped>

</style>