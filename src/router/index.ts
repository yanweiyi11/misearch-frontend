import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PostContent from "@/components/PostContent.vue";
import IndexPage from "@/pages/IndexPage.vue";
import UserLogin from "@/components/UserLogin.vue";
import UserRegister from "@/components/UserRegister.vue";

// 路由配置数组
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/:category",
    component: IndexPage,
  },
  {
    path: "/post/:id",
    component: PostContent,
  },
  {
    path: "/user/login",
    component: UserLogin,
  },
  {
    path: "/user/register",
    component: UserRegister,
  },
];

// 创建路由实例，使用 hash 模式的历史记录
const router = createRouter({
  history: createWebHashHistory(),
  routes, // 将路由配置传递给路由实例
});

// 默认页面标题
document.title = "MiSearch - 聚合搜索平台";

export default router;
