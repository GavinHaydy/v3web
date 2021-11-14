<!--
 * @Description:default.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-13 20:45
 * @LastEditTime: 2021-09-13 20:45
 * @LastEditors: the-ruffian
-->
<template>
  <v-md-editor @save="save"></v-md-editor>
</template>

<script setup lang="ts">
const save = () =>{
  console.log(111)
}
</script>

<style scoped>

</style>
