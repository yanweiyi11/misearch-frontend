<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchText"
      placeholder="请输入搜索文本"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="currentTab" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList :pictureList="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import mxios from "@/plugins/mxios";
import { message } from "ant-design-vue";

import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";

// 引用数据列表
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

// 路由和路由参数
const router = useRouter();
const route = useRoute();
const currentTab = ref(route.params.category as string);

// 初始化搜索参数
const initialSearchParams = {
  type: currentTab.value,
  searchText: "",
  pageSize: 10,
  pageNum: 1,
};

// 实际搜索参数
const searchParams = ref({ ...initialSearchParams });

// 搜索文本
const searchText = ref((route.query.searchText as string) || "");

/**
 * 加载数据
 *
 * @param params
 */
const fetchSearchData = async (params: any) => {
  // 发起搜索请求
  mxios.post("search/all", params).then((res: any) => {
    if (!params.type) {
      postList.value = res.postList;
      userList.value = res.userList;
      pictureList.value = res.pictureList;
      return
    }
    // 根据类型更新对应的数据列表
    if (params.type === "post") {
      postList.value = res.postList || res.dataList;
    } else if (params.type === "user") {
      userList.value = res.userList || res.dataList;
    } else if (params.type === "picture") {
      pictureList.value = res.pictureList || res.dataList;
    }
  });
};

// 监听路由变化并加载数据
watchEffect(() => {
  searchParams.value = {
    ...initialSearchParams,
    searchText: route.query.searchText as string,
    type: route.params.category as string,
  };
  fetchSearchData(searchParams.value);
});

// 处理搜索事件
const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParams.value,
      searchText: value,
    },
  });
};

// 处理标签页改变事件
const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
