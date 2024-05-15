import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import { User, UserControllerService } from "../../generated";
import { message } from "ant-design-vue";
import router from "@/router";

interface State {
  user: User | null;
}

const store =  createStore<State>({
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    // 更新信息
    setUser(state, user: User | null) {
      state.user = user;
    },
  },
  actions: {
    // 用户登录
    async login({ commit }, user: User) {
      const res = await UserControllerService.userLoginUsingPost(user);
      if (res.code === 0) {
        commit("setUser", res.data);
        message.success("登陆成功");
        await router.push("/");
      } else {
        message.error("登陆失败，" + res.message);
      }
    },
    // 用户登出
    async logout({ commit }) {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("setUser", null);
        message.success("登出成功");
        await router.push("/");
      } else {
        message.success("登出失败，" + res.message);
      }
    },
  },
  plugins: [createPersistedState({
    // 配置项（可选）
    storage: window.sessionStorage, // 使用 sessionStorage，如果想用 localStorage，可以不设置这个选项
    reducer(val) {
      return { // 只储存state中的user
        user: val.user
      }
    }
  })],
});

export default store;