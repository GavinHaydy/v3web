<!--
 * @Description:login.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-31 11:28
 * @LastEditTime: 2021-09-01 19:24:01
 * @LastEditors: the-ruffian
-->
<template>
  <div class="div">
    <div style="padding-top: 35vh">
      <a-card
          title="登录"
          class="loginForm"
      >
        <a-form
            :model="form"
        >
          <a-row>
            <a-form-item
                label="账号"
            >
              <a-input
                  placeholder="请输入手机号"
                  v-model:value="form.phone"
              />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item
                label="密码">
              <a-input
                  placeholder="请输入密码"
                  type="password"
                  v-model:value="form.password"/>
            </a-form-item>
          </a-row>
          <a-row justify="center" style="padding-right: 60px">
              <a @click="ForgerPassword">忘记密码</a>
          </a-row>
          <a-row>
            <a-button
                size="small"
                type="success"
                @click="Register"
            >
              注册
            </a-button>
            <a-button
                style="margin-left: 28%"
                size="small"
                type="primary"
                @click="login"
            >
              登录
            </a-button>
          </a-row>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {Md5} from "ts-md5";
import { userLogin } from "../../api/user";
import {message} from "ant-design-vue";

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
      .then(res =>{
        if (res.data.code === 200){
          const token = res.data.result.token
          localStorage.setItem('token',token)
          localStorage.setItem('phone', form.phone)
          localStorage.setItem('username', res.data.result.username)
          localStorage.setItem('is_login', 'true')
          location.replace('/default')
        } else {
          message.error(res.data.message)
          setTimeout(function () { location.reload() }, 1500) // 一秒后刷新页面
        }
      })
    }
    const Register = () =>{
      location.replace('/register')
    }
    const ForgerPassword = () =>{
      location.replace('/forgetPassword')
    }
    return{
      form,
      login,
      Register,
      ForgerPassword
    }
  }
})

</script>

<style scoped>

</style>
