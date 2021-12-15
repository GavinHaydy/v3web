<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a class="right" @click="userLogout">退出登录</a>
        <a class="right">{{menu.username}}</a>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content {{menu.menu}}
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,MenuFoldOutlined,MenuUnfoldOutlined} from "@ant-design/icons-vue";
import {reactive, ref} from "vue";
import {logout} from "../../api/user";
import {message} from "ant-design-vue";
import {getRoleMenu} from "../../api/roleAuth";
import create from "@ant-design/icons-vue/es/components/IconFont";

components:{
  MenuFoldOutlined
  MenuUnfoldOutlined
  UserOutlined
  VideoCameraOutlined
  UploadOutlined}
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])
const userLogout = (data = {}) => {
  logout({
    'phone': localStorage.getItem('phone')
  }).then(res => {
    if (res.data.code==200){
      message.success(res.data.message)
      setTimeout(function (){location.replace('/login')}, 2000)
    }else {
      message.error(res.data.message)
      setTimeout(function (){location.replace('/login')}, 2000)
    }
  })
}
const menu = reactive({
  menu: {},
  username: localStorage.getItem('username')
})
const getMenu = (data = {}) => {
  getRoleMenu({
    'phone': localStorage.getItem('phone')
  }).then(res =>{
    if (res.data.code==200){
      menu.menu = res.data.result
    }
  })
  return menu.menu
}
create(getMenu())
</script>

<style scoped>

</style>