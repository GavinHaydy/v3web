<!--
 * @Description:login.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-31 11:28
 * @LastEditTime: 2021-09-13 20:54:17
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
            :rules="rules"
        >
          <a-row>
            <a-form-item
                label="账号"
                name="phone"
            >
              <a-input
                  placeholder="请输入手机号"
                  v-model:value="form.phone"
              />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item
                label="密码"
                name="password"
            >
              <a-input
                  placeholder="请输入密码"
                  type="password"
                  v-model:value="form.password"
                  @keyup.enter="login"
              />
            </a-form-item>
          </a-row>
          <a-row justify="center" style="padding-right: 60px">
              <a @click="ForgerPassword">忘记密码</a>
          </a-row>
          <a-row>
            <a-button
                size="small"
                type="link"
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

<script setup lang="ts">
import {getCurrentInstance, reactive} from "vue";
import {Md5} from "ts-md5";
import { userLogin } from "../../api/user";
import {message} from "ant-design-vue";
import { RuleObject } from "ant-design-vue/lib/form/interface";
import {userIP} from "../../api/ip";

const ta = reactive({
  ip: '',
  cityID: '',
  cityName: ''
})
    onMounted: {
      localStorage.clear()
      sessionStorage.clear()
      userIP().then(res =>{
        const obj = JSON.parse(res.data.replace(/var returnCitySN = /,'').replace(/;/,''))
        ta.ip = obj.cip
        ta.cityID = obj.cid
        ta.cityName = obj.cname
      })
    }
    const internalInstance  = getCurrentInstance()
    const form = reactive({
      phone: '',
      password: ''
    })
    const checkPhone = (rule :RuleObject, value :number) => {
     if(!internalInstance?.appContext.config.globalProperties.$checkPhone.test(value)){
       return Promise.reject('请输入正确的手机号')
     }else {
       return Promise.resolve()
     }
    }
    const checkPassword = (rule :RuleObject, value :string) =>{
        if (!internalInstance?.appContext.config.globalProperties.$checkPassword.test(value)){
          return Promise.reject('密码8-20位，支持英文、数字')
        } else {
          return Promise.resolve()
        }
    }
    const login = () =>{
      if (internalInstance?.appContext.config.globalProperties.$checkPhone.test(form.phone)
      && internalInstance?.appContext.config.globalProperties.$checkPassword.test(form.password)){
        userLogin({
          phone: form.phone,
          password: Md5.hashStr(form.password),
          login_ip: ta.ip,
          city_code: ta.cityID,
          city_name: ta.cityName
        })
            .then(res =>{
              if (res.data.code === 1000){
                console.log(res.data.data.result.token)
                const token = res.data.data.result.token
                localStorage.setItem('token',token)
                localStorage.setItem('phone', form.phone)
                localStorage.setItem('username', res.data.data.result.username)
                localStorage.setItem('is_login', 'true')
                location.replace('/admin')
              } else {
                message.error(res.data.data.msg)
                setTimeout(function () { location.reload() }, 1500) // 一秒后刷新页面
              }
            })
      }
      else {
        message.error('请先填写账号、密码')
      }
    }
    const rules = {
      phone:[{required: true, validator: checkPhone, trigger: 'blur'}],
      password: [{required: true, validator: checkPassword, trigger: 'blur'}]
    }
    const Register = () =>{
      location.replace('/register')
    }
    const ForgerPassword = () =>{
      location.replace('/forgetPassword')
    }
</script>

<style scoped>

</style>
