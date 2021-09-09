<!--
 * @Description:forgetPassword.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-08 17:27
 * @LastEditTime: 2021-9-9 17:30:24
 * @LastEditors: the-ruffian
-->
<template>
  <div style="padding-top: 35vh">
    <a-card
        style="text-align: center"
        title="忘记密码"
        class="card-box"
    >
      <a-form
          :model="form"
          :rules="rules"
      >
        <a-row>
          <a-form-item
              class="input"
              name="email">
            <a-input
                :maxlength="30"
                v-model:value="form.email"
                placeholder="请输入邮箱地址"></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              name="code"
          >
            <a-input
                :maxlength="4"
                v-model:value="form.code"
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
              class="input"
              name="password">
            <a-input-password
                v-model:value="form.password"
                placeholder="请输入密码"></a-input-password>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              name="rePassword">
            <a-input-password
                v-model:value="form.rePassword"
                placeholder="请确认密码"></a-input-password>
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
import {getCurrentInstance, reactive} from "vue";
import {forgetPassword, getEmailCode} from "../../api/user";
import {Md5} from "ts-md5";
import {message} from "ant-design-vue";
import {RuleObject} from "ant-design-vue/es/form/interface";

const internalInstance = getCurrentInstance()?.appContext.config.globalProperties
const checkEmail = (rule :RuleObject, value :string) =>{
  if (!internalInstance?.$checkEmail.test(value)){
    return Promise.reject('请填写正确的邮箱')
  } else {
    return Promise.resolve()
  }
}
const checkCode = (rule :RuleObject, value :any) =>{
  if (!internalInstance?.$checkCode.test(value)){
    return Promise.reject('请输入正确验证码')
  } else {
    return Promise.resolve()
  }
}
const checkPassword = (rule :RuleObject, value :string) =>{
  if (!internalInstance?.$checkPassword.test(value)){
    return Promise.reject('密码8-20位，支持英文、数字')
  } else {
    return Promise.resolve()
  }
}
const checkRepass = (rule :RuleObject, value :string) => {
  if (value !== form.password) {
    return Promise.reject('两次密码不一致，请重新输入')
  } else if (!internalInstance?.$checkPassword.test(value)) {
    return Promise.reject('密码8-20位，支持英文、数字')
  } else {
    return Promise.resolve()
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
  if (form.password === form.rePassword &&
      internalInstance?.$checkEmail.test(form.email) &&
      internalInstance?.$checkCode.test(form.code) &&
      internalInstance?.$checkPassword.test(form.password)){
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
  } else {
    message.warning('请按要求填写表单')
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
  } else {
    message.error('cs')
  }
}
</script>

<style scoped>
.card-box{
  background-color: #f9a7a7;
  width: 36%;
  height: 45vh;
  margin-left: 32%;
}
</style>
