<!--
 * @Description:login.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-31 11:28
 * @LastEditTime: 2021-09-01 19:24:01
 * @LastEditors: the-ruffian
-->
<template>
  <div>
    <a-card
      title="欢迎登录"
    style="width: 40%; margin-left: 30%">
      <a-form
          :model="form"
      >
        <a-form-item
            label="账号"

        >
          <a-input
              v-model:value="form.phone"
          />
        </a-form-item>
        <a-form-item
            label="密码">
          <a-input v-model:value="form.password"/>
        </a-form-item>
        <a-button
            size="small"
            @click="login">登录</a-button>
      </a-form>
    </a-card>
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
    const login = () =>{
      userLogin({
        phone: form.phone,
        password: Md5.hashStr(form.password)
      })
    }
    return{
      form,
      login
    }
  }
})

</script>

<style scoped>

</style>
