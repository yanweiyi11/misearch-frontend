<template>
  <div id="index-page">
    <a-input-search
      v-model:value="searchParams.searchText"
      placeholder="搜索文章/图片/用户"
      enter-button
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="currentTab" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :postPage="postPage" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList :picturePage="picturePage" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userPage="userPage" />
      </a-tab-pane>
    </a-tabs>
    <a-pagination
      v-model:current="searchParams.current"
      :total="total"
      simple
      @change="changePage"
      show-less-items
      :style="{ textAlign: 'center', marginTop: '15px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ResourceType } from "@/enums/ResourceType";
import { SearchControllerService, SearchRequest } from "../../generated";
import { message, notification } from "ant-design-vue";
import store from "@/store";
import MyDivider from "@/components/MyDivider.vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";

// 引用数据列表
const postPage = ref({});
const picturePage = ref({});
const userPage = ref({});

// 搜索文本
const searchText = ref("");

// 请求参数
const searchParams = ref<SearchRequest>({
  current: 1,
  pageSize: 10,
  searchText: searchText.value,
});

// 总数
const total = ref(1);

// 路由和路由器的实例
const router = useRouter();
const route = useRoute();

// 当前激活的标签页
const currentTab = ref((route.params.category as string) || ResourceType.POST);

// 当前登录用户
const loginUser = computed(() => store.getters.user);

// 登录提示通知
const loginNotificationKey = "login-notification";
const showLoginNotification = () => {
  notification.open({
    message: "登录提示",
    description: "您当前未登录，请登录后再进行搜索操作。",
    placement: "bottomRight",
    key: loginNotificationKey,
  });
};
const closeLoginNotification = () => notification.close(loginNotificationKey);

// 根据登录状态显示或关闭登录提示
watch(loginUser, (user) => {
  if (user) {
    closeLoginNotification();
  } else {
    showLoginNotification();
  }
});

/**
 * 根据搜索类别和参数加载数据
 *
 * @param searchCategory
 * @param params
 */
const fetchSearchData = async (
  searchCategory: string,
  params: SearchRequest
) => {
  if (!loginUser.value) {
    return;
  }
  // 发起搜索请求
  const res = await SearchControllerService.doSearchUsingPost(
    searchCategory,
    params
  );
  if (res.code === 0) {
    // 使用映射来简化条件逻辑
    const resourceMap = {
      [ResourceType.POST]: () => (postPage.value = res.data),
      [ResourceType.USER]: () => (userPage.value = res.data),
      [ResourceType.PICTURE]: () => (picturePage.value = res.data),
    };
    // 根据类型更新对应的数据列表
    const updateFunction = resourceMap[searchCategory];
    if (updateFunction) {
      updateFunction();
      total.value = res.data.total;
    }
  } else if (res.code === 40100) {
    message.info("当前用户未登录");
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 搜索事件处理
 * @param value
 */
const onSearch = (value: string) => {
  // 更新路由查询参数
  searchParams.value.searchText = value;
  searchParams.value.current = 1;
  router.push({ query: { ...searchParams.value } });
  // 数据加载
  fetchSearchData(currentTab.value, searchParams.value);
};

/**
 * 标签页变化处理
 * @param tabName
 */
const onTabChange = (tabName: string) => {
  // 重置页码
  searchParams.value.current = 1;
  // 更新路由路径和查询参数
  router.push({ path: `/${tabName}`, query: searchParams.value });
};

// 路由参数变化监听器，用于响应 URL params 变化加载数据
watch(
  () => route.params.category,
  (newCategory) => {
    currentTab.value = (newCategory as string) || ResourceType.POST;
    fetchSearchData(currentTab.value, searchParams.value);
  },
  { immediate: true }
);

// 组件挂载时更新搜索参数
// 防止直接访问如：/post?current=3&pageSize=10 的网站时，虽然 current=3，但还是会访问第一页
onMounted(() => {
  const query = route.query;
  searchParams.value.current = query.current
    ? parseInt(query.current as string)
    : 1;
  searchParams.value.pageSize = query.pageSize
    ? parseInt(query.pageSize as string)
    : 10;
  searchParams.value.searchText = (query.searchText as string) || "";

  // 在开始时，检查登录状态，判断是否需要弹出登录提示
  if (!loginUser.value) {
    showLoginNotification();
  }
});

// 页码变化处理
const changePage = (page: number, pageSize: number) => {
  // 更新路由查询参数
  searchParams.value.current = page;
  searchParams.value.pageSize = pageSize;
  router.push({ query: searchParams.value });
  // 加载数据
  fetchSearchData(currentTab.value, searchParams.value);
  // 滚动到页面顶部
  window.scrollTo(0, 0);
};

// 用户登录状态变化处理
watch(
  () => store.getters.user,
  (user) => {
    // 用户不存在
    if (!user) {
      // 清空数据列表
      postPage.value = {};
      picturePage.value = {};
      userPage.value = {};
      total.value = 1;
      // 重置分页数据
      searchParams.value = {
        ...searchParams.value,
        current: 1,
        pageSize: 10,
        searchText: "",
      };
    }
  }
);
</script>

<style scoped>
#index-page {
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px 0 30px 0;
}
</style>