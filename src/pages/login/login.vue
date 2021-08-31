<!--
 * @Description:login.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-31 11:28
 * @LastEditTime: 2021-8-31 18:07:24
 * @LastEditors: the-ruffian
-->
<template>
  <div>
    <a-button
        @click="login"
    >测试</a-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {Md5} from "ts-md5";
import { userLogin } from "../../api/user";

export default defineComponent({
  name: 'login',
  setup() {
    const form = reactive({
      phone: '',
      password: ''
    })
    const md5Password = Md5.hashStr(form.password)
    const login = () =>{
      userLogin({
        phone: form.phone,
        password: md5Password
      })
    }
    return{
      form,
      md5Password,
      login
    }
  }
})

</script>

<style scoped>

</style>
