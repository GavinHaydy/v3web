<template>
  <v-md-preview
      :text=listTable.list.article
  ></v-md-preview>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {articleBody} from "../../api/article";
import defaultResult from "ant-design-vue/es/_util/isMobile";
import any = defaultResult.any;

const router =useRouter()
const listTable = reactive({
  list: any
})
const getBody = () => {
  articleBody({
    'id': useRoute().query.id
  }).then(res =>{
    if (res.data.result !== null){
      listTable.list = res.data.data.result
    }else {
      router.push('error')
    }
  })
}
getBody();
</script>

<style scoped>

</style>
