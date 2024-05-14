<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../generated";
import { message } from "ant-design-vue";

const formState = reactive<UserRegisterRequest>({
  userName: "",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

const onFinish = async (values: UserRegisterRequest) => {
  // 注册逻辑
  const res = await UserControllerService.userRegisterUsingPost(values);
  if (res.code === 0) {
    message.success("注册成功");
    location.href = "/#/user/login";
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>

<template>
  <div id="user-register" class="register-container">
    <a-card title="用户注册" :bordered="true" hoverable class="register-card">
      <a-form
        :model="formState"
        name="registerForm"
        :label-col="{ span: 4, offset: 2 }"
        :wrapper-col="{ span: 15, offset: 1 }"
        autocomplete="off"
        @finish="onFinish"
        :style="{ marginTop: '20px' }"
      >
        <a-form-item
            label="账号"
            name="userAccount"
            :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input v-model:value="formState.userAccount" />
        </a-form-item>

        <a-form-item
          label="用户名"
          name="userName"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.userPassword" />
        </a-form-item>

        <a-form-item
          label="确认密码"
          name="checkPassword"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <a-input-password v-model:value="formState.checkPassword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 19, span: 16 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56vh;
}

.register-card {
  width: 550px;
}
</style>