import { createStore } from "vuex";
import { User, UserControllerService } from "../../generated";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";

// 定义 State 接口
interface State {
  user: User | null;
}

export default createStore<State>({
  state: {
    user: null,
  },
  getters: {
    // 获取用户信息的 getter
    user: (state) => {
      // 如果 state 中有用户信息则直接返回
      if (state.user) {
        return state.user;
      }
      // 如果 state 中没有用户信息，则尝试从 localStorage 中获取
      const userJson = localStorage.getItem("user");
      if (userJson) {
        return JSON.parse(userJson);
      }
      // 如果都没有，则返回 null
      return null;
    },
  },
  mutations: {
    // 设置用户信息
    setUser(state, user: User | null) {
      state.user = user;
    },
  },
  actions: {
    // 用户登录
    async login({ commit }, user: User) {
      // 登录逻辑
      const res = await UserControllerService.userLoginUsingPost(user);
      if (res.code === 0) {
        // 登录成功，更新用户信息
        commit("setUser", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        // 跳转到主页
        location.href = "/#/";
        message.success("登陆成功");
      } else {
        message.error("登陆失败，" + res.message);
      }
    },
    // 用户登出
    async logout({ commit }) {
      // 登出逻辑
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        // 登出成功，清除用户信息
        commit("setUser", null);
        localStorage.removeItem('user');
        // 跳转到主页
        location.href = "/#/";
        message.success("登出成功");
      } else {
        message.error("登出失败，" + res.message);
      }
    },
  },
});
