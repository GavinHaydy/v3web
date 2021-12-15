<template>
  <div style="height: 4vh;background-color: #f9a7a7"></div>
  <div style="height: 96vh;background-color: antiquewhite">
    <div v-for="i in data.i">{{ i ** 5 }}</div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const data = reactive({
  i: 20
})
</script>

<style >

</style>