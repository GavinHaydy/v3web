<!--
 * @Description:forgetPassword.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-08 17:27
 * @LastEditTime: 2021-9-8 21:21:43
 * @LastEditors: the-ruffian
-->
<template>
  <div>
    <a-card
        class="card-box">
      <div
          slot="header"
          style="text-align: center"
      >
        <h3>忘记密码</h3>
      </div>
      <a-form
          inline="inline"
          :model="form"
          :rules="rules"
      >
        <a-row>
          <a-form-item
              name="email">
            <a-input
                :maxlength="30"
                v-model="form.email"
                placeholder="请输入邮箱地址"></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              name="code"
          >
            <a-input
                :maxlength="4"
                v-model="form.code"
                placeholder="请输入验证码"></a-input>
          </a-form-item>
          <a-button
              style="background-color: transparent;border: transparent;color: blue"
              @click="getCode"
              v-if="getCodeTime.show"
          >获取验证码</a-button>
          <a-button
              style="background-color: transparent;border: transparent;color: red"
              @click="getCode"
              v-else>{{getCodeTime.time}}</a-button>
        </a-row>
        <a-row>
          <a-form-item
              name="password">
            <a-input
                v-model="form.password"
                type="password"
                show-password
                placeholder="请输入密码"></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              name="rePassword">
            <a-input
                v-model="form.rePassword"
                type="password"
                show-password
                placeholder="请确认密码"></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-button
              type="link"
              size="small"
              class="right"
              @click="handleBack"
          >返回登录页</a-button>
          <a-button
              type="primary"
              size="small"
              class="right"
              @click="handleSubmit"
          >确认修改</a-button>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {getCurrentInstance, reactive, ref} from "vue";
import {forgetPassword, getEmailCode} from "../../api/user";
import {Md5} from "ts-md5";
import {message} from "ant-design-vue";

const internalInstance = getCurrentInstance()?.appContext.config.globalProperties
const checkEmail = (value :string) =>{
  if (!internalInstance?.$checkEmail.test(value)){
    return Promise.reject('请填写正确的邮箱')
  }
}
const checkCode = (value :string) =>{
  if (!internalInstance?.$checkCode.test(value)){
    return Promise.reject('请输入正确验证码')
  }
}
const checkPassword = (value :string) =>{
  if (!internalInstance?.$checkPassword.test(value)){
    return Promise.reject('密码8-20位，支持英文、数字')
  }
}
const checkRepass = (value :string) => {
  if (value !== form.password) {
    return Promise.reject('两次密码不一致，请重新输入')
  } else if (!internalInstance?.$checkPassword.test(value)) {
    return Promise.reject('密码8-20位，支持英文、数字')
  }
}
const form = reactive({
  email: '',
  code: '',
  password: '',
  rePassword: ''
})
const rules = reactive({
  email: [{required: true, validator: checkEmail, trigger: 'blur'}],
  code: [{required: true, validator: checkCode, trigger: 'blur'}],
  password: [{required: true, validator: checkPassword, trigger: 'blur'}],
  rePassword: [{required: true, validator: checkRepass, trigger: 'blur'}]
})
let getCodeTime = reactive({
  time: 10,
  show: true
})
const handleSubmit = () =>{
  if (form.password === form.rePassword){
    forgetPassword({
      'password': Md5.hashStr(form.password),
      'rePassword': Md5.hashStr(form.password),
      'code': form.code,
      'email': form.email
    })
    .then(res => {
      if (res.data.code === 200 ){
        message.success(res.data.message)
        setTimeout(function (){location.replace('/login')},200)
      } else {
        message.error(res.data.message)
      }
    })
  }
}
const handleBack = () => {
  location.replace('/login')
}
const getCode = () => {
  if (getCodeTime.show) {
    getEmailCode({
      'tos': form.email
    }).then(res=>{
      if (res.data.code===400){
        getCodeTime.show = false
        const timer = setInterval(() => {
          getCodeTime.time--
          if (getCodeTime.time === 0){
            getCodeTime.show = true
            getCodeTime.time = 10
            clearInterval(timer)
          }
        },1000)
      }
    })
  }
}
</script>

<style scoped>
.card-box{
  background-color: #f9a7a7;
  width: 36%;
  height: 45vh;
  margin-top: 30vh;
  margin-left: 32%;
}
</style>
