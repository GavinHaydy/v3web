<!--
 * @Description:register.vue
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-07 16:24
 * @LastEditTime: 2021-9-9 17:43:11
 * @LastEditors: the-ruffian
-->
<template>
  <div
      style="padding-top: 20vh"
  >
    <a-card
        class="card-box"
    >
      <a-form
          :model='ruleForm'
          :rules="rules"
          layout="vertical"
      >
        <a-row>
          <a-form-item
              class="input"
              label="电话"
              name="phone"
          >
            <a-input
                v-model:value="ruleForm.phone"
                :maxlength='11'
            ></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              label="昵称"
              name="user"
          >
            <a-input
                v-model:value="ruleForm.user"
                :maxlength='20'
            ></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              label="密码"
              name="password"
          >
            <a-input-password
                v-model:value="ruleForm.password"
                :maxlength='20'
            ></a-input-password>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              label="确认密码"
              name="rePass"
          >
            <a-input-password
                v-model:value="ruleForm.rePass"
                :maxlength='20'
            ></a-input-password>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              label="邮箱"
              name="email"
          >
            <a-input
                v-model:value="ruleForm.email"
                type="email"
                :maxlength='30'
            ></a-input>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item
              class="input"
              label="性别"
              name="gender"
          >
            <a-select
                placeholder="请选择"
                allowClear
                v-model:value="ruleForm.genderI"
                :options="ruleForm.gender"
            >
            </a-select>
          </a-form-item>
        </a-row>
        <a-row>
          <a-button
              type="primary"
              @click="handleClick"
          >注册</a-button>
          <a-button
              danger
              type="primary"
              @click="handleBack"
          >返回登录页</a-button>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, reactive} from "vue";
  import {RuleObject} from "ant-design-vue/es/form/interface";
  import {userRegister} from "../../api/user";
  import {message} from "ant-design-vue";
  import {Md5} from "ts-md5";

export default defineComponent({
  name: 'register',
  setup() {
    const internalInstance = getCurrentInstance()?.appContext.config.globalProperties
    const checkPhone = (rule: RuleObject, value: number) => {
      if (!internalInstance?.$checkPhone.test(value)) {
        return Promise.reject(('请填写正确的手机号'))
      }
    }
    const checkPassword = (rule: RuleObject, value: any) => {
      if (!internalInstance?.$checkPassword.test(value)) {
        return Promise.reject(('密码8-20位，支持英文、数字'))
      }
    }
    const checkEmail = (rule: RuleObject, value: any) => {
      if (!internalInstance?.$checkEmail.test(value)) {
        return Promise.reject(('请填写正确的邮箱'))
      }
    }
    const checkRepass = (rule: RuleObject, value: any) => {
      if (value !== ruleForm.password) {
        return Promise.reject(('两次密码不一致，请重新输入'))
      } else if (!internalInstance?.$checkPassword.test(value)) {
        return Promise.reject(('密码8-20位，支持英文、数字'))
      }
    }
    const checkName = (rule: RuleObject, value: any) => {
      if (value === null || value === '') {
        return Promise.reject(('昵称不能为空'))
      } else if (internalInstance?.$checkNull.test(value)) {
        return Promise.reject(('昵称不支持空格'))
      }
    }
    const ruleForm = reactive({
      phone: '',
      user: '',
      genderI: '',
      gender: [
        {value: 0, label: '女'},
        {value: 1, label: '男'},
        {value: 2, label: '保密'}
      ],
      password: '',
      rePass: '',
      email: ''
    })
    const rules = {
      phone: [{required: true, validator: checkPhone, trigger: 'blur'}],
      password: [{required: true, validator: checkPassword, trigger: 'blur'}],
      email: [{required: true, validator: checkEmail, trigger: 'blur'}],
      rePass: [{required: true, validator: checkRepass, trigger: 'blur'}],
      user: [{validator: checkName, trigger: 'blur'}]
    }
    const handleBack = () => {
      location.replace('/login')
    }
    const handleClick = () => {
      const md5Password = Md5.hashStr(ruleForm.password)
      if (
          internalInstance?.$checkPassword.test(ruleForm.password) &&
          internalInstance?.$checkPhone.test(ruleForm.phone) &&
          internalInstance?.$checkEmail.test(ruleForm.email) &&
          ruleForm.rePass === ruleForm.password
      ) {
        userRegister({
          'username': ruleForm.user,
          'phone': ruleForm.phone,
          'gender': ruleForm.genderI,
          'password': md5Password,
          'email': ruleForm.email
        })
            .then(res => {
              if (res.data.success === true) {
                message.success(res.data.message)
                setTimeout(function () {
                  location.replace('/login')
                }, 2000)
              } else {
                message.error(res.data.message)
              }
            })
      }
    }
    return{
      ruleForm,
      rules,
      handleBack,
      handleClick
    }
  }
})
</script>

<style scoped>
.card-box{
  background-color: #f9a7a7;
  width: 20%;
  margin-left: 32%;
}
</style>
