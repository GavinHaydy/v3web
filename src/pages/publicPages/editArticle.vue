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
    <a-col :span="12">
      <a-input class="a-input"></a-input>
    </a-col>
    <a-button type="primary" @click="save">发布</a-button>
  </a-row>
  <v-md-editor v-model="data.text" @save="save"></v-md-editor>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const data = reactive({
  text: ''
})
const save = () =>{
  console.log(typeof(data.text), data.text)
}
</script>

<style scoped>
.a-input {
  border-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: coral;
}
</style>
