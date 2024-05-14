<script setup lang="ts">
import { reactive } from "vue";
import { User, UserLoginRequest } from "../../generated";
import store from "@/store";

const formState = reactive<UserLoginRequest>({
  userAccount: "",
  userPassword: "",
});

const onFinish = async (values: UserLoginRequest) => {
  const user: User = values;
  await store.dispatch("login", user);
};
</script>

<template>
  <div id="user-login" class="login-container">
    <a-card title="用户登录" :bordered="true" hoverable class="login-card">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 3, offset: 2 }"
        :wrapper-col="{ span: 16, offset: 1 }"
        autocomplete="off"
        @finish="onFinish"
        :style="{ marginTop: '20px' }"
      >
        <a-form-item
          label="用户名"
          name="userAccount"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.userAccount" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.userPassword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 19, span: 16 }">
          <a-button type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56vh;
}

.login-card {
  width: 550px;
}
</style>
