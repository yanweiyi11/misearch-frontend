<script setup>
import { computed } from "vue";
import store from "@/store";

const loginUser = computed(() => store.getters.user);

const handleLogin = () => {
  document.location = "/#/user/login";
};

const handleRegister = () => {
  document.location = "/#/user/register";
};

const handleLogout = async () => {
  await store.dispatch("logout");
};
</script>
<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo-container">MiSearch 聚合搜索平台</div>
      <a-menu theme="dark" mode="horizontal" class="menu"></a-menu>
      <div class="user-info">
        <template v-if="loginUser">
          <a-space size="small">
            <a-avatar :src="loginUser.userAvatar" :alt="loginUser.userName" />
            <span class="username">{{ loginUser.userName }}</span>
            <a-button type="text" style="color: #bfbfbf" @click="handleLogout"
              >登出</a-button
            >
          </a-space>
        </template>
        <template v-else>
          <a-space size="middle">
            <a-button type="primary" @click="handleLogin">登录</a-button>
            <a-button type="default" @click="handleRegister">注册</a-button>
          </a-space>
        </template>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<style>
.layout {
  line-height: 58px;
  height: 58px;
}

.logo-container {
  float: left;
  font-size: 20px; /* 根据实际需要调整字体大小 */
  color: #fff; /* 设置文字颜色 */
  margin-right: 24px; /* 设置与菜单项的间距 */
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.menu {
  float: left;
}

.user-info {
  float: right;
}

.username {
  color: #fff;
  margin-left: 8px;
}
</style>