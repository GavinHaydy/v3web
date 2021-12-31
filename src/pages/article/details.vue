<template>
  <v-md-preview
      :text=listTable.list.article
  ></v-md-preview>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {articleBody} from "../../api/article";

const router =useRouter()
const listTable = reactive({
  list:''
})
const getBody = () => {
  articleBody({
    'id': useRoute().query.id
  }).then(res =>{
    if (res.data.result !== null){
      listTable.list = res.data.result
    }else {
      router.push('error')
    }
  })
}
methods: {
  getBody()
}
</script>

<style scoped>

</style>